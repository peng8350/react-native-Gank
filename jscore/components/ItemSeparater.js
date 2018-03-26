/*
 * @Author: Jpeng 
 * @Date: 2018-03-26 22:06:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-26 22:16:19
 * @Email: peng8350@gmail.com 
 */

//@flow

import React,{ Component } from "react";
import { StyleSheet, View } from "react-native";
import { SEPERATERCOLOR } from "../constants/colors";

export default class ItemSeparater extends Component {
  render() {
    return <View style={styles.line} />;
  }
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: SEPERATERCOLOR,
    flex: 1,
    height:1
  }
});
