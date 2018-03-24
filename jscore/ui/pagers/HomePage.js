/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:04 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-24 22:55:56
 * @Email: peng8350@gmail.com 
 */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>首页界面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F5FCFF"
  }
});
