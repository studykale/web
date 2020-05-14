import { MESSAGE_DISMISSED, MESSAGE_ERROR, MESSAGE_SUCCESS } from "../MutationTypes"
const defaultDuration = 3000;

const Notifications = {
	namespaced: true,
	state: {
		Messages: []
	},
	actions: {
		successAlert({ commit }, message) {
            let duration = message.duration || defaultDuration;
            var timeout = setTimeout(function () {
                commit(MESSAGE_DISMISSED, message)
            }, duration);

            commit(MESSAGE_SUCCESS,  {
                Raw: message,
                TimeOut: timeout
            })
        },
        errorAlert({ commit }, message) {
            let duration = message.duration || defaultDuration;
            var timeout = setTimeout(function () {
                commit(MESSAGE_DISMISSED, message)
            }, duration);

            commit(MESSAGE_ERROR, {
                Raw: message,
                TimeOut: timeout
            })
        },
        clear(context, message) {
            //Just pass payload.
            context.commit(MESSAGE_DISMISSED, message);
        }
	},
	mutations: {
		// We receive current state and a payload
        [MESSAGE_SUCCESS](state,  message ) {
            state.Messages.push(message)
        },
        [MESSAGE_ERROR](state, message) {
           state.Messages.push(message)
        },
        // Remember current state, payload
        [MESSAGE_DISMISSED](state, messageRaw) {
            var i = state.Messages.map(n => n.Raw).indexOf(messageRaw);
            if(i == -1) {
                return;
            }
            clearTimeout(state.Messages[i].timeout);
            state.Messages.splice(i, 1);
        }
	},
	getters: {
		Messages: state => state.Messages.map(n => n.Raw)
	}
	
}

export default Notifications