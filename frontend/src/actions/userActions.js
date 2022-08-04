
import jwt_decode from "jwt-decode"
import axios from "../components/api/axios"
import { AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, USER_LOADING, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_FAIL } from "../types/userTypes"

export const tokenConfig = getState => {
    const token = getState.user.token ? getState.user.token : null
    //Headers
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    //If Token, add to headers config
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}

export const loadUser = () => (dispatch, getState) => {
    //USER LOADING

    dispatch({type: USER_LOADING})

    // get token
    // console.log(`userData: ${getState().user.userData}`)
    if(getState().user.token !== null){
        console.log("dans if")
        const token = getState().user.token
        const user_id = jwt_decode(token).user_id
        axios.get(`/apiaccount/user/${user_id}`, tokenConfig(getState()))
        .then(reponse => {
            dispatch({
                type: USER_LOADED,
                payload: reponse.data
            })
            console.log(`user : ${reponse.data}`)
        })
        .catch(error => {
            dispatch({
                type:AUTH_ERROR
            })
        })
    }
    
}

//
export const configHeaders = {
    headers:{
        'Content-Type': 'application/json'
    }
}

export const refreshToken = () => (dispatch, getState) => {
    console.log("Update Token ...")
    const config = configHeaders
    const body = JSON.stringify({'refresh': getState().user.token_refresh})
    axios.post('/apiaccount/token/refresh/', body, config)
    .then(response => {
        dispatch({
            type: TOKEN_REFRESH_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        console.log(error.response?.data)
        dispatch({
            type: TOKEN_REFRESH_FAIL
        })
    })
}

export const login = (username, password) => (dispatch) => {
    const config = configHeaders
    const body = JSON.stringify({username,password})
    axios.post('/apiaccount/token/', body, config)
    .then(response => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
    })
    .catch(error => {
        console.log(error.response?.data)
        dispatch({
            type: LOGIN_FAIL
        })
    })

}

export const logout = () => (dispatch) => {

    dispatch({
        type: LOGOUT_SUCCESS
    })
}

export const register = (dataFormatJson) => (dispatch) => {
        const config = configHeaders
        const bodys = dataFormatJson

        axios.post('/api/personne/', bodys, config)
        .then(reponse => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: reponse.data
            })
        })
        .catch(error => {
            dispatch({
                type: REGISTER_FAIL
            })
            dispatch(console.log(error.response?.data))
        })
}