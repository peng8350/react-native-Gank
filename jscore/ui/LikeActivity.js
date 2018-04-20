/*
 * @Author: Jpeng 
 * @Date: 2018-04-12 17:19:47 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-19 23:09:46
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { FlatList, View, Text, Button } from "react-native";
import { TabNavigator } from "react-navigation";
import LikePage from "./pagers/LikePage";
import {
  THEMECOLOR,
  TEXTNORMALCOLOR,
  NIGHTTHEMECOLOR,
  BOTTTOMBGCOLOR,
  NIGHTBGCOLOR,
  NIGHTNORMALTEXTCOLOR
} from "../constants/colors";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { connect } from "react-redux";
import { isAndroid } from "../utils/SystemUtils";

class LikeActivity extends Component {
  constructor() {
    super();
    this.state = {
      rightBtnText: "删除"
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "收藏",
    headerRight: isAndroid() ? (
      <Button
        color="transparent"
        title={
          navigation.state.params ? navigation.state.params.rightText : "删除"
        }
        onPress={
          navigation.state.params
            ? navigation.state.params.pressRight
            : () => {}
        }
      />
    ) : (
      <Button
        color="#fff"
        title={
          navigation.state.params ? navigation.state.params.rightText : "删除"
        }
        onPress={
          navigation.state.params
            ? navigation.state.params.pressRight
            : () => {}
        }
      />
    )
  });

  changeRightText = state => {
    switch (state) {
      case 0:
        this.setState({
          rightBtnText: "删除"
        });
        this.props.navigation.setParams({
          rightText: "删除"
        });
        if (this.refs.like1) this.refs.like1.deleteData();
        if (this.refs.like2) this.refs.like2.deleteData();
        if (this.refs.like3) this.refs.like3.deleteData();
        if (this.refs.like4) this.refs.like4.deleteData();
        if (this.refs.like5) this.refs.like5.deleteData();
        if (this.refs.like6) this.refs.like6.deleteData();
        break;
      case 1:
        this.setState({
          rightBtnText: "取消"
        });
        this.props.navigation.setParams({
          rightText: "取消"
        });
        break;
      case 2:
        this.setState({
          rightBtnText: "确定"
        });
        this.props.navigation.setParams({
          rightText: "确定"
        });

        break;
      default:
        break;
    }
  };

  _onPressRight = () => {
    if (this.state.rightBtnText === "删除") {
      this.changeRightText(1);
    } else {
      if (this.state.rightBtnText === "确定") {
      } else {
      }

      this.changeRightText(0);
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      rightText: this.state.rightBtnText,
      pressRight: this._onPressRight
    });
  }

  render() {
    return (
      <ScrollableTabView
        style={{
          backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#f3f3f3"
        }}
        tabBarBackgroundColor={this.props.isNight ? NIGHTBGCOLOR : "white"}
        tabBarUnderlineStyle={{
          backgroundColor: this.props.isNight ? NIGHTTHEMECOLOR : THEMECOLOR
        }}
        tabBarInactiveTextColor={
          this.props.isNight ? NIGHTNORMALTEXTCOLOR : TEXTNORMALCOLOR
        }
        initialPage={0}
        tabBarActiveTextColor={
          this.props.isNight ? NIGHTTHEMECOLOR : THEMECOLOR
        }
        renderTabBar={() => <ScrollableTabBar />}
      >
        <LikePage
          ref="like1"
          key={1}
          {...this.state}
          tabLabel="前端"
          navigation={this.props.navigation}
          change={this.changeRightText}
          type="前端"
        />
        <LikePage
          ref="like2"
          key={2}
          tabLabel="Android"
          navigation={this.props.navigation}
          {...this.state}
          change={this.changeRightText}
          type="Android"
        />
        <LikePage
          ref="like3"
          key={3}
          tabLabel="IOS"
          {...this.state}
          change={this.changeRightText}
          type="iOS"
        />
        <LikePage
          ref="like4"
          key={4}
          tabLabel="App"
          navigation={this.props.navigation}
          {...this.state}
          change={this.changeRightText}
          type="App"
        />
        <LikePage
          ref="like5"
          key={5}
          tabLabel="瞎推荐"
          navigation={this.props.navigation}
          {...this.state}
          change={this.changeRightText}
          type="瞎推荐"
        />
        <LikePage
          ref="like6"
          key={6}
          tabLabel="拓展资源"
          navigation={this.props.navigation}
          {...this.state}
          change={this.changeRightText}
          type="拓展资源"
        />
      </ScrollableTabView>
    );
  }
}

const stateToProps = state => {
  return {
    isNight: state.SettingReducer.isNight
  };
};

export default connect(stateToProps)(LikeActivity);
