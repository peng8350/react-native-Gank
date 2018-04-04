import { Component } from "react";

/*
 * @Author: Jpeng 
 * @Date: 2018-04-03 22:55:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 00:22:29
 * @Email: peng8350@gmail.com 
 */

//@flow

const Realm = require("realm");

const SettingSchema = {
  name: "Setting",
  primaryKey: "id", // 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
  properties: {
    id: "int",
    isNight: "bool",
    autoRefresh: "bool",
    picPos: "string"
  }
};

var realm;
Realm.open({ schema: [SettingSchema] })
  .then(realmm => {
    realm = realmm;

    DbUtils.insert("Setting", {
      id: 1,
      isNight: false,
      autoRefresh: false,
      picPos: ".."
    });
  })
  .catch(error => {});

export default class DbUtils extends Component {
  /**
   * @param {*} table  表的名字
   * @param {*} filter  过滤条件,例如id==3
   */
  static delete(table, filter) {
    realm.write(() => {
      let objs = realm.objects(table);
      let obj = objs.filtered(filter);
      realm.delete(obj);
    });
  }

  /**
   * 更新的方法,使用例子 DbUtils.update('tableName',{id:? , a:v,b:v,c:v})
   * @param {*} table  表的名字
   * @param {*} filter  使用对象传入的参数,属性值更新对应
   */
  static update(table, updateObj) {
    realm.write(() => {
      realm.create(table, updateObj, true);
    });
  }
  /*
    * 用法和上面一样
    */
  static insert(table, insertObj) {
    realm.write(() => {
      realm.create(table, insertObj);
    });
  }

  /**
   * 只查询唯一一个元素
   */
  static queryFirst(table, filter) {
    let objs = realm.objects(table);
    let obj = objs.filtered(filter);
    return obj[0];
  }

  /**
   * 查询满足这些条件的数据
   */
  static queryAll(table, filter) {
    let objs = realm.objects(table);
    let obj = objs.filtered(filter);
    return obj;
  }
}
