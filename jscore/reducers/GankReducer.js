/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 21:30:48 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-05 15:13:32
 * @Email: peng8350@gmail.com 
 */

//@flow
import * as Types from "../actions/ActionType";
const initStyles = {
  fetching: false,
  dataSource: [],
  error: false
};

export default function GankReducer(state = initStyles, action) {
  switch (action.type) {
    case Types.FETCH_GANK_FAILED:
      return {
        ...state,
        fetching: false,
        error: true
      };

    case Types.FETCH_GANK_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: false,
        dataSource: state.dataSource.concat(action.dataSource)
      };
    case Types.FETCH_GANK_REQUESTING:
      return {
        ...state,
        fetching: true
      };
      case Types.GANK_CLEARLIST:
      return {
        ...state,
        dataSource: []
      }
    default:
      return state;
  }
}
