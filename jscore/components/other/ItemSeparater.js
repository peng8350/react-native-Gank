/*
 * @Author: Jpeng 
 * @Date: 2018-03-26 22:06:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-15 21:57:15
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { SEPERATERCOLOR, NIGHTTHEMECOLOR, NIGHTSEPERATERCOLOR } from "../../constants/colors";
import { getWidth } from "../../utils/ScreenUtils";
import { connect } from "react-redux";

class ItemSeparater extends Component {
  static defaultProps = {
    width: getWidth(),
    height: 0.5,
  };
  render() {
    return (
      <View
        style={{
          width: this.props.width,
          backgroundColor: this.props.color?this.props.color:this.props.isNight?NIGHTSEPERATERCOLOR:SEPERATERCOLOR,
          alignSelf: this.props.direction,
          height: this.props.height
        }}
      />
    );
  }
}

const stateToProps = state => {
   return {
      isNight :state.SettingReducer.isNight
   }
}

export default connect(stateToProps)(ItemSeparater)