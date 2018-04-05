/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 21:32:13 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-05 14:50:58
 * @Email: peng8350@gmail.com 
 */

//@flow
import * as Types from "./ActionType";
import HttpUtils from "../utils/HttpUtils";

export function fetchSuccess(results) {
  return {
    type: Types.FETCH_GANK_SUCCESS,
    dataSource: results
  };
}

export function fetchLoading() {
  return {
    type: Types.FETCH_GANK_REQUESTING
  };
}

export function fetchFailed() {
  return {
    type: Types.FETCH_GANK_FAILED
  };
}

export function fetchGank(url) {
  return dispatch => {
    dispatch(fetchLoading());
    setTimeout(() => {
      HttpUtils.get(
        url,
        responseJson => {
          dispatch(fetchSuccess(responseJson.results));
        },
        error => {
          dispatch(fetchFailed());
        }
      );
    }, 500);
  };
}

