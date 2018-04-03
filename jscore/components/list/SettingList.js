/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 19:58:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 15:47:50
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action from "../../reducers/SettingReducer";
import { SectionList, View } from "react-native";
import SettingItem from "../Item/SettingItem";
import EmptyView from "../other/EmptyView";
import Icon from 'react-native-vector-icons/Ionicons'

class SettingList extends Component {
  static defaultProps = {
    dataSource: [
      {
        data: [
          { bgColor: "#f00", iconName: "md-home", title: "夜间模式",renderRight: <Icon name='ios-arrow-forward' size={24} color={'#000'} /> },
          { bgColor: "#ff0", iconName: "md-home", title: "夜间模式" },
          { bgColor: "#ff0", iconName: "md-home", title: "夜间模式" }
        ]
      }
    ]
  };

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <SectionList
        sections={this.props.dataSource}
        renderSectionHeader={({ section }) => <EmptyView />}
        renderItem={({ item }) => (
          <SettingItem
            title={item.title}
            bgColor={item.bgColor}
            iconName={item.iconName}
            renderRight={item.renderRight}
          />
        )}
      />
    );
  }
}

export const stateToprops = state => {
  return {};
};

export const dispatchToActions = dispatch => {
  return {
    actions: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, dispatchToActions)(SettingList);
