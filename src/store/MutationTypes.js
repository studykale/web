export const LOGIN_USER = "auth/login";
export const LOGIN_REQUEST = "auth/logging_in"
export const LOGIN_FAILURE = "auth/login_fail"

export const SIGNUP_USER = "auth/signup";
export const SIGNUP_USER_REQUEST = "auth/signup_loading";
export const SIGNUP_USER_FAILURE = "auth/signup_fail";
export const SIGNUP_USER_COMPLETE = "auth/signup_complete";


export const GET_ALLPROJECTS = "projects/getAll";
export const GET_ALLPROJECTS_REQUEST = "projects/getAllRequest";
export const GET_ALLPROJECTSFAIL = "projects/getAllFail"

export const GET_ALLDRAFTS = "projects/getDrafts";
export const GET_ALLDRAFTS_REQUEST = "projects/getDraftsRequest";
export const GET_ALLDRAFTS_FAIL = "projects/getDraftsFail"

export const ADD_PROJECT = "project/new";
export const ADD_PROJECT_REQUEST = "project/new_loading";
export const ADD_PROJECT_FAILURE = "project/new_fail";

export const ADD_DRAFT_PROJECT = "project/draft";
export const ADD_DRAFT_PROJECT_REQUEST = "project/request_draft";
export const ADD_DRAFT_PROJECT_FAILURE = "project/failure_draft";

export const UPDATE_PROJECT = "project/update";
export const UPDATE_PROJECT_REQUEST = "project/update_loading";
export const UPDATE_PROJECTFAILURE = "project/update_fail";


export const MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';
export const MESSAGE_ERROR = 'ADD_MESSAGE_ERROR';
export const MESSAGE_DISMISSED = 'DISMISS_MESSAGE';