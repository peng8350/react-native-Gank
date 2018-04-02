/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 19:58:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-02 20:28:16
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

class SettingList extends Component {
  render() {
    return <SectionList 
    sections={[
        {data:[1,2,3]},
        {data:[1,2,3]},
        {data:[1,2,3]}
    ]}
    renderSectionHeader ={ ({section}) => <EmptyView /> }
    renderItem={({item}) => <SettingItem />} />;
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
