/*
 * @Author: Jpeng 
 * @Date: 2018-03-25 11:03:54 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-25 22:32:37
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/TabAction";
import TabNavigator from "react-native-tab-navigator";
import {
  TAB1_TITLE,
  TAB2_TITLE,
  TAB3_TITLE,
  TAB4_TITLE
} from "../constants/strings";
import HomePage from "../ui/pagers/HomePage";
import ReadPage from "../ui/pagers/ReadPage";
import SettingPage from "../ui/pagers/SettingPage";
import GirlPage from "../ui/pagers/GirlPage";

class TabBar extends Component {
  render() {
    return (
      <TabNavigator>
        {this._renderTabBarItem(
          0,
          TAB1_TITLE,
          this._renderTabIcon(require("../resources/tab1_normal.png")),
          this._renderTabIcon(require("../resources/tab1_selected.png")),
          <HomePage />
        )}
        {this._renderTabBarItem(
          1,
          TAB2_TITLE,
          this._renderTabIcon(require("../resources/tab2_normal.png")),
          this._renderTabIcon(require("../resources/tab2_selected.png")),
          <ReadPage />
        )}
        {this._renderTabBarItem(
          2,
          TAB3_TITLE,
          this._renderTabIcon(require("../resources/tab3_normal.png")),
          this._renderTabIcon(require("../resources/tab3_selected.png")),
          <GirlPage />
        )}
        {this._renderTabBarItem(
          3,
          TAB4_TITLE,
          this._renderTabIcon(require("../resources/tab4_normal.png")),
          this._renderTabIcon(require("../resources/tab4_selected.png")),
          <SettingPage />
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
              index === 0
                ? TAB1_TITLE
                : index === 1
                  ? TAB2_TITLE
                  : index === 2 ? TAB3_TITLE : TAB4_TITLE
          });
          this.props.actions.updateTab(index);
        }}
      >
        {page}
      </TabNavigator.Item>
    );
  }

  _renderTabIcon(path) {
    return <Image source={path} style={styles.tabIcon} />;
  }

  static defaultProps = {};
}

const styles = StyleSheet.create({
  tabBar: {
    height: 45
  },
  tabIcon: {
    width: 24,
    height: 24
  }
});

const mapStatetoProps = state => {
  return {
    selectedTab: state.TabReducer.selectedTab
  };
};

const mapActiontoProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStatetoProps, mapActiontoProps)(TabBar);
