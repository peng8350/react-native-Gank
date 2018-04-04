/*
 * @Author: Jpeng 
 * @Date: 2018-04-01 20:23:52 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 16:26:52
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { globalStyles } from "../../constants/styles";
import { TEXTSELECTEDCOLOR } from "../../constants/colors";

export default class LoadingBar extends Component {
  static defaultProps = {
    title: "数据加载中"
  };

  render() {
    return (
      <View style={globalStyles.verCenLayout}>
        <ActivityIndicator size={"large"} />
        <Text style={[globalStyles.normalText, { color: TEXTSELECTEDCOLOR }]}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}
