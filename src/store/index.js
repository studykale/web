import Vue from "vue";
import Vuex from "vuex";
import modulesCache from './modules'

const debug = process.env.NODE_ENV !== 'production';


Vue.use(Vuex);

const store =  new Vuex.Store({
	strict: debug,
	modules: modulesCache
});




export default store