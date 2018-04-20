/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 21:06:18 
 * @Last Modified by:   Jpeng 
 * @Last Modified time: 2018-04-02 21:06:18 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:55:33
*/
//@flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

var Icon = function(props) {
  switch (props.iconType) {
    case "Ionicons":
      return <Ionicons {...props} />;
    case "FontAwesome":
      return <FontAwesome {...props} />;
    default:
      return <MaterialIcons {...props} />;
  }
};

/**
 * 可圆角或者圆形的IconView
 */
export default class IconView extends Component {
  static defaultProps = {
    size: 35,
    radius: 35,
    bgColor: "#000",
    iconSize: 14,
    iconName: "md-home",
    iconColor: "#f00",
    iconType: "Ionicons"
  };

  render() {
    return (
      <View
        style={{
          width: this.props.size,
          height: this.props.size,
          borderRadius: this.props.radius,
          backgroundColor: this.props.bgColor,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Icon
          iconType={this.props.iconType}
          name={this.props.iconName}
          size={this.props.iconSize}
          color={this.props.iconColor}
        />
      </View>
    );
  }
}
