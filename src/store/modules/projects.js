import { ADD_PROJECT, ADD_PROJECT_REQUEST, ADD_PROJECT_FAILURE, ADD_DRAFT_PROJECT, ADD_DRAFT_PROJECT_REQUEST, ADD_DRAFT_PROJECT_FAILURE } from "../MutationTypes";
import { } from "../../db";

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

const projects = {
    namespaced: true,
    state: {
    	projects: [],
    	project: {
    		status: "",
    		type: "",
    		completionDateTime: ""
    	}
    },
    mutations: {
    	[ADD_PROJECT_REQUEST] () {

    	},
    	[ADD_PROJECT_FAILURE] () {

    	},
    	[ADD_PROJECT] () {

    	},
    	[ADD_DRAFT_PROJECT] (state) {

    	},
    	[ADD_DRAFT_PROJECT_REQUEST] () {

    	},
    	[ADD_DRAFT_PROJECT_FAILURE] () {

    	}
    },
    actions: {
    	addNewProject({ commit }, data) {

    	}
    }
}

export default projects;