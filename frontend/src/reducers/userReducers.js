import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, USER_LOADING, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_FAIL } from "../types/userTypes"

const initialState = {
    token: localStorage.getItem('token'),
    token_refresh: localStorage.getItem('token_refresh'),
    isAuthenticated: null,
    isRegister: null,
    isLoading: false,
    user: [],
    userData: null
}
// eslint-disable-next-line
export default function(state = initialState, action){
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
        }
        
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
        }

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case TOKEN_REFRESH_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('token_refresh')
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                token_refresh: null,
                user: [],
                isLoading: false
        }
    
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('token_refresh')
            return {
                ...state,
                isAuthenticated: false,
                isRegister: false,
                token: null,
                token_refresh: null,
                user: [],
                isLoading: false
        }

        case LOGIN_SUCCESS:
        case TOKEN_REFRESH_SUCCESS:
            localStorage.setItem('token', action.payload['access'])
            localStorage.setItem('token_refresh', action.payload['refresh'])
            return {
                ...state,
                token: localStorage.getItem('token'),
                token_refresh: localStorage.getItem('token_refresh'),
                isAuthenticated: true,
                isLoading: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegister: true,
                isLoading: false
            }

        default:
            return state
    }
}


