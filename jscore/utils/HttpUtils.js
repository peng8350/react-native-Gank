/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 20:41:54 
 * @Last Modified by: Jpeng
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:54:49
 */

//@flow
import React, { Component } from "react";

export default class HttpUtils extends Component {
  static post(url, params = {}, scCallBack, failCallback) {
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    })
      .then(response => response.JSON)
      .then(responseJson => scCallBack(responseJson))
      .catch(error => failCallback(error));
  }

  static get(url, scCallBack, failCallback) {
    fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        scCallBack(responseJson);
      })
      .catch(error => failCallback(error));
  }
}
