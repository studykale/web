
import { LOGIN_USER, SIGNUP_USER, LOGIN_REQUEST, SIGNUP_USER_REQUEST, LOGIN_FAILURE, SIGNUP_USER_FAILURE } from "../MutationTypes"
import { auth } from "../../db"
import { NotificationProgrammatic as Notification } from 'buefy'
// import { SnackbarProgrammatic as Snackbar } from 'buefy'

import router from "../../router"
// function getRandomInt() {
// 	return Math.floor(Math.random() * 100)
// }

function onIdTokenRevocation() {
	// For an email/password user. Prompt the user for the password again.
	let password = prompt('Please provide your password for reauthentication');
	let credential = auth.EmailAuthProvider.credential(auth.currentUser.email, password);
	auth.currentUser.reauthenticateWithCredential(credential)
	.then(result => {
		console.log("result", result)
		// User successfully reauthenticated. New ID tokens should be valid.
	})
	.catch(error => {
		console.log("error token", error)
	});
}

function sendVerificationEmail(user, url) {
	user.sendEmailVerification({
		url: url
	})
	.then(() => {
		Notification.open({
			type: 'is-info',
			message: "Email verification sent"
		})
	})
	.catch(error => {
		console.log("email send", error)
		Notification.open({
			type: 'is-danger',
			message: "An error coccured and we could not send an email. Please try again."
		})

	})
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
				if(user) {
					
					commit('authUser', { username: user.displayName, email: user.email, id: user.uid,  verified: user.emailVerified })
				} else {
					router.push('/auth/signin');
				}
			}).catch(error => {
				if(error.code == 'auth/id-token-expired' || error.code == 'auth/user-token-expired') {
					onIdTokenRevocation()
				} else {
					router.push('/auth/signin')
				}
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
		signUp({ commit }, payload) {
			commit(SIGNUP_USER_REQUEST);
			
			auth.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(data => {
				data.user.updateProfile({
					displayName: payload.username
				}).then(()=> {
					sendVerificationEmail(data.user, 'https://studykale-test.netlify.app/auth/signin')
					router.push(`/dashboard/${data.user.displayName}/projects`)
				})
				.catch(error => {
					console.log("error", error)
				})
			})
			.catch(error => {
				commit(SIGNUP_USER_FAILURE)
				console.log("error", error);
				
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
		passwordRequest() {

		},
		passChange() {

		},
		signout({ commit }) {
			auth.signOut()
			.then(() => {
				router.push('/')
			})
			.catch(error => {
				console.log("log out error", error)
			})
			commit('logout')
		}
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