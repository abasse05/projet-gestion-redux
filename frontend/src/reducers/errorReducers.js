import { GET_ERRORS } from "../types/messageTypes"


const initialState = {
    msg: {},
    status: null
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                msg:action.payload.msg,
                status: action.payload.status
            }
    
        default:
            return state
    }
}