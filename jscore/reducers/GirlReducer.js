/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 12:37:59 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-28 23:36:45
 * @Email: peng8350@gmail.com 
 */

//@flow
import * as Types from "../actions/ActionType";

const initState = {
  fetching: false,
  dataSource: [],
  error: false,
  viewing: false, //是否在查看图片中
  viewIndex: 0,//查看图片的下标在数组里第几个元素
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
      let dt = state.dataSource;
      return {
        ...state,
        fetching: false,
        error: false,
        dataSource: action.up?[].concat(action.dataSource):state.dataSource.concat(action.dataSource)
      };
    case Types.FETCH_GIRL_FAILED:
    return {
        ...state,
        fetching:false,
        error:true
    };
    case Types.START_VIEWPIC:
    return {
      ...state,
      viewing: true,
      viewIndex: action.viewIndex
    }
    case Types.STOP_VIEWPIC:
    return {
      ...state,
      viewing: false,
      viewIndex: 0
    }
    default:
      return state;
  }
}
