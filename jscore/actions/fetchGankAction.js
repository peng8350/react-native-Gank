/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 21:32:13 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-06 22:33:07
 * @Email: peng8350@gmail.com 
 */

//@flow
import * as Types from "./ActionType";
import HttpUtils from "../utils/HttpUtils";
import { ToastAndroid } from "react-native";
import { isIOS, isAndroid } from "../utils/SystemUtils";

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

export function clearList() {
  return {
    type: Types.GANK_CLEARLIST
  };
}

export function toggleSearch(searching){
  return {
    type: (searching?Types.ENTER_SEARCH:Types.EXIT_SEARCH),
  }
}

export function searchRequesting(){
  return {
    type: Types.SEARCH_GANK_REQUESTING
  }
}

export function searchSuccess(list){
  return {
    type:Types.SEARCH_GANK_SCCUESS,
    data: list
  }
}

export function searchFailed(){
  return {
    type:Types.SEARCH_GANK_FAILED
  }
}

export function searchGank(url){
  return dispatch => {
    dispatch(searchRequesting());
    setTimeout(() => {
      HttpUtils.get(
        url,
        responseJson => {
          dispatch(searchSuccess(responseJson.results));
        },
        error => {
          alert(error)
          if(isAndroid())
          ToastAndroid.show('搜索失败,检查网络!!!',0);
          dispatch(searchFailed())
        }
      );
    }, 500);
  };

}