/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-08 13:42:39
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Actions from "../../actions/fetchGirlAction";
import GirlList from "../../components/list/GirlList";

export default class GirlPage extends Component {
  render() {
    return (
      <View>
        {<GirlList />}
      </View>
    );
  }
}
