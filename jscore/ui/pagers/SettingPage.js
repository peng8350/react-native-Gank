/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:24 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 18:46:46
 * @Email: peng8350@gmail.com 
 */
//@flow
import React, { Component, PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  Switch,
  TextInput
} from "react-native";
import SettingList from "../../components/list/SettingList";
import { THEMECOLOR, BOTTTOMBGCOLOR } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import { getWidth } from "../../utils/ScreenUtils";
import * as Action from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from "react-native-popup-dialog";
import DbUtils from "../../utils/DbUtils";
import { isAndroid } from "../../utils/SystemUtils";

const slideAnimation = new SlideAnimation({
  slideFrom: "left"
});

class SettingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ""
    };
  }

  _renderDialog() {
    return (
      <PopupDialog
        show={this.props.editing}
        width={getWidth() * 0.75}
        height={isAndroid() ? 180 : 150}
        dialogStyle={{
          backgroundColor: "#000"
        }}
        dialogStyle={{
          backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#fff"
        }}
        dialogAnimation={slideAnimation}
        onDismissed={() => this.props.actions.editDir(false)}
        dialogTitle={
          <DialogTitle
            title="位置"
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
            style={{ alignSelf: "center" }}
            textStyle={[globalStyles.BigText, { color: THEMECOLOR }]}
            text="确定"
            onPress={() => {
              //修改完成后
              if (this.state.inputText !== "") {
                DbUtils.update("Setting", {
                  id: 1,
                  picPos: this.state.inputText
                });
                this.props.actions.setPicPosition(this.state.inputText);
              }
              this.props.actions.editDir(false);
              this.setState({ inputText: "" });
            }}
          />
        ]}
      >
        <TextInput
          ref={"input"}
          suppressHighlighting={true}
          placeholder={"输入保存图片位置"}
          autoFocus={true}
          style={{ padding: 15 }}
          defaultValue={this.props.picPos}
          onChangeText={text => {
            this.setState({ inputText: text });
          }}
        />
      </PopupDialog>
    );
  }

  _renderHeader() {
    return (
      <ImageBackground
        style={[styles.header, { height: 150 + this.props.headerHeight }]}
        source={require("../../resources/setbg.jpeg")}
      >
        <Image
          style={[styles.headerIcon]}
          resizeMode="contain"
          source={require("../../resources/gank.jpg")}
        />
      </ImageBackground>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {<SettingList navigation={this.props.navigation} />}
        {this._renderDialog()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: getWidth(),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //相对父元素进行绝对定位
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10
  }
});

const stateToprops = state => {
  return {
    headerHeight: state.SettingReducer.headerHeight,
    editing: state.SettingReducer.editing,
    picPos: state.SettingReducer.picPos
  };
};

const dispatchAction = dispatch => {
  return { actions: bindActionCreators(Action, dispatch) };
};

export default connect(stateToprops, dispatchAction)(SettingPage);
