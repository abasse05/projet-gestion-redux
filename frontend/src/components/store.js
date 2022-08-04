import {combineReducers, applyMiddleware} from 'redux'
import { legacy_createStore as createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import errorReducers from '../reducers/errorReducers'
import messageReducers from '../reducers/messageReducers'
import nationReducers from '../reducers/nationReducers'
import userReducers from '../reducers/userReducers'

const initialState = {}

const store = createStore(
    combineReducers({
        init:initialState,
        user: userReducers,
        nation: nationReducers,
        messages: messageReducers,
        errors: errorReducers
    }),
    composeWithDevTools(applyMiddleware(thunk))
)

export default store