import { ADD_PROJECT, ADD_PROJECT_REQUEST, ADD_PROJECT_FAILURE, 
	ADD_DRAFT_PROJECT, ADD_DRAFT_PROJECT_REQUEST, 
	ADD_DRAFT_PROJECT_FAILURE, GET_ALLDRAFTS, GET_ALLDRAFTS_FAIL, GET_ALLDRAFTS_REQUEST, GET_ALLPROJECTS, GET_ALLPROJECTSFAIL, GET_ALLPROJECTS_REQUEST } from "../MutationTypes";
import { projectsCollection, draftsCollection, Timestamp, storageRef, TaskEvent, TaskState } from "../../db";
import { NotificationProgrammatic as Notification } from 'buefy'
// Generates a random key used to identify draft projects before submitting to the database.

const tempId = length => {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function uploadFiles (file) {
	let progress, status;
	return new Promise((resolve, reject) => {
		let uploadTask = storageRef.child(`files/${file.name}`).put(file, { contentType: file.type })

		uploadTask.on(TaskEvent.STATE_CHANGED, (snapshot) => {
			progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case TaskState.PAUSED: // or 'paused'
				console.log('Upload is paused');
				status = 'paused'
				break;
				case TaskState.RUNNING: // or 'running'
				console.log('Upload is running');
				status = 'running'
				break;
				case TaskState.SUCCESS:
				status = "complete";
				break;
			}
		}, (error) => {
			switch(error.code) {
				case 'storage/unauthorized':
				// User doesn't have permission to access the object
				console.log("You dont have permmission")
				error = 'unauthorized';
				reject(new Error('No permission'))
				break;

				case 'storage/canceled':
				// User canceled the upload
				console.log("error cancelled")
				error = 'cancelled'
				reject(new Error("Process cancelled"))
				break;

				case 'storage/unknown':
				// Unknown error occurred, inspect error.serverResponse
				error = 'Error occurred'
				reject(new Error('Error occured. Unknown'))
				console.log("error unknown")

				break;
			}
		}, () => {
			uploadTask.snapshot.ref.getDownloadURL()
			.then(url => {
				console.log("url", url)
				resolve(url)
				// console.log("files", filesUrl)
			})
			console.log("status", status);
		})
	})
}

const projects = {
    namespaced: true,
    state: {
		gettingAllProj: false,
		gettingAllProjFail: false,
		gettingAllDrafts: false,
		gettingAllDraftsFail: false,
		addingProject: false,
		addingProjectFail: false,
		projects: [],
		addingDraftProject: false,
		addingDraftFail: false,
		draftProjects: [],
		pFileProgess: 0,
		uploadingFiles : false
    },
    mutations: {
		[ADD_PROJECT_REQUEST] (state) {
			state.addingProject = true;
		},
		[ADD_PROJECT_FAILURE] (state) {
			state.addingProject = false;
			state.addingDraftFail = true;
		},
		[ADD_DRAFT_PROJECT] (state, data) {
			state.addingDraftProject = false;
			state.addingDraftFail = false;

			if(state.draftProjects.includes(data) === false) {
				state.draftProjects.push({
					draftKey: tempId(5),
					email: data.email,
					pageNumber: data.pageNumber,
					paperType: data.paperType,
					deadline: data.dealine
				})
			}

		},
		[ADD_DRAFT_PROJECT_REQUEST] (state) {
			state.addingDraftFail = false;
			state.addingDraftProject = true
		},
		[ADD_DRAFT_PROJECT_FAILURE] (state) {
			state.addingDraftProject = false;
			state.addingDraftFail = true;
		}, 
		[GET_ALLPROJECTS_REQUEST] (state) {
			state.gettingAllProj = true
		},
		[GET_ALLPROJECTS] (state, payload) {
			state.gettingAllProj = false;
			state.gettingAllProjFail = false;
			state.projects.push(payload)
		},
		[GET_ALLPROJECTSFAIL] (state) {
			state.gettingAllProjFail = true
			state.gettingAllProj = false;
		},
		[GET_ALLDRAFTS_REQUEST] (state) {
			state.gettingAllDrafts = true;
		},
		[GET_ALLDRAFTS] (state, payload) {
			state.gettingAllDrafts = true;
			state.gettingAllDraftsFail = false;
			state.draftProjects = payload;
		},
		[GET_ALLDRAFTS_FAIL] (state) {
			state.gettingAllDraftsFail = true;
		},
		[ADD_PROJECT] (state, payload) {
			state.addingProject = false;
			state.addingProjectFail = false;
			if(state.projects.includes(payload) === false) {
				state.projects.push(payload);
			}
		},
		uploading(state) {
			state.uploadingFiles = true
		},
		uploadFiles(state, progress) {
			state.uploadingFiles = false;
			state.uploadingFailed = false;
			state.uploadProgress = progress;
		},
		uploadingFailed(state) {
			state.uploadingFiles= false
		}
    },
    actions: {
		initDrafts({ commit }, payload) {
			commit(GET_ALLDRAFTS_REQUEST);
			draftsCollection
			.where('draft', '==', true)
			.where('email', '==', payload)
			.get()
			.then(result => {
				if(result.empty) {
					commit(GET_ALLDRAFTS_FAIL)
					// No drafts found...
					
					console.log("No drafts yet");

				} else {
					console.log("result", result);
					let drafts = [];
					result.forEach(r => {
						let id = r.id;
						console.log("r", r.data())
						let dData = { ...r.data(), id }
						drafts.push(dData)
					})
					console.log("drafts", drafts);
					Notification.open({
						type: 'is-info',
						duration: 5000,
						position: 'is-top-right',
						message: "You have "+ drafts.length + " drafts. Please complete to publish them."
					})
					commit(GET_ALLDRAFTS, drafts);
				}
			})
			.catch(error => {
				console.log("error all drafts", error)
			})
		},
		initProjects({ commit }, payload) {
			commit(GET_ALLPROJECTS_REQUEST);
			console.log("payload", payload)
			if(payload.userId) {
				projectsCollection
				.where('creator', '==', payload.userId)
				.get()
				.then(res => {
					if(res.empty) {
						Notification.open({
							message: "You don't have any projects yet. Create one...",
							duration: 10000,
							type: 'is-warning',
							position: 'is-bottom-right'
						})
						commit(GET_ALLPROJECTSFAIL)
					} else {
						res.forEach(p => {
							let id = p.id;
							let deadline = p.data()['deadline'].toDate()
							delete p.data()['deadline']
							
							let pData = p.data()
							pData.id = id;
							pData.deadline = deadline;
							commit(GET_ALLPROJECTS, pData)
						})
					}
				})
				.catch(error => {
					console.log("error", error)
					commit(GET_ALLPROJECTSFAIL)
				})
			} else {
				commit(GET_ALLPROJECTSFAIL)
			}
		},
		addProject({ commit }, data) {
			commit(ADD_PROJECT_REQUEST);

				// let newProject = projectsCollection.doc()
				if(data.files.length > 0) {
					Promise.all(
						data.files.map(e => uploadFiles(e))
					).then(res => {
						
						console.log("files", res);
						commit(ADD_PROJECT_REQUEST)
						projectsCollection.add({
							name: data.name,
							status: 'pending',
							description: data.description || '',
							deadline: data.deadline,
							paperType: data.paperType,
							pages: data.pageNumber,
							creator: data.creator,
							createdAt: Timestamp.now()
						})
						.then(result => {
							result.set({
								files: res
							}, { merge: true })
							
							result.onSnapshot(q => {
								let dataId = q.id;
								let data = { ...q.data(), dataId }
								commit(ADD_PROJECT, data)
								Notification.open({
									type: 'is-success',
									duration: 5000,
									message: "Successfully added project",
									position: "is-bottom-right"
								})
							}, (error) => {
								console.log("error sn", error)
							})
						}).catch(error => {
							console.log("erro", error);
							
							commit(ADD_PROJECT_FAILURE)
						})
					})
					.catch(error => {
						console.log("error", error)
					})
				} else {
					console.log("yes")

					commit(ADD_DRAFT_PROJECT_REQUEST)
					projectsCollection.add({
						name: data.name,
						status: 'pending',
						description: data.description || '',
						deadline: data.deadline,
						paperType: data.paperType,
						pages: data.pageNumber,
						files: [],
						price: data.price,
						createdAt: Timestamp.now(),
						creator: data.creator
					})
					.then(result => {
						
						result.onSnapshot(q => {
							console.log("result", result)
							Notification.open({
								type: 'is-success',
								duration: 5000,
								message: "Successfully added project",
								position: "is-top-right"
							})
							commit(ADD_PROJECT, q.data());
						}, (error) => {
							console.log("error sn", error);
							commit(ADD_PROJECT_FAILURE)
						})
					}).catch(error => {
						console.log("erro", error);
						
						commit(ADD_PROJECT_FAILURE)
					})
				}
		},
		addDraftProject({ commit }, data) {
			commit(ADD_DRAFT_PROJECT_REQUEST);
			// pd means projects that don't have all details.
			draftsCollection.add({
				email: data.email,
				pages: data.pages,
				paperType: data.paperType,
				price: data.price,
				deadline: data.deadline,
				draft: true,
				createdAt: Timestamp.now()
			})
			.then(result => {
				console.log("result", result)
			})
			.catch(error => {
				console.log("error draft", error)
				commit(ADD_PROJECT_FAILURE)
			})
		}
	},
	getters: {
		projectById: (state) => (id) => { return state.projects.find(p => p.id == id)  },
		completedProjects: state => {
			return state.projects.filter(p => p.status == 'completed')
		},
		cancelled: state => {
			return state.projects.filter(c => c.status == 'cancelled')
		},
		pending: state => {
			return state.projects.filter(p => p.status == 'pending')
		}
	}
}

export default projects;