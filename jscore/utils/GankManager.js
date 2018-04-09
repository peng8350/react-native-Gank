/*
 * @Author: Jpeng 
 * @Date: 2018-04-09 23:19:41 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-10 00:23:19
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import DbUtils from "./DbUtils";

export default class GankManager extends Component {
  // _id: "int",
  // type: "string",
  // who: "bool",
  // url: 'string',
  // image: "string",
  // desc: "string",
  // time: "string",
  static insertDb(ganks) {
    for (let i = 0; i < ganks.length; i++) {
      DbUtils.insert("gank", {
        _id: ganks[i]._id,
        type: ganks[i].type,
        who: ganks[i].who,
        desc: ganks[i].desc,
        time: ganks[i].publishedAt,
        url: ganks[i].url,
        image: ganks[i].images? ganks[i].images[0] : ' '
      });
    }
  }

  static getDataFromDb(pageIndex,type){
      let objs =DbUtils.queryAll('gank')
      objs = objs.filtered("type == '"+type+"'")
      objs = objs.sorted('time',true)
      objs = objs.slice(pageIndex*20+1,20)
      
        return objs;
  }
}
