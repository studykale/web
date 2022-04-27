import Vue from "vue";
import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle, faAddressCard,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faSlidersH
    ,faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faCalendar, faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown, faAddressBook, faAddressCard,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faSlidersH, faCalendar);
Vue.component('vue-fontawesome', FontAwesomeIcon);

import Buefy from 'buefy';
// import 'buefy/dist/buefy.css';


Vue.use(Buefy, {
    defaultIconPack: 'fas',
    defaultContainerElement: '#content',
});
