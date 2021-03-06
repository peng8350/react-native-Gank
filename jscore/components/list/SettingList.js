/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 19:58:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 19:07:50
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action from "../../actions";
import { SectionList, View, Switch, StyleSheet } from "react-native";
import SettingItem from "../Item/SettingItem";
import EmptyView from "../other/EmptyView";
import Icon from "react-native-vector-icons/Ionicons";
import {
  TEXTSMALLCOLOR,
  THEMECOLOR,
  NIGHTTHEMECOLOR,
  NIGHTSEPERATERCOLOR
} from "../../constants/colors";
import ItemSeparater from "../other/ItemSeparater";
import DbUtils from "../../utils/DbUtils";
import ShareUtils from "../../utils/ShareUtils";

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

  _onItemPress = pos => {
    switch (pos) {
      case 2:
        this.props.actions.editDir(true);
        break;
      case 3:
        this.props.navigation.navigate("Like");
        break;

      case 4:
        ShareUtils.shareMessage();
        break;
      case 5:
        this.props.actions.toggleAboutDlg(true);
        break;

      default:
        break;
    }
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
            pos: 0,
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
            pos: 1,
            key: "2",
            bgColor: "coral",
            iconName: "ios-jet",
            title: "进入刷新数据",
            renderRight: this._renderRightSwitch(
              this.props.autoRefresh,
              value => {
                this.props.actions.setAutoRefresh(value);
                DbUtils.update("Setting", { id: 1, autoRefresh: value });
              }
            )
          },
          {
            pos: 2,
            key: "3",
            bgColor: "cornflowerblue",
            iconName: "ios-albums",
            title: "下载图片位置",
            extra: this.props.picPos,
            renderRight: this._renderRightArrow()
          },

          {
            pos: 3,
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
            pos: 4,
            key: "5",
            bgColor: "greenyellow",
            iconName: "ios-share",
            title: "分享"
          },
          {
            pos: 5,
            key: "6",
            bgColor: "mediumpurple",
            iconName: "ios-body",
            title: "关于我"
          }
        ]
      }
    ];

    return (
      <SectionList
        style={{ marginTop: 150 }}
        sections={dataSource}
        showsVerticalScrollIndicator={false}
        onScroll={event => {
          let y = -event.nativeEvent.contentOffset.y;
          if (y > 0)
            this.props.actions.changeHeight(-event.nativeEvent.contentOffset.y);
        }}
        SectionSeparatorComponent={() => (
          <ItemSeparater
            height={1}
            color={this.props.isNight ? NIGHTSEPERATERCOLOR : "snow"}
          />
        )}
        ItemSeparatorComponent={() => <ItemSeparater />}
        renderSectionHeader={({ section }) => <EmptyView />}
        renderItem={({ item }) => (
          <SettingItem {...item} onItemPress={this._onItemPress} />
        )}
      />
    );
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
