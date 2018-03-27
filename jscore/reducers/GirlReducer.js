/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 12:37:59 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-27 21:43:08
 * @Email: peng8350@gmail.com 
 */

//@flow
import * as Types from "../actions/ActionType";

const initState = {
  fetching: false,
  dataSource: [],
  error: false
};

export default function GirlReducer(state = initState, action) {
  switch (action.type) {
    case Types.FETCH_GIRL_REQUESTING:
      return {
        ...state,
        fetching: true,
        error: false
      };
    case Types.FETCH_GIRL_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: false,
        dataSource: state.dataSource.concat(action.dataSource)
      };
    case Types.FETCH_GIRL_FAILED:
    return {
        ...state,
        fetching:false,
        error:true
    };
    default:
      return state;
  }
}
