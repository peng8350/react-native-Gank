/*
 * @Author: Jpeng 
 * @Date: 2018-04-18 20:59:46 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-18 21:20:35
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { THEMECOLOR } from "../../constants/colors";
import IconView from "react-native-vector-icons/Ionicons";
import { View, TouchableHighlight, StyleSheet } from "react-native";

export default class MyCheckBox extends Component {
  static defaultProps = {
    tickColor: "white",
    bgColor: THEMECOLOR,
    size: 24,
    selected: false
  };

  _renderTick() {
    // if (!this.props.selected) return null;
    return (
      <IconView
        stlye={{backgroundColor: 'transparent'}}
        name="md-checkmark"
        size={this.props.size}
        color={this.props.tickColor}
      />
    );
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={"transparent"}
        onPress={() => {
          if (this.props.onChecked) this.props.onChecked(!this.props.selected);
        }}
      >
        <View style={[this.props.style,styles.container,{backgroundColor: this.props.selected?this.props.bgColor:'transparent',borderColor:this.props.bgColor}]}>{this._renderTick()}</View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: { width:30,height:30,borderWidth:2,borderRadius: 4,justifyContent: 'center',alignItems: 'center',}
});
