/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 14:22:13 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 14:55:41
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

export function fetchSuccess(data) {
  return {
    type: Types.FETCH_HOME_GANK_SUCCESS,
    data: data
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
        HttpUtils.get(
          FETCHGANKBYDAY_URL + responseJson.results[0].split('-').join('/'),
          responseJson => {
            dispatch(fetchSuccess(responseJson));
          },
          (error) => {
              alert(error)
            dispatch(fetchFailed());
          }
        );
      },
      (error) => {
        dispatch(fetchFailed());
      }
    );
  };
}
