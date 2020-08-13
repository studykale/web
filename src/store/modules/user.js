
import { LOGIN_USER, SIGNUP_USER, SIGNUP_USER_COMPLETE, LOGIN_REQUEST, SIGNUP_USER_REQUEST, LOGIN_FAILURE, SIGNUP_USER_FAILURE } from "../MutationTypes"
import { auth, newUser, users, currentUser, chats, Timestamp, notifications } from "../../db"
import { SnackbarProgrammatic as Snack, NotificationProgrammatic as Notification } from 'buefy'


import router from "../../router"
import { uploadFiles } from "./projects";

const tempId = length => {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

const User = {
	namespaced: true,
	state: {
		status: {
			loggedIn: false
		},
		user: null,
	},
	actions: {
		init({commit}) {
			auth.onAuthStateChanged(user => {
				
				if(user) {
					commit('authUser', { username: user.displayName, email: user.email, id: user.uid,  verified: user.emailVerified })
				} else {
					router.push('/auth/signin');
				}
			}).catch(error => {
				if(error.code == 'auth/id-token-expired' || error.code == 'auth/user-token-expired') {
					// onIdTokenRevocation()
					//("No")
				} else {
					router.push('/auth/signin')
				}
			})
		},
		login({ commit, dispatch }, payload) {
			commit(LOGIN_REQUEST)
			auth.signInWithEmailAndPassword(payload.email, payload.password)
			.then(result => {
			
				let user = result.user;
				let userId = user.uid;
				if(result.user.emailVerified) {
					router.push('/verification')
				}

				dispatch('projects/initProjects', { userId }, { root: true })
				window.$cookies.set('loggedIn', true, '1d');
				commit(LOGIN_USER, { username: user.displayName, email: user.email, verified: user.emailVerified, photoUrl: user.photoURL, userId: user.uid })
				router.replace('/dashboard/projects');
			})
			.catch(error => {
				//("error sign in", error)
				if(error.code == "auth/user-not-found") {
					Notification.open({
						type: 'is-warning',
						message: "No account found by the email",
						duration: 3000,
					})
				}

				if(error.code == 'auth/wrong-password') {
					Notification.open({
						type: 'is-warning',
						message: "Wrong email/password combination.",
						duration: 6000,
					})
				}

				if(error.code == 'auth/network-request-failed') {
					Notification.open({
						type: 'is-info',
						message: "Your internet seems to be down. Please try again",
						duration: 5000
					});
				}
				commit(LOGIN_FAILURE)
			})
		},
		signUp({ commit }, payload) {
			commit(SIGNUP_USER_REQUEST);
			
			auth.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(data => {
				
				data.user.updateProfile({
					displayName: payload.username,
					photoURL: `http://tinygraphs.com/spaceinvaders/${payload.username}?theme=duskfalling&numcolors=4&size=220&fmt=svg`
				}).then(()=> {
					

					newUser(data.user.uid)
					.set({
						role: 'CLIENT',
						username: payload.username,
						email: payload.email,
						profile: `http://tinygraphs.com/spaceinvaders/${payload.username}?theme=duskfalling&numcolors=4&size=220&fmt=svg`,
						verified: data.user.emailVerified
					}, { merge: true })
				})
				.then(() => {
					// sendVerificationEmail(data.user, 'http://studykale.com/auth/signin')
					data.user.sendEmailVerification({
						handleCodeInApp: false,
						url: 'http://studykale.com/auth/signin'
					})
					.then(() => {
						Notification.open({
							message: "A verification email has been sent",
							type: 'is-info',
							position: 'is-bottom-right'
						})
						let note = notifications.doc(tempId(7))
					note.set({
						time: Timestamp.now(),
						read: false,
						rvr: data.user.uid,
						name: "Getting started...",
						description: `Welcome to studykale ${payload.username}, Feel right at home. You can ask us anything in the chat section`
					})
					
					let startChat = chats.doc(tempId(8))
					startChat.set({
						user: currentUser.displayName,
						message: "Welcome to studykale " + payload.username + "...you can talk to us any time",
						read: false,
						uid: currentUser.uid,
						time: Timestamp.now(),
						respondent: null
					})
					.then(() => {
						commit(SIGNUP_USER_COMPLETE)
						router.push('/auth/signin')
					})
					})
					.catch(error => {
						Notification.open({
							message: "We were unable to send a verification email. " + error.message,
							type: 'is-warning',
							position: 'is-bottom-right'
						})
					})
				})
				.catch(error => {
					//("error", error)
					Notification.open({
						message: "Sorry we could not create an account " + error.message,
						type: 'is-warning',
						position: 'is-top-right'
					})
					commit(SIGNUP_USER_FAILURE)
				})
			})
			.catch(error => {
				commit(SIGNUP_USER_FAILURE)
				
				if(error.code == "auth/network-request-failed") {
					Notification.open({
						type: 'is-warning',
						position: 'is-top',
						duration: 5000,
						message: "Network error. Please check your internet connection"
					})
				} else if(error.code == "auth/email-already-in-use") {
					Notification.open({
						type: 'is-warning',
						position: 'is-top',
						duration: 5000,
						message: "The account is already in use by another."
					})
				}
			})
		},
		signout({ commit }) {
			auth.signOut()
			.then(() => {
				commit('logout')
				window.$cookies.remove('loggedIn');
				if(window.$cookies.isKey('kadm'))  window.$cookies.remove('kadm');
				window.$cookies.remove('vuex')
				window.localStorage.removeItem('vuex')
				router.replace('/')
			})
			.catch(error => {
				//("log out error", error)
				Notification.open({
					message: "Sorry we could not log you out :"+error.message,
					type: 'is-info',
					position: 'is-top-right'
				})
			})
		},
		fetchUser({ commit }, user) {
			if(user) {
				commit('setUser', { username: user.displayName, photoURL: user.photoURL, email: user.email, verified: user.emailVerified, userId: user.uid });
			} else {
				commit('setUser', null)
			}
		},
		updateUserProfile({ dispatch, commit }, data) {
			console.log("data");
			commit('updateProfileRequest')
			if(data.type == "photo") {
				uploadFiles(data.image, 'photo')
				.then(file => {
					
					currentUser.updateProfile({
						photoURL: file
					})
					.then(() => {
						commit("updateProfile", currentUser.photoURL)
					})
					.catch(error => {
						Notification.open({
							message: "Sorry we could not update the profile. "+error.message
						})
						commit("updateProfileFail")
					})
				})
				.catch(error => {
					Notification.open({
						message: "Profile was not updated :"+error.message
					})
					commit("updateProfileFail")
				})
			} else if(data.type == "email") {
				commit('updateEmailRequest')
				
				currentUser.updateEmail(data.email)
				.then(() => {
					
					notifications.add({
						name: "Email change successful",
						description: "The email change was successful.",
						time: Timestamp.now(),
						rvr: currentUser.uid,
						read: false
					})
					Notification.open({
						type: 'is-info',
						message: "Email updated..."
					})
					commit("updateEmail", currentUser.email)
				})
				.catch(error => {
					commit("updateEmailFail")
					if(error.type == "invalid-email") {
						Notification.open({
							message: "Sorry but that is an invalid email.",
							type: "is-warning"
						})
					} else if(error.type == "requires-recent-login") {
						Notification.open({
							message: "You need to have logged In",
							type: "is-danger"
						})
					} else if(error.type == "email-already-in-use") {
						Notification.open({
							message: "Sorry that email is already in use",
							type: "is-warning"
						})
					}
				})
			} else if(data.type == "password") {
				commit("updatePasswordRequest")
				let note = notifications.doc(tempId(6))

				Promise.all([ 
					note.set({
						time: Timestamp.now(),
						read: false,
						rvr: currentUser.uid,
						name: 'Password update',
						description: "Your password change was successful.Please note that logging you out is a security measure. "
					}), 
					currentUser.updatePassword(data.password)
				])
				.then(result => {
					console.log("res", result);
					
					dispatch('signout')
				})
				.catch(error => {
					console.log("err", error)
				})
			}
		},
		// Meant for ADMIN login.
		createAdminAccount({ commit }, payload) {
			commit(SIGNUP_USER_REQUEST);

			auth.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(result => {

				result.user.updateProfile({
					displayName: payload.username
				})
				.then(() => {
					
					newUser(result.user.uid)
					.set({
						role: 'ADMIN',
						username: payload.username,
						email: payload.email,
						profile: result.user.photoURL,
					}, { merge: true })
					.then(() => {
						commit(SIGNUP_USER_COMPLETE)
						Snack.open({
							message: "You have signed up as an admin. You can now sign in",
							type: 'is-info',
							position: 'is-bottom-right'
						})
						router.push('/auth/signin')
					})
					.catch(error => {
						//("error", error)
						Notification.open({
							message: "Sorry we could not create an account " + error.message,
							type: 'is-warning',
							position: 'is-top-right'
						})
						commit(SIGNUP_USER_FAILURE)
					})
				})
				.catch(error => {
					//("error", error)
					Notification.open({
						message: "Sorry we could not create an account " + error.message,
						type: 'is-warning',
						position: 'is-top-right'
					})
					commit(SIGNUP_USER_FAILURE)
				})
			})
			.catch(error => {
				commit(SIGNUP_USER_FAILURE)
				if(error.code == "auth/network-request-failed") {
					Notification.open({
						type: 'is-warning',
						position: 'is-top',
						duration: 5000,
						message: "Network error. Please check your internet connection"
					})
				} else if(error.code == "auth/email-already-in-use") {
					Notification.open({
						type: 'is-warning',
						position: 'is-top',
						duration: 5000,
						message: "Please don't create an account if you are not an admin"
					})
				}
			})
		},
		loginAdmin({ commit, dispatch }, payload) {
			commit(LOGIN_REQUEST)

			auth.signInWithEmailAndPassword(payload.email, payload.password)
			.then(result => {
				let user = result.user
				let uid = user.uid;
		
				users
				.doc(uid)
				.get()
				.then(res => {
					if(res.exists) {	
						let userId = res.id;
						if(res.data().role !== 'ADMIN') {
							Notification.open({
								message: "You know you are not an admin. Stop trying."
							});

							commit(LOGIN_FAILURE)
							router.push('/auth/signin');
						} else {
							dispatch('admin/initAdProjects', null, { root: true })
							dispatch('admin/initAdUsers', null, { root: true })
							dispatch('admin/initQuestions', null, { root: true })
							window.$cookies.set('loggedIn', true, '1d');
							window.$cookies.set('kadm', true, '1d')
							commit(LOGIN_USER, { username: user.displayName, email: user.email, verified: user.emailVerified, photoUrl: user.photoURL, userId })
							
							router.push('/admin/projects')
						}
					} else {	
						Notification.open({
							message: "Sorry we did not find your account.",
							type: 'is-info',
							hasIcon: true
						})
						commit(LOGIN_FAILURE)
					}
				})
				.catch(error => {
					Notification.open({
						type: 'is-warning',
						hasIcon: true,
						position: 'is-top',
						message: "Sorry we did not find your account. "+error.message
					})
					commit(LOGIN_FAILURE)
				})
			})
			.catch(error => {
				Notification.open({
					type: 'is-warning',
					hasIcon: true,
					position: 'is-top',
					message: "Sorry we did not find your account. "+error.message
				})
				commit(LOGIN_FAILURE)

			})
		}
	},
	mutations: {
		
		setUser(state, user) {
			state.user = user;
			state.status = { loggedIn: true }
		},
		[LOGIN_REQUEST] (state) {
			state.status = {
				loggingIn: true
			}
		},
		[LOGIN_FAILURE] (state) {
			state.status = {};
			state.user = null;
		},
		[LOGIN_USER] (state, user) {
			state.status = { loggedIn: true };
			state.user = user
		},
		[SIGNUP_USER] (state, user) {
			state.status = { loggedIn: true }
			state.user = { user, isVerified: false };
		},
		[SIGNUP_USER_COMPLETE] (state) {
			state.status = {}
		},
		[SIGNUP_USER_REQUEST] (state) {
			state.status = {
				signingup: true
			}
		},
		[SIGNUP_USER_FAILURE] (state) {
			state.status = {}
			state.user = {}
		},
		updateProfileRequest(state) {
			state.status.updatingProfile = true
		},
		updateProfile(state, url) {
			state.status.updatingProfile = false;
			state.user.photoURL = url
		},
		updateProfileFail(state) {
			state.status.updatingProfile = false
		},
		updateEmail(state, email) {
			state.status.updatingEmail = false;
			state.user.email = email
		},
		updateEmailRequest(state) {
			state.status.updatingEmail = true
		},
		updateEmailFail(state) {
			state.status.updatingEmail = false
		},
		updatePasswordRequest(state) {
			state.status.updatingPassword = true;
		},
		updatePasswordFail(state) {
			state.status.updatingPassword = false;
		},
		updatePasswordComplete(state) {
			state.status.updatePassword = false;
		},
		logout(state) {
			state.status = {
				loggedIn: false
			};
			state.user = null;
		},
	},
	getters: {
		currentUser: state => {
			return state.user
		}
	}
}

export default User