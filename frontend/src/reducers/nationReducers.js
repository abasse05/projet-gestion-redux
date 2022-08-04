import { LOADED_NATION, LOADING_NATION, LOADING_NATION_ERROR } from "../types/nationTypes"

const initialState = {
    pays: [],
    isNationLoading: false
}
// eslint-disable-next-line
export default function(state = initialState, action){
    switch (action.type) {
        case LOADING_NATION:
            return {
                ...state,
                isNationLoading: true
        }
        
        case LOADED_NATION:
            return {
                ...state,
                isNationLoading: false,
                pays: action.payload
        }

        case LOADING_NATION_ERROR:
            return {
                ...state,
                isNationLoading: false
        }
    
        default:
            return state
    }
}


