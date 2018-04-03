/*
 * @Author: Jpeng 
 * @Date: 2018-03-26 22:06:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 18:40:52
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { SEPERATERCOLOR } from "../../constants/colors";

export default class ItemSeparater extends Component {
  static defaultProps ={
    height:0.5,
    color:SEPERATERCOLOR
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.color,
          flex: 1,
          height: this.props.height
        }}
      />
    );
  }
}
