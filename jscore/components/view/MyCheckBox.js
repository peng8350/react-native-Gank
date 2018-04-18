/*
 * @Author: Jpeng 
 * @Date: 2018-04-18 20:59:46 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-18 22:20:17
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { THEMECOLOR, PRESSEDCOLOR } from "../../constants/colors";
import IconView from "react-native-vector-icons/Ionicons";
import { View, TouchableHighlight, StyleSheet } from "react-native";

export default class MyCheckBox extends Component {
  static defaultProps = {
    tickColor: "white",
    bgColor: THEMECOLOR,
    iconSize: 18,
    size: 20,
    selected: false
  };

  _renderTick() {
    if (!this.props.selected) return null;
    return (
      <IconView
        stlye={{ backgroundColor: "transparent" }}
        name="md-checkmark"
        size={this.props.iconSize}
        color={this.props.tickColor}
      />
    );
  }

  render() {
    return (
      <TouchableHighlight
        style={{ width: this.props.size, height: this.props.size }}
        underlayColor={PRESSEDCOLOR}
        onPress={() => {
          if (this.props.onChecked) this.props.onChecked(!this.props.selected);
        }}
      >
        <View
          style={[
            this.props.style,
            styles.container,
            {
              backgroundColor: this.props.selected
                ? this.props.bgColor
                : "white",
              width: 21,
              height: 21,
              borderColor: this.props.bgColor
            }
          ]}
        >
          {this._renderTick()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  }
});
