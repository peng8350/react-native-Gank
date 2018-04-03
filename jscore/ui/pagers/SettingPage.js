/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:24 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 17:56:37
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
  Modal
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
          style={[styles.header, { height: 120+this.props.headerHeight*2}]}
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
        <SettingList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: "flex-start"
  },
  header: {
    width: getWidth(),
    justifyContent: "center",
    alignItems: "center"
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
