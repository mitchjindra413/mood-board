const SHOW_LOGIN_MODAL = 'ui/SHOW_LOGIN_MODAL'
const HIDE_MODAL = 'ui/HIDE_MODAL'
const SHOW_SIGNUP_MODAL = 'ui/SHOW_SIGNUP_MODAL'
const SHOW_POST_MODAL = 'ui/SHOW_POST_MODAL'
const IS_LOADING = 'ui/IS_LOADING'
const FINISHED_LOADING = 'ui/FINISHED_LOADING'
const SHOW_CREATE_POST = 'ui/SHOW_CREATE_POST'
const EDIT_POST = 'ui/EDIT_POST'

export const showLoginModal = () => ({
    type: SHOW_LOGIN_MODAL
})

export const hideModal = () => ({
    type: HIDE_MODAL
})

export const showSignupModal = () => ({
    type: SHOW_SIGNUP_MODAL
})

export const showPostModal = (postId) => ({
    type: SHOW_POST_MODAL,
    postId
})

export const isLoading = () => ({
    type: IS_LOADING
})

export const finishedLoading = () => ({
    type: FINISHED_LOADING
})

export const showCreatePost = () => ({
    type: SHOW_CREATE_POST
})

const uiReducer = (state = {modal: '', postModal: '', loading: false}, action) => {
    switch (action.type) {
        case SHOW_LOGIN_MODAL:
            return { ...state, modal: 'login' }
        case HIDE_MODAL:
            return { ... state, modal: null, postModal: null }
        case SHOW_SIGNUP_MODAL:
            return { modal: 'signup' }
        case SHOW_POST_MODAL:
            return { ...state, postModal: `${action.postId}` }
        case IS_LOADING:
            return { ...state, loading: true }
        case FINISHED_LOADING:
            return { ...state, loading: false }
        case SHOW_CREATE_POST:
            return { ...state, modal: 'createPost'}
        default:
            return state
    }
}

export default uiReducer