/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 16:50:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 17:06:12
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../../constants/styles";
import { TEXTSMALLCOLOR } from "../../constants/colors";

export default class IconText extends Component {
  static defaultProps = {
    color: TEXTSMALLCOLOR,
    size: 16,
    text: "文字",
    textStyle: [globalStyles.smallText, { textAlign: "right", marginLeft: 2 }]
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10
        }}
      >
        <Icon
          name={this.props.name}
          color={this.props.color}
          size={this.props.size}
        />
        <Text style={this.props.textStyle}>{" " + this.props.text}</Text>
      </View>
    );
  }
}
