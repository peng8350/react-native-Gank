/*
 * @Author: Jpeng 
 * @Date: 2018-04-12 17:19:47 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 18:56:20
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component, PureComponent } from "react";
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
import LikeGirlPage from "./pagers/LikeGirlPage";

class LikeActivity extends PureComponent {
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
        if (this.refs.girl) this.refs.girl.deleteData()
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
          ref={"like1"}
          key={1}
          {...this.state}
          isNight={this.props.isNight}
          tabLabel={"干货"}
          navigation={this.props.navigation}
          change={this.changeRightText}
        />

        <LikeGirlPage
          ref={"girl"}
          key={2}
          tabLabel={"妹子们"}
          isNight ={this.props.isNight}
          {...this.state}
          navigation={this.props.navigation}
          change={this.changeRightText}
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
