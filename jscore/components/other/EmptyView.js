/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 20:26:46 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-02 20:28:39
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { View } from "react-native";

export default class EmptyView extends Component {
  static defaultProps = {
    height: 20
  };
  render() {
    return <View style={{ flex: 1, height: this.props.height }} />;
  }
}
