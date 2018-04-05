/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-05 15:50:57
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../constants/styles";
import GankList from "../components/list/GankList";
import { FETCHGANK_URL } from "../constants/strings";
import Icon from "react-native-vector-icons/Ionicons";

export default class GankActivity extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.GankType,
    headerRight: (
      <TouchableOpacity onPress={() => {}}>
        <Icon
          suppressHighlighting={true}
          style={{ marginRight: 12 }}
          color="#fff"
          size={28}
          name="ios-search"
        />{" "}
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <GankList
        gankType={this.props.navigation.state.params.GankType}
        navigation={this.props.navigation}
      />
    );
  }
}
