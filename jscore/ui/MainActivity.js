/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:27 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-26 21:51:47
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
import TabBar from "../components/TabBar";
import { connect } from "react-redux";
import {
  TAB1_TITLE,
  TAB2_TITLE,
  TAB3_TITLE,
  TAB4_TITLE
} from "../constants/strings";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

class MainActivity extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params?navigation.state.params.navTitle:'',
        headerStyle: styles.navStyle,
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: "bold"
        }
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

const styles = StyleSheet.create({
  navStyle:{
    backgroundColor:'#2fa3e4',
  }
});
