/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:27 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 10:49:40
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,

} from "react-native";
import SettingPage from "./pagers/SettingPage";
import TabNavigator from "react-native-tab-navigator";
import HomePage from "./pagers/HomePage";
import ReadPage from "./pagers/ReadPage";
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

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

class MainActivity extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params?navigation.state.params.navTitle:'',
    })
    
  render() {
    return (
        <TabBar navigation={this.props.navigation} />
    )
  }

  componentDidMount(){
      this.props.navigation.setParams({navTitle: TAB1_TITLE})
  }
}


const stateToprops = state => {
  return {
    navTitle: state.TabReducer.navTitle
  };
};

export default connect(stateToprops)(MainActivity);

