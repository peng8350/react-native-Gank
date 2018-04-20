/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 21:32:13 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:29:44
 * @Email: peng8350@gmail.com 
 */

//@flow
import * as Types from "./ActionType";
import HttpUtils from "../utils/HttpUtils";
import { ToastAndroid } from "react-native";
import { isIOS, isAndroid } from "../utils/SystemUtils";


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
          if(isAndroid())
          ToastAndroid.show('搜索失败,检查网络!!!',0);
          dispatch(searchFailed())
        }
      );
    }, 500);
  };

}

export function showMore(flag){
  return {
    type: Types.GANK_SHOWITEMMORE,
    showMore: flag
  }
}