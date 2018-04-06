/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:27 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-06 19:03:11
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import {
  TouchableOpacity,
  Button,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  BackHandler
} from "react-native";
import SettingPage from "./pagers/SettingPage";
import TabNavigator from "react-native-tab-navigator";
import HomePage from "./pagers/HomePage";
import GirlPage from "./pagers/GirlPage";
import TabBar from "../components/view/TabBar";
import { connect } from "react-redux";
import {
  TAB1_TITLE,
  TAB2_TITLE,
  TAB3_TITLE,
  TAB4_TITLE
} from "../constants/strings";
import { globalStyles } from "../constants/styles";
import Icon from "react-native-vector-icons/Ionicons";
import ActionSheet from "react-native-actionsheet";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

class MainActivity extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params
      ? navigation.state.params.navTitle
      : "",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.pressRight()}>
        <Icon
          suppressHighlighting={true}
          style={{ marginRight: 12 }}
          color="#fff"
          size={28}
          name="ios-menu"
        />
      </TouchableOpacity>
    )
  });

  _renderActionSheet() {
    let actionArr =
      Platform.OS === "ios"
        ? ["分享", "反馈", "关于作者", "关闭"]
        : ["分享", "反馈", "关于作者", "退出程序", "关闭"];
    if (Platform.OS === "ios") {
      return (
        <ActionSheet
          ref={"actionSheet"}
          title={"你想要做什么?"}
          options={actionArr}
          cancelButtonIndex={3}
          onPress={index => {
            switch (actionArr[index]) {
            }
          }}
        />
      );
    }
    return (
      <ActionSheet
        ref={"actionSheet"}
        title={"你想要做什么?"}
        options={actionArr}
        destructiveButtonIndex={3}
        cancelButtonIndex={4}
        onPress={index => {
          switch (actionArr[index]) {
            case "退出程序":
              if (Platform.OS === "Android") {
                this._pressExit();
              }
            break;
          }
        }}
      />
    );
  }

  render() {
    return (
      <View style={globalStyles.verticalLayout}>
      {this._renderActionSheet()}
        <TabBar navigation={this.props.navigation} />
      </View>
    );
  }

  _pressExit(int) {
    BackHandler.exitApp();
  }

  _pressRight = () => {
    this.refs.actionSheet.show();
  };

  componentDidMount() {
    this.props.navigation.setParams({
      navTitle: TAB1_TITLE,
      pressRight: this._pressRight
    });
  }
}

const stateToprops = state => {
  return {
    navTitle: state.TabReducer.navTitle
  };
};

export default connect(stateToprops)(MainActivity);
