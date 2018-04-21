/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:27 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 18:56:31
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import {
  TouchableOpacity,
  Button,
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  BackHandler,
  ToastAndroid
} from "react-native";
import TabBar from "../components/view/TabBar";
import { connect } from "react-redux";
import { TAB1_TITLE, TAB2_TITLE, TAB3_TITLE } from "../constants/strings";
import { globalStyles } from "../constants/styles";
import Icon from "react-native-vector-icons/Ionicons";
import ActionSheet from "react-native-actionsheet";
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from "react-native-popup-dialog";
import PicImage from "../components/view/PicImage";
import { getWidth } from "../utils/ScreenUtils";
import DbUtils from "../utils/DbUtils";
import * as Action from "../actions";
import { bindActionCreators } from "redux";
import {
  NIGHTTHEMECOLOR,
  THEMECOLOR,
  BOTTTOMBGCOLOR
} from "../constants/colors";
import ShareUtils from "../utils/ShareUtils";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const slideAnimation = new SlideAnimation({
  slideFrom: "left"
});

class MainActivity extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params
      ? navigation.state.params.navTitle
      : "",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.pressRight()}>
        <Icon
          suppressHighlighting={true}
          style={{ marginRight: 12 }}
          color="#fff"
          size={28}
          name="ios-menu"
        />
      </TouchableOpacity>
    )
  });

  constructor() {
    super();
  }

  componentWillMount() {
    let settingInfo = DbUtils.queryFirst("Setting", "id==1");
    let { actions } = this.props;
    actions.setNight(settingInfo.isNight);
    actions.setAutoRefresh(settingInfo.autoRefresh);
    actions.setPicPosition(settingInfo.picPos);
  }

  _renderActionSheet = () => {
    let actionArr =
      Platform.OS === "ios"
        ? ["分享", "反馈", "关于作者", "关闭"]
        : ["分享", "反馈", "关于作者", "退出程序", "关闭"];
    if (Platform.OS === "ios") {
      return (
        <ActionSheet
          ref={"actionSheet"}
          title={"你想要做什么?"}
          options={actionArr}
          cancelButtonIndex={3}
          onPress={index => {
            switch (index) {
              case 0:
                ShareUtils.shareMessage();
                break;
              case 2:
                this.props.actions.toggleAboutDlg(true);
                break;
            }
          }}
        />
      );
    }
    return (
      <ActionSheet
        ref={"actionSheet"}
        title={"你想要做什么?"}
        options={actionArr}
        destructiveButtonIndex={3}
        cancelButtonIndex={4}
        onPress={index => {
          switch (index) {
            case 0:
              ShareUtils.shareMessage();
              break;
            case 2:
            this.props.actions.toggleAboutDlg(true);
              break;
            case 3:
              this._pressExit();
              break;
          }
        }}
      />
    );
  }

  _renderDialog() {
    return (
      <PopupDialog
        show={this.props.isShowDlg}
        width={getWidth() * 0.75}
        dialogStyle={{
          backgroundColor: "#000"
        }}
        dialogStyle={{
          backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#fff"
        }}
        dialogAnimation={slideAnimation}
        onDismissed={() => this.props.actions.toggleAboutDlg(false)}
        dialogTitle={
          <DialogTitle
            title="作者"
            titleStyle={{
              backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#fff",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0
            }}
          />
        }
        actions={[
          <DialogButton
            key="1"
            textStyle={[globalStyles.BigText, { color: "red" }]}
            text="取消"
            align="center"
            onPress={() => {
              this.props.actions.toggleAboutDlg(false);
            }}
          />
        ]}
      >
        <View style={globalStyles.verCenLayout}>
          <PicImage
            style={{ width: 100, height: 100, borderRadius: 50 }}
            url={{
              uri:
                "https://avatars1.githubusercontent.com/u/19425362?s=400&u=1a30f9fdf71cc9a51e20729b2fa1410c710d0f2f&v=4"
            }}
          />
          <Text style={{ marginTop: 10 }}>
            一名在校大学生,大三,ACM+考研中...{"\n"}邮箱:peng8350@gmail.com
          </Text>
        </View>
      </PopupDialog>
    );
  }

  render() {
    return (
      <View style={globalStyles.verticalLayout}>
        {this._renderActionSheet()}
        <TabBar navigation={this.props.navigation} />
        {this._renderDialog()}
      </View>
    );
  }

  _pressExit(int) {
    BackHandler.exitApp();
  }

  _pressRight = () => {
    this.refs.actionSheet.show();
  };

  componentDidMount() {
    this.props.navigation.setParams({
      navTitle: TAB1_TITLE,
      pressRight: this._pressRight
    });
  }
}

const stateToprops = state => {
  return {
    isNight: state.SettingReducer.isNight,
    isShowDlg: state.MainReducer.isShowAbout
  };
};

const actionDispatch = dispatch => {
  return {
    actions: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, actionDispatch)(MainActivity);
