/*
 * @Author: Jpeng 
 * @Date: 2018-04-01 20:23:52 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-16 23:40:43
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { globalStyles } from "../../constants/styles";

export default class LoadingBar extends Component {
  static defaultProps = {
    title: "数据加载中"
  };

  render() {
    return (
      <View style={globalStyles.verCenLayout}>
        <ActivityIndicator size={"large"} />
        <Text style={[globalStyles.normalText, { marginTop:8}]}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}
