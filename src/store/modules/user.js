
import { LOGIN_USER, SIGNUP_USER, LOGIN_REQUEST, SIGNUP_USER_REQUEST, LOGIN_FAILURE, SIGNUP_USER_FAILURE } from "../MutationTypes"
import { auth } from "../../db"
function getRandomInt() {
	return Math.floor(Math.random() * 100)
}
const User = {
	namespaced: true,
	state: {
		status: {
			loggedIn: false
		},
		user: {}
	},
	actions: {
		init({commit}) {
			auth.onAuthStateChanged(user => {
				console.log("user", user)
				commit('authUser', user)
			})
		},
		login({ dispatch, commit }, payload) {
			auth.signInWithEmailAndPassword(payload.email, payload.password)
			.then(user => {
				console.log("user", user)
			})
			.catch(error => {
				if(error.code == "auth/user-not-found") {
					dispatch('notifications/successAlert', {
						mKey: getRandomInt(),
						message: "Email, Password Combination not correct please try again",
						type: 'is-warning'
					}, {root: true})
				}
				commit(LOGIN_FAILURE)
				console.log("error", error)
			})
		},
		signUp() {

		},
		passwordRequest() {

		},
		passChange() {

		},


	},
	mutations: {
		authUser (state, user) {
			state.user = user
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
			state.user = user
		},
		[SIGNUP_USER] (state, user) {
			state.status = { loggedIn: true }
			state.user = { user, isVerified: false };
		},
		[SIGNUP_USER_REQUEST] (state) {
			state.status = {
				signingup: true
			}
		},
		[SIGNUP_USER_FAILURE] (state) {
			state.status = {}
			state.user = {}
		}
	},
}

export default User