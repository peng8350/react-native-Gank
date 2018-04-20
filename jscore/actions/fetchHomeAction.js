/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 14:22:13 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:56:05
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import * as Types from "./ActionType";
import HttpUtils from "../utils/HttpUtils";
import { FETCHALLDATE_URL, FETCHGANKBYDAY_URL } from "../constants/strings";

export function fetchRequesing() {
  return {
    type: Types.FETCH_HOME_GANK_REQUSTING
  };
}

export function fetchSuccess(data, date) {
  let dt = [];
  dt.push(...data.results.前端);
  dt.push(...data.results.Android);
  dt.push(...data.results.iOS);
  dt.push(...data.results.App);

  dt.push(...data.results.瞎推荐);
  dt.push(...data.results.拓展资源);
  return {
    type: Types.FETCH_HOME_GANK_SUCCESS,
    data: dt,
    date: date
  };
}

export function fetchFailed() {
  return {
    type: Types.FETCH_HOME_GANK_FAILED
  };
}

export function fetchData() {
  return dispatch => {
    dispatch(fetchRequesing());
    HttpUtils.get(
      FETCHALLDATE_URL,
      responseJson => {
        let date = responseJson.results[0].split("-").join("/");
        HttpUtils.get(
          FETCHGANKBYDAY_URL + date,
          responseJson => {
            dispatch(fetchSuccess(responseJson, date));
          },
          error => {
            alert(error);
            dispatch(fetchFailed());
          }
        );
      },
      error => {
        dispatch(fetchFailed());
      }
    );
  };
}
