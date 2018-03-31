/*
 * @Author: Jpeng 
 * @Date: 2018-03-31 11:34:20 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 12:49:25
 * @Email: peng8350@gmail.com 
 */

//flow
import React, { Component } from "react";
import Moment from 'moment';

export default class DateUtils extends Component {
  
  static parseString(string,formatter){
    if(string){
       Moment.locale('en')
        
        return Moment(string).format(formatter)
    }
  }

}
