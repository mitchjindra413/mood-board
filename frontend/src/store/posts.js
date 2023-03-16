import jwtFetch from "./jwt"
import { isLoading, finishedLoading, hideModal } from "./ui"
import moment from "moment"

const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
const RECEIVE_POST = 'posts/RECEIVE_POST'
const RECEIVE_POST_ERRORS = 'posts/RECEIVE_POST_ERRORS'
const CLEAR_POST_ERRORS = 'posts/CLEAR_POST_ERRORS'

const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
})

export const receivePostErrors = errors => ({
    type: RECEIVE_POST_ERRORS,
    errors
})

export const clearPostErrors = errors => ({
    type: CLEAR_POST_ERRORS
})

export const fetchPosts = (userId) => async dispatch => {
    dispatch(isLoading())
    try {
        // const filterParams = new URLSearchParams(filter)
        const res = await jwtFetch(`/api/posts/users/${userId}`)
        const posts = await res.json()
        dispatch(receivePosts(posts))
        dispatch(finishedLoading())
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            dispatch(receivePostErrors(res.errors))
            dispatch(finishedLoading())
        }
    }
}

export const fetchPost = (postId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/posts/${postId}`)
        const post = await res.json()
        dispatch(receivePost(post))
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receivePostErrors(res.errors))
        }
    }
}

export const createPost = (postData) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify(postData)
        });
        const post = await res.json();
        dispatch(receivePost(post));
        dispatch(hideModal());
    } catch (err) {
        const res = await err.json();
        if (res.statusCode === 400) {
            return dispatch(receivePostErrors(res.errors));
        }
    }
}

export const updatePost = (postId, postData) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(postData)
        })
        const post = await res.json()
        dispatch(receivePost(post))
        dispatch(hideModal())
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400){
            return dispatch(receivePostErrors(res.errors))
        }
    }
}

const nullErrors = null
export const postErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors
        case CLEAR_POST_ERRORS:
            return nullErrors
        default:
            return state
    }
}

export const postsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...state, ...action.posts }
        case RECEIVE_POST:
            return { ...state, [moment(action.post.createdAt).format('l')]: action.post }
        default:
            return state
    }
}