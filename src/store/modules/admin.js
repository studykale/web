import { users, projectsCollection, contactCollection } from "../../db"
import { SnackbarProgrammatic as Snackbar } from 'buefy'

const ad = {
	namespaced: true,
	state: {
		status: {},
		Users: [],
		Projects: [],
		contactUs: []
	},
	actions: {
		initAdProjects({ commit }) {
			commit('getAllProjectsRequest');
			projectsCollection
			.get()
			.then(result => {
				if(result.empty) {
					Snackbar.open({
						position: 'is-top',
						type: "is-danger",
						message: "No projects today"
					})
					commit('getAllProjectsFail')
				} else {
					result.forEach(r => {
							let id = r.id
							let deadline = r.data()['deadline'].toDate()
							delete r.data()['deadline']
							
							let pData = r.data()
							if(typeof pData.status === Object) {
								pData.status = 'began';
								pData.paid = r.data().status.paid;
								pData.payref = r.data().status.payRef;
							}
							pData.id = id;
							pData.deadline = deadline;
							commit('getAllProjects', pData)
					})
				}

			})
			.catch(error => {
				Snackbar.open({
					position: 'is-top',
					type: "is-warning",
					message: "Sorry we could not retrieve the projects :"+error.message
				})
			})
		},
		initAdUsers({ commit }) {
			commit('getAllUsersRequest')
			users
			.where('role', '==', 'CLIENT')
			.get()
			.then(users => {
				if(users.empty) {
					commit('getAllUsersFail')
					Snackbar.open({
						message: "No clients have signed up yet",
						type: 'is-info',
						position: 'is-top-right'
					})
				} else {
					users.forEach(u => {
						let userId = u.id;
						let data = u.data();
						commit('getAllUsers', { ...data, userId })
					})
				}
			})
			.catch(error => {
				Snackbar.open({
					type: 'is-warning',
					message: "No clients yet :"+error.message
				})
			})
		},
		initQuestions({ commit }) {
			commit('getAllQueriesRequest');
			contactCollection
			.get()
			.then(messages => {
				if(messages.empty) {
					commit('getAllQueriesFail');
					Snackbar.open({
						message: "No messages yet",
						type: 'is-black',
						position: 'is-top-right'
					})
				} else {
					messages.forEach(m => {
						let mId = m.id;
						let data = m.data()
						commit('getAllQueries', { ...data, mId })
					})
				}
			})
			.catch(error => {

				Snackbar.open({
					message: "Could not get queries from clients. "+error.message,
					type: 'is-info',
					position: 'is-bottom-right'
				})
			})
		},
		updateProjectStatus() {

		},

	},	
	mutations: {
		getAllQueries(state, payload) {
			state.status.gettingQueries = false;
			state.contactUs.unshift(payload)
		},
		getAllQueriesRequest(state) {
			state.status.gettingQueries = true
		},
		getAllQueriesFail(state) {
			state.status.gettingQueries = false;
			state.contactUs = []
		},
		getAllUsers(state, payload) {
			state.status.gettingUsers = false;
			state.Users.unshift(payload)
		},
		getAllUsersRequest(state) {
			state.status.gettingUsers = true
		},
		getAllUsersFail(state) {
			state.Users = [];
			state.status.gettingUsers = false;
		},
		getPaymentHistory() {

		},
		getPaymentHistoryRequest() {

		},
		getPaymentHistoryFail() {

		},
		sendNotificationAll() {

		},
		sendNotificationAllRequest() {

		},
		sendNotificationFail() {

		},
		sendNoteToOne() {

		},
		sendNoteToOneRequest() {

		},
		sendNoteToOneFail() {

		},
		getNotifications() {

		},
		getNotificationRequest() {

		},
		getNotificationFail() {

		},
		getAllProjects(state, payload) {
			state.status.gettingProjects = false;
			state.Projects.unshift(payload)
		},
		getAllProjectsRequest(state) {
			state.status.gettingProjects = true;
		},
		getAllProjectsFail(state) {
			state.status.gettingProjects = false;
			state.Projects = []
		},

	}
}

export default ad;