/*
 * @Author: Jpeng 
 * @Date: 2018-03-25 11:03:54 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 16:30:21
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/TabAction";
import TabNavigator from "react-native-tab-navigator";
import {
  TAB1_TITLE,
  TAB2_TITLE,
  TAB3_TITLE,
  TAB4_TITLE
} from "../../constants/strings";
import HomePage from "../../ui/pagers/HomePage";
import ReadPage from "../../ui/pagers/ReadPage";
import SettingPage from "../../ui/pagers/SettingPage";
import GirlPage from "../../ui/pagers/GirlPage";
import Icon from 'react-native-vector-icons/Ionicons'
import { THEMECOLOR } from "../../constants/colors";

//@flow
class TabBar extends Component {
  render() {
    return (
      <TabNavigator sceneStyle={styles.screen}  tabBarStyle={styles.tabBar}>
        {this._renderTabBarItem(
          0,
          TAB1_TITLE,
          this._renderTabIcon({name:'ios-home-outline',iconColor:'#979797'}),
          this._renderTabIcon({name:'ios-home',iconColor:THEMECOLOR}),
          <HomePage navigation={this.props.navigation} />
        )}
        {this._renderTabBarItem(
          1,
          TAB2_TITLE,
          this._renderTabIcon({name:'ios-cafe-outline',iconColor:'#979797'}),
          this._renderTabIcon({name:'ios-cafe',iconColor:THEMECOLOR}),
          <ReadPage />
        )}
        {this._renderTabBarItem(
          2,
          TAB3_TITLE,
          this._renderTabIcon({name:'ios-compass-outline',iconColor:'#979797'}),
          this._renderTabIcon({name:'ios-compass',iconColor:THEMECOLOR}),
          <GirlPage />
        )}
        {this._renderTabBarItem(
          3,
          TAB4_TITLE,
          this._renderTabIcon({name:'ios-settings-outline',iconColor:'#979797'}),
          this._renderTabIcon({name:'ios-settings',iconColor:THEMECOLOR}),
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
                : index === 1 ? TAB2_TITLE : index === 2 ? TAB3_TITLE : TAB4_TITLE
          });
          this.props.actions.updateTab(index);
        }}
      >
        {page}
      </TabNavigator.Item>
    );
  }

  _renderTabIcon({name,iconColor}) {
    return <Icon size={22} name={name} color={iconColor} />;
  }

  static defaultProps = {};
}

const styles = StyleSheet.create({
  screen:{
    backgroundColor: '#f3f3f3',
  },
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
    selectedTab: state.TabReducer.selectedTab
  };
};

const mapActiontoProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(mapStatetoProps, mapActiontoProps)(TabBar);
