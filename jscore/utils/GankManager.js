/*
 * @Author: Jpeng 
 * @Date: 2018-04-09 23:19:41 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-10 18:15:11
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import DbUtils from "./DbUtils";

export default class GankManager extends Component {
  static insertDb(ganks) {
    let newArr = [];
    for (let item of ganks) {
      newArr.push({
        ...item,
        time: item.publishedAt,
        image: item.images ? item.images[0] : " "
      });
    }
    DbUtils.insertArr('gank',newArr);
  }

  static getDataFromDb(type) {
    let objs = DbUtils.queryAll("gank");
    objs = objs.filtered("type=='" + type + "'");
    objs = objs.sorted("time", true);
    return objs;
  }
}
