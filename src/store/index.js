import Vue from "vue";
import Vuex from "vuex";
import modulesCache from './modules'
import createPersistedState from "vuex-persistedstate";

// const debug = process.env.NODE_ENV !== 'production';


Vue.use(Vuex);

const store =  new Vuex.Store({
	// strict: debug,
	modules: modulesCache,
	plugins: [
		createPersistedState({})
	]
});

export default store