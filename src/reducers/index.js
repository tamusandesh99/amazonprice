import auth from './auth'
import profile from './profile'
import posts from'./posts'
import { combineReducers } from 'redux'
import limit from './limit'

export default combineReducers({
    auth,
    profile,
    posts,
    limit
})