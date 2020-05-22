
import { LOGIN_USER, SIGNUP_USER, LOGIN_REQUEST, SIGNUP_USER_REQUEST, LOGIN_FAILURE, SIGNUP_USER_FAILURE } from "../MutationTypes"
import { auth } from "../../db"
import { NotificationProgrammatic as Notification } from 'buefy'
// import { SnackbarProgrammatic as Snackbar } from 'buefy'

import router from "../../router"
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
				commit('authUser', user)
			})
		},
		login({ commit }, payload) {
			auth.signInWithEmailAndPassword(payload.email, payload.password)
			.then(user => {
				console.log("user", user)
			})
			.catch(error => {
				if(error.code == "auth/user-not-found") {
					Notification.open({
						type: 'is-warning',
						message: "No account found by the email",
						duration: 3000,
					})
				}
				commit(LOGIN_FAILURE)
			})
		},
		signUp({ commit, dispatch }, payload) {
			auth.createUserWithEmailAndPassword(payload.email, payload.password)
			.catch(error => {
				commit(SIGNUP_USER_FAILURE)
				console.log("error", error);
				Notification.open({
					type: 'is-warning',
					position: 'is-top',
					duration: 5000,
					message: "Sorry we could not sign you up."
				})
			})

			auth.onAuthStateChanged(async user => {

				user.emailVerified = false;
				const actionCodeSettings = {
					url: 'http://localhost:8080/auth/sign-in?verification='+user.email
				}

				await user
				.sendEmailVerification(actionCodeSettings)
				.then(() => {
					
					dispatch('notifications/successAlert', {
							mKey: getRandomInt(),
							duration: 3000,
							message: 'We have sent a verification email. Use it to verify your email',
							type: 'is-info'
						}, {root: true})
				})
				.catch(error => {
					console.log("email errors", error)
					dispatch('notifications/successAlert', {
						mKey: getRandomInt(),
						duration: 3000,
						message: 'The verification email was not sent please try again.',
						type: 'is-warning'
					}, {root: true})
				})

				await user.updateProfile({
					displayName: payload.username,
				})
				.then(() => {
					commit(SIGNUP_USER, user)
					setTimeout(() => {
						router.push(`/dashboard/${user.displayName}/projects`)
					}, 3000);
				}, (error) => {
					commit(SIGNUP_USER_FAILURE)
					console.log("error", error)
					Notification.open({
						type: 'is-danger',
						position: 'is-top-right',
						duration: 4000,
						message: "Sorry we could not sign you in."
					})
				})
			})
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
	getters: {
		currentUser: state => {
			return state.user
		}
	}
}

export default User