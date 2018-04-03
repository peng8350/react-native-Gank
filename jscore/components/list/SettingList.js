/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 19:58:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 00:13:48
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
import DbUtils from "../../utils/DbUtils";

class SettingList extends Component {
  _renderRightSwitch = (state1, onValueChange1) => {
    return (
      <Switch
        onValueChange={onValueChange1}
        value={state1}
        thumbTintColor={"whitesmoke"}
        onTintColor={THEMECOLOR}
      />
    );
  };

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
    let dataSource = [
      {
        data: [
          {
            key: "1",
            bgColor: "darkgray",
            iconName: "ios-bulb",
            title: "夜间模式",
            renderRight: this._renderRightSwitch(this.props.isNight, value => {
              this.props.actions.setNight(value);
              DbUtils.update("Setting", { id: 1, isNight: value });
            })
          },
          {
            key: "2",
            bgColor: "coral",
            iconName: "ios-jet",
            title: "间隔刷新数据",
            renderRight: this._renderRightSwitch(
              this.props.autoRefresh,
              value => {
                this.props.actions.setAutoRefresh(value);
                DbUtils.update("Setting", { id: 1, autoRefresh: value });
              }
            )
          },
          {
            key: "3",
            bgColor: "cornflowerblue",
            iconName: "ios-albums",
            title: "下载图片位置",
            extra: this.props.picPos,
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

    return (
      <SectionList
        style={{ marginTop: 150 }}
        sections={dataSource}
        showsVerticalScrollIndicator ={false}
        onScroll={event => {
          let y = -event.nativeEvent.contentOffset.y;
          if (y > 0)
            this.props.actions.changeHeight(-event.nativeEvent.contentOffset.y);
        }}
        SectionSeparatorComponent={() => (
          <ItemSeparater height={1} color={"snow"} />
        )}
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

  componentDidMount() {
    let settingInfo = DbUtils.queryFirst("Setting", "id==1");
    let { actions } = this.props;
    actions.setNight(settingInfo.isNight);
    actions.setAutoRefresh(settingInfo.autoRefresh);
    actions.setPicPosition(settingInfo.picPos);
  }
}

export const stateToprops = state => {
  return {
    isNight: state.SettingReducer.isNight,
    picPos: state.SettingReducer.picPos,
    autoRefresh: state.SettingReducer.autoRefresh
  };
};

export const dispatchToActions = dispatch => {
  return {
    actions: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, dispatchToActions)(SettingList);
