/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 14:21:13 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 17:12:28
 * @Email: peng8350@gmail.com 
 */

//@flow

import * as Types from "../actions/ActionType";

const initState = {
  dataSource: [],
  newDate: '暂无',
  loading: false,
  error: false
};

export default function HomeReducer(state = initState, action) {
  switch (action.type) {
    case Types.FETCH_HOME_GANK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: true,
        newDate: action.date,
        dataSource: action.data
      };
    case Types.FETCH_HOME_GANK_REQUSTING:
      return {
        ...state,
        loading: true
      };
    case Types.FETCH_HOME_GANK_FAILED:
      return {
        ...state,
        loading: false,
        error: true
      };
  }
  return state;
}
