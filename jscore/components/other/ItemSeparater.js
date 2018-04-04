/*
 * @Author: Jpeng 
 * @Date: 2018-03-26 22:06:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 15:55:09
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { SEPERATERCOLOR } from "../../constants/colors";
import { getWidth } from "../../utils/ScreenUtils";

export default class ItemSeparater extends Component {
  static defaultProps = {
    width: getWidth(),
    height: 0.5,
    direction: "flex-start",
    color: SEPERATERCOLOR
  };
  render() {
    return (
      <View
        style={{
          width: this.props.width,
          backgroundColor: this.props.color,
          alignSelf: this.props.direction,
          height: this.props.height
        }}
      />
    );
  }
}
