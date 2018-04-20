/*
 * @Author: Jpeng 
 * @Date: 2018-03-25 11:03:54 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-16 22:22:11
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/MainAction";
import TabNavigator from "react-native-tab-navigator";
import { TAB1_TITLE, TAB2_TITLE, TAB3_TITLE } from "../../constants/strings";
import HomePage from "../../ui/pagers/HomePage";
import SettingPage from "../../ui/pagers/SettingPage";
import GirlPage from "../../ui/pagers/GirlPage";
import Icon from "react-native-vector-icons/Ionicons";
import {
  THEMECOLOR,
  NIGHTTHEMECOLOR,
  NIGHTBGCOLOR,
  BOTTTOMBGCOLOR
} from "../../constants/colors";

//@flow
class TabBar extends Component {
  render() {
    return (
      <TabNavigator
        sceneStyle={{
          backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#f3f3f3"
        }}
        tabBarStyle={[
          styles.tabBar,
          { backgroundColor: this.props.isNight ? NIGHTBGCOLOR : "#f3f3f3" }
        ]}
      >
        {this._renderTabBarItem(
          0,
          TAB1_TITLE,
          this._renderTabIcon({
            name: "ios-home-outline",
            iconColor: "#979797"
          }),
          this._renderTabIcon({
            name: "ios-home",
            iconColor: this.props.isNight ? NIGHTTHEMECOLOR : THEMECOLOR
          }),
          <HomePage navigation={this.props.navigation} />
        )}
        {this._renderTabBarItem(
          1,
          TAB2_TITLE,
          this._renderTabIcon({
            name: "ios-compass-outline",
            iconColor: "#979797"
          }),
          this._renderTabIcon({
            name: "ios-compass",
            iconColor: this.props.isNight ? NIGHTTHEMECOLOR : THEMECOLOR
          }),
          <GirlPage />
        )}
        {this._renderTabBarItem(
          2,
          TAB3_TITLE,
          this._renderTabIcon({
            name: "ios-settings-outline",
            iconColor: "#979797"
          }),
          this._renderTabIcon({
            name: "ios-settings",
            iconColor: this.props.isNight ? NIGHTTHEMECOLOR : THEMECOLOR
          }),
          <SettingPage navigation={this.props.navigation} />
        )}
      </TabNavigator>
    );
  }

  _renderTabBarItem(index, title, normalIcon, selectedIcon, page) {
    return (
      <TabNavigator.Item
        selected={this.props.selectedTab === index}
        title={title}
        renderIcon={() => normalIcon}
        renderSelectedIcon={() => selectedIcon}
        onPress={() => {
          this.props.navigation.setParams({
            navTitle:
              index === 0 ? TAB1_TITLE : index === 1 ? TAB2_TITLE : TAB3_TITLE
          });
          this.props.actions.updateTab(index);
        }}
      >
        {page}
      </TabNavigator.Item>
    );
  }

  _renderTabIcon({ name, iconColor }) {
    return <Icon size={22} name={name} color={iconColor} />;
  }

  static defaultProps = {};
}

const styles = StyleSheet.create({
  tabBar: {
    alignItems: "center",
    height: 52
  },
  tabIcon: {
    width: 24,
    height: 24
  }
});

const mapStatetoProps = state => {
  return {
    selectedTab: state.MainReducer.selectedTab,
    isNight: state.SettingReducer.isNight
  };
};

const mapActiontoProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStatetoProps, mapActiontoProps)(TabBar);
