/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 19:58:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 18:45:57
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
import {
  TEXTSELECTEDCOLOR,
  TEXTSMALLCOLOR,
  THEMECOLOR
} from "../../constants/colors";
import ItemSeparater from "../other/ItemSeparater";

class SettingList extends Component {
  constructor(props) {
    super(props);
    this.dataSource = [
      {
        data: [
          {
            key: "1",
            bgColor: "darkgray",
            iconName: "ios-bulb",
            title: "夜间模式",
            renderRight: this._renderRightSwitch(true)
          },
          {
            key: "2",
            bgColor: "coral",
            iconName: "ios-jet",
            title: "间隔刷新数据",
            renderRight: this._renderRightSwitch(true)
          },
          {
            key: "3",
            bgColor: "cornflowerblue",
            iconName: "ios-albums",
            title: "下载图片位置",
            extra: "users/wwwww",
            renderRight: this._renderRightArrow()
          },

          {
            key: "4",
            bgColor: "darkseagreen",
            iconName: "md-star",
            title: "收藏",
            renderRight: this._renderRightArrow()
          }
        ]
      },
      {
        data: [
          {
            key: "5",
            bgColor: "greenyellow",
            iconName: "ios-share",
            title: "分享"
          },
          {
            key: "6",
            bgColor: "mediumpurple",
            iconName: "ios-body",
            title: "关于我"
          },
          {
            key: "7",
            bgColor: "tomato",
            iconName: "ios-exit",
            title: "退出程序"
          }
        ]
      }
    ];
  }

  _renderRightSwitch(state) {
    return (
      <Switch
        onValueChange={() => {}}
        value={state}
        thumbTintColor={"whitesmoke"}
        onTintColor={THEMECOLOR}
      />
    );
  }

  _renderRightArrow() {
    return (
      <Icon
        name={"ios-arrow-forward-outline"}
        size={24}
        color={TEXTSMALLCOLOR}
      />
    );
  }

  render() {
    return (
      <SectionList
        style={{ marginTop: 120 }}
        sections={this.dataSource}
        onScroll={event => {
          let y = -event.nativeEvent.contentOffset.y;
          if (y > 0)
            this.props.actions.changeHeight(-event.nativeEvent.contentOffset.y);
        }}
        SectionSeparatorComponent= {() => <ItemSeparater height={1} color ={'snow'} />}
        ItemSeparatorComponent={() => <ItemSeparater />}
        renderSectionHeader={({ section }) => <EmptyView />}
        renderItem={({ item }) => (
          <SettingItem
            extra={item.extra}
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
