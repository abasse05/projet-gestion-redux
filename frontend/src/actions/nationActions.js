import axios from "../components/api/axios"
import { LOADED_NATION, LOADING_NATION, LOADING_NATION_ERROR } from "../types/nationTypes"

export const getNations = () => (dispatch) => {
    dispatch({type: LOADING_NATION})

    axios.get('/api/nationalite/', null) 
    .then(reponse => {
        dispatch({
            type: LOADED_NATION,
            payload: reponse.data.results
        })
    })
    .catch(error => {
        dispatch(console.log(error.response?.data))
        dispatch({
            type: LOADING_NATION_ERROR
        })
    })
}