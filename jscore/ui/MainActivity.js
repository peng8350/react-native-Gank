/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:27 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-08 13:18:01
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
  Share,
  BackHandler,
  ToastAndroid
} from "react-native";
import SettingPage from "./pagers/SettingPage";
import TabNavigator from "react-native-tab-navigator";
import HomePage from "./pagers/HomePage";
import GirlPage from "./pagers/GirlPage";
import TabBar from "../components/view/TabBar";
import { connect } from "react-redux";
import {
  TAB1_TITLE,
  TAB2_TITLE,
  TAB3_TITLE,
} from "../constants/strings";
import { globalStyles } from "../constants/styles";
import Icon from "react-native-vector-icons/Ionicons";
import ActionSheet from "react-native-actionsheet";
import PopupDialog,{ DialogTitle,DialogButton,SlideAnimation } from "react-native-popup-dialog";
import PicImage from "../components/view/PicImage";
import { getWidth } from "../utils/ScreenUtils";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const slideAnimation = new SlideAnimation({
  slideFrom: 'left',
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

  _shareMessage() {
    Share.share(
      {
        message: "这是一个gankio的开源代码",
        url: "https://github.com/peng8350/react-native-Gank",
        title: "Gank"
      },
      {
        dialogTitle: "Share React Native website",
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
        tintColor: "green"
      }
    )
      .then(this._showResult)
      .catch(error => {
        alert(error);
      });
  }

  _showResult(result) {
    if (result.action === Share.sharedAction) {
      alert("已经分享");
    }
  }

  _renderActionSheet() {
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
                this._shareMessage();
                break;
              case 2:
              this.refs.dialog.show()
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
              this._shareMessage();
              break;
            case 2:
            this.refs.dialog.show()
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
      <PopupDialog ref='dialog'
      width={getWidth()*0.75}
      dialogAnimation={slideAnimation}
      dialogTitle={<DialogTitle title="作者" />}
      actions={[<DialogButton key='1' textStyle={[globalStyles.BigText,{color:'red'}]} text="取消" align="center" onPress={() => this.refs.dialog.dismiss()}/>]}
      >
        <View style={globalStyles.verCenLayout}>
          <PicImage style={{width:100,height:100,borderRadius: 50}} url={{uri:'https://avatars1.githubusercontent.com/u/19425362?s=400&u=1a30f9fdf71cc9a51e20729b2fa1410c710d0f2f&v=4'}} ></PicImage>
          <Text style={{marginTop:10}}>一名在校大学生,大三,ACM+考研中...{'\n'}邮箱:peng8350@gmail.com</Text>
        </View>
      </PopupDialog>
    )
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
    navTitle: state.TabReducer.navTitle
  };
};

export default connect(stateToprops)(MainActivity);
