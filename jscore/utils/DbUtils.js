import { Component } from "react";

/*
 * @Author: Jpeng 
 * @Date: 2018-04-03 22:55:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 23:23:14
 * @Email: peng8350@gmail.com 
 */

 //@flow

 const Realm = require('realm')

  const SettingSchema = {
    name: 'Setting',
    primaryKey:'id',    // 官方没给出自增长的办法,而且一般不会用到主键,这也解决了重复访问的问题,而且实际开发中我们不需要主键的,让服务端管就是了
    properties: {
        id: 'int',
        isNight: 'bool',
        AutoRefesh: 'bool',
        picPos : 'string'
    }
};
 
const realm = new Realm({schema: [SettingSchema]});
 export default class DbUtils extends Component{

     /**
      * @param {*} table  表的名字
      * @param {*} filter  过滤条件,例如id==3
      */
    static delete(table,filter){
        
        realm.write(() => {
            let objs = realm.objects(table)
            let obj = objs.filter(filter)
            realm.delete(obj)
        })
    }

    static update(table,updateObj){
        realm.write(()=> {
            realm.create(table, updateObj, true)
        });
    }

    static insert(table,insertObj){
        realm.write(() => {
            realm.create(table,insertObj)
        })
    }

    static query(table,filter){
        
        let objs = realm.objects(table)
        let obj = objs.filter(filter)
        return obj;
    }
    
 }