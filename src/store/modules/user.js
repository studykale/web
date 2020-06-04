
import { LOGIN_USER, SIGNUP_USER, LOGIN_REQUEST, SIGNUP_USER_REQUEST, LOGIN_FAILURE, SIGNUP_USER_FAILURE } from "../MutationTypes"
import { auth, newUser } from "../../db"
import { NotificationProgrammatic as Notification } from 'buefy'


import router from "../../router"
// function getRandomInt() {
// 	return Math.floor(Math.random() * 100)
// }

// function onIdTokenRevocation() {
// 	// For an email/password user. Prompt the user for the password again.
// 	let password = prompt('Please provide your password for reauthentication');
// 	let credential = auth.EmailAuthProvider.credential(auth.currentUser.email, password);
// 	auth.currentUser.reauthenticateWithCredential(credential)
// 	.then(result => {
// 		console.log("result", result)
// 		// User successfully reauthenticated. New ID tokens should be valid.
// 	})
// 	.catch(error => {
// 		console.log("error token", error)
// 	});
// }

function sendVerificationEmail(user, url) {
	user.sendEmailVerification({
		url: url,
		canHandleCodeInApp: false
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
		user: null
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
					console.log("No")
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
				dispatch('projects/initProjects', { userId }, { root: true })
				window.$cookies.set('loggedIn', true, '1d');
				commit(LOGIN_USER, { username: user.displayName, email: user.email, verified: user.emailVerified, photoUrl: user.photoURL, userId: user.uid })
				router.replace('/dashboard/projects');
			})
			.catch(error => {
				console.log("error sign in", error)
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
					displayName: payload.username
				}).then(()=> {
					newUser(data.user.uid)
					.set({
						role: 'CLIENT',
						username: payload.username,
						email: payload.email,
						profile: data.user.photoURL,
						verified: data.user.emailVerified
					}, { merge: true })
				})
				.then(() => {
					sendVerificationEmail(data.user, 'http://localhost:8080/auth/signin')
					Notification.open({
						message: "A verification email has been sent",
						type: 'is-info',
						duration: 5000
					})
	
					router.push('/auth/signin')
				})
				.catch(error => {
					console.log("error", error)
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
				localStorage.removeItem('vuex')
				router.replace('/')
			})
			.catch(error => {
				console.log("log out error", error)
			})
		},
		fetchUser({ commit }, user) {
			if(user) {
				commit('setUser', { username: user.displayName, photoURL: user.photoURL, email: user.email, verified: user.emailVerified, userId: user.uid });
			} else {
				commit('setUser', null)
			}
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