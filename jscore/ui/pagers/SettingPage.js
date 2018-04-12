/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:24 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-12 17:30:22
 * @Email: peng8350@gmail.com 
 */
//@flow
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
  Switch
} from "react-native";
import SettingList from "../../components/list/SettingList";
import { THEMECOLOR } from "../../constants/colors";
import { globalStyles } from "../../constants/styles";
import { getWidth } from "../../utils/ScreenUtils";
import { connect } from "react-redux";

class SettingPage extends Component {
  constructor(props) {
    super(props);
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
        <Text style={globalStyles.BigText}>干货集中营</Text>
        <Text style={globalStyles.normalText}>版本号</Text>
      </ImageBackground>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        {<SettingList navigation = {this.props.navigation} />}
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

export const stateToprops = state => {
  return {
    headerHeight: state.SettingReducer.headerHeight
  };
};

export default connect(stateToprops)(SettingPage);
