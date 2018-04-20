/*
 * @Author: Jpeng 
 * @Date: 2018-04-01 20:17:05 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:54:32
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { WebView } from "react-native";
import LoadingBar from "../components/view/LoadingBar";

export default class WebActivity extends Component {
  static navigationOptions = {
    headerTitle: "更多"
  };

  render() {
    return (
      <WebView
        style={{
          backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#f3f3f3"
        }}
        source={{ uri: this.props.navigation.state.params.url }}
        renderLoading={() => <LoadingBar />}
        startInLoadingState={true}
      />
    );
  }
}
