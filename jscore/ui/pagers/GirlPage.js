/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-28 22:58:53
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Actions from "../../actions/fetchGirlAction";
import GirlList from "../../components/GirlList";
import ZoomPicView from "../../components/ZoomPicView";

export default class GirlPage extends Component {
  render() {
    return (
      <View>
        <GirlList />
        <ZoomPicView />
      </View>
    );
  }
}
