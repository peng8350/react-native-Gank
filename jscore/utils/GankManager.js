/*
 * @Author: Jpeng 
 * @Date: 2018-04-09 23:19:41 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-18 20:48:39
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import DbUtils from "./DbUtils";

export default class GankManager extends Component {
  static insertDb(ganks) {

    DbUtils.insertArr('gank',ganks);
  }

  static toGankBean(ganks){
    let newArr = [];
    for (let item of ganks) {
      newArr.push({
        ...item,
        like: false,
        who: item.who?item.who:'空',
        time: item.publishedAt,
        image: item.images ? item.images[0] : " "
      });
    }
    return newArr
  }

  static getDataFromDb(type) {
    var objs = DbUtils.queryAll("gank");
    objs = objs.filtered("type=='" + type + "'");
    objs = objs.sorted("time", true);
    return objs;
  }

  static getLikeFromDb(type) {
    var objs = DbUtils.queryAll("gank");
    objs = objs.filtered("type=='" + type + "' and like == true");
    objs = objs.sorted("time", true);
    return objs;
  }
}
