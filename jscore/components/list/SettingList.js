/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 19:58:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 17:30:38
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action from "../../actions/settingAction";
import { SectionList, View, Switch, StyleSheet } from "react-native";
import SettingItem from "../Item/SettingItem";
import EmptyView from "../other/EmptyView";
import Icon from "react-native-vector-icons/Ionicons";
import { TEXTSELECTEDCOLOR, TEXTSMALLCOLOR, THEMECOLOR } from "../../constants/colors";

class SettingList extends Component {
 
  constructor(props){
    super(props)
    console.disableYellowBox = true;
    this.dataSource = [
      {
        data: [
          {
            bgColor: "#f00",
            iconName: "md-home",
            title: "夜间模式",
            renderRight: this._renderRightSwitch(true)
          },
          { bgColor: "#ff0", iconName: "md-home", title: "下载图片位置" ,renderRight: this._renderRightSwitch(true)},
          { bgColor: "#ff0", iconName: "md-home", title: "收藏" }
        ]
      },
      {
        data: [
          {
            bgColor: "#f00",
            iconName: "md-home",
            title: "分享",
            renderRight: this._renderRightArrow()
          },
          { bgColor: "#ff0", iconName: "md-home", title: "关于我" }
        ]
      }
    ];
  }


  _renderRightSwitch(state){
    return <Switch  onValueChange={() => {}} value={state} thumbTintColor={'#f00'} onTintColor={'#00f'}/>
  }

  _renderRightArrow() {
    return <Icon name={'ios-arrow-forward-outline'} size={24} color={TEXTSMALLCOLOR} />;
  }


  render() {
    return (
      <SectionList
        sections={this.dataSource}
        onScroll= {(event) => this.props.actions.changeHeight(-event.nativeEvent.contentOffset.y)}
        renderSectionHeader={({ section }) => <EmptyView />}
        renderItem={({ item }) => (
          <SettingItem
            extra= {item.extra}
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
  return {
    
  };
};

export const dispatchToActions = dispatch => {
  return {
    actions: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, dispatchToActions)(SettingList)
