/*
 * @Author: Jpeng 
 * @Date: 2018-04-09 23:19:41 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-10 16:02:48
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import DbUtils from "./DbUtils";

export default class GankManager extends Component {
  static insertDb(ganks) {
    for (let i = 0; i < ganks.length; i++) {
      DbUtils.insert("gank", {
        type: ganks[i].type,
        who: ganks[i].who,
        desc: ganks[i].desc,
        time: ganks[i].publishedAt,
        url: ganks[i].url,
        image: ganks[i].images? ganks[i].images[0] : ' '
      });
    }
  }

  static getDataFromDb(type){
      let objs =DbUtils.queryAll('gank')
      objs = objs.filtered("type == '"+type+"'")
      objs = objs.sorted('time',true)
      return objs;
  }
}
