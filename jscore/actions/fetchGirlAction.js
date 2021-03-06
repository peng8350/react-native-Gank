/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 12:37:42 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 00:02:18
 * @Email: peng8350@gmail.com 
 */

//@flow

import * as Types from "./ActionType";
import { FETCHGIRL_URL } from "../constants/strings.js";
import HttpUtils from "../utils/HttpUtils";

export function fetchGirlRequesting() {
  return {
    type: Types.FETCH_GIRL_REQUESTING
  };
}

export function fetchGirlFailed() {
  return {
    type: Types.FETCH_GIRL_FAILED
  };
}

export function fetchGirlSuccess(dataSource, isUp) {
  return {
    type: Types.FETCH_GIRL_SUCCESS,
    dataSource: dataSource.results,
    up: isUp
  };
}

export function fetchGirl(isUp, pageIndex, successcall) {
  const fetchGirlUrl = FETCHGIRL_URL + pageIndex;
  return dispatch => {
    dispatch(fetchGirlRequesting());
    setTimeout(() => {
      HttpUtils.get(
        fetchGirlUrl,
        responseJson => {
          successcall();
          dispatch(fetchGirlSuccess(responseJson, isUp));
        },
        error => {
          successcall();
          dispatch(fetchGirlFailed());
        }
      );
    }, 1000);
  };
}

export function startViewPic(index) {
  return {
    type: Types.START_VIEWPIC,
    viewIndex: index
  };
}

export function stopViewPic() {
  return {
    type: Types.STOP_VIEWPIC
  };
}
