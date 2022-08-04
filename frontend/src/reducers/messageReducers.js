import { CREATE_MESSAGE } from "../types/messageTypes"

const initialState = {}

// eslint-disable-next-line
export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_MESSAGE:
            return (state = action.payload)
            
        default:
            return state
    }
}