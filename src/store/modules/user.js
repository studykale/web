
import { LOGIN_USER, SIGNUP_USER, SIGNUP_USER_COMPLETE, LOGIN_REQUEST, SIGNUP_USER_REQUEST, LOGIN_FAILURE, SIGNUP_USER_FAILURE } from "../MutationTypes"
import { auth, newUser, users } from "../../db"
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
// 		//("result", result)
// 		// User successfully reauthenticated. New ID tokens should be valid.
// 	})
// 	.catch(error => {
// 		//("error token", error)
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
		//("email send", error)
		Notification.open({
			type: 'is-danger',
			message: `${error.message}. Please try again`
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
					commit(SIGNUP_USER_COMPLETE)
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
							commit(LOGIN_USER, { username: user.displayName, email: user.email, verified: user.emailVerified, photoUrl: user.photoURL, userId })
							router.push('/admin/projects')
						}
					} else {	
						Notification.open({
							message: "Sorry we did not find your account.",
							type: 'is-info',
							hasIcon: true
						})
					}
				})
				.catch(error => {
					Notification.open({
						type: 'is-warning',
						hasIcon: true,
						position: 'is-top',
						message: "Sorry we did not find your account. "+error.message
					})
				})
			})
			.catch(error => {
				Notification.open({
					type: 'is-warning',
					hasIcon: true,
					position: 'is-top',
					message: "Sorry we did not find your account. "+error.message
				})
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