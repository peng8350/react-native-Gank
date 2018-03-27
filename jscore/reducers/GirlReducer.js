/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 12:37:59 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-27 12:43:36
 * @Email: peng8350@gmail.com 
 */

 //@flow
import * as Types from '../actions/ActionType'

const initState = {
    fetching: false,
    dataSource: [],
    error: false
}


export default function GirlReducer(state=initState,action){
    switch(action.types){
        case Types.FETCH_GIRL_REQUESTING:
            return state;
        case Types.FETCH_GIRL_SUCCESS:
            return state;
        case Types.FETCH_GIRL_FAILED:
            return state;
        default:

            return state;
    }
}