/*
 * @Author: Jpeng 
 * @Date: 2018-04-12 17:19:47 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-15 22:21:32
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { TabNavigator } from "react-navigation";
import LikePage from "./pagers/LikePage";
import { THEMECOLOR, TEXTNORMALCOLOR, NIGHTTHEMECOLOR, BOTTTOMBGCOLOR, NIGHTBGCOLOR, NIGHTNORMALTEXTCOLOR } from "../constants/colors";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";

class LikeActivity extends Component {
  constructor() {
    super();
    this.state = {
      selectTab: 0
    };
  }

  static navigationOptions = {
    headerTitle: "收藏"
  };

  render() {
    return (
      <ScrollableTabView
        style={{backgroundColor: this.props.isNight?BOTTTOMBGCOLOR:'#f3f3f3'}}
        tabBarBackgroundColor={this.props.isNight?NIGHTBGCOLOR:"white"}
        tabBarUnderlineStyle={{ backgroundColor: this.props.isNight?NIGHTTHEMECOLOR:THEMECOLOR }}
        tabBarInactiveTextColor={this.props.isNight?NIGHTNORMALTEXTCOLOR:TEXTNORMALCOLOR}
        initialPage={0}
        tabBarActiveTextColor={this.props.isNight?NIGHTTHEMECOLOR:THEMECOLOR}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <LikePage tabLabel="前端" type="前端" />
        <LikePage tabLabel="Android" type="Android" />
        <LikePage tabLabel="IOS" type="iOS" />
        <LikePage tabLabel="App" type="App" />
        <LikePage tabLabel="瞎推荐" type="瞎推荐" />
        <LikePage tabLabel="拓展资源" type="拓展资源" />
      </ScrollableTabView>
    );
  }
}


const stateToProps = state => {
  return {
    isNight: state.SettingReducer.isNight
  }
}

export default connect(stateToProps)(LikeActivity)