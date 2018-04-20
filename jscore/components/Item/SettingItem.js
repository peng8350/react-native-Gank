/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 19:59:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:55:46
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { globalStyles } from "../../constants/styles";
import IconView from "../view/IconView";
import { PRESSEDCOLOR } from "../../constants/colors";

export default class SettingItem extends Component {
  static defaultProps = {
    title: "标题",
    extra: ""
  };

  render() {
    return (
      <TouchableHighlight
        underlayColor={PRESSEDCOLOR}
        onPress={() => this.props.onItemPress(this.props.pos)}
      >
        <View style={[globalStyles.itemContainer, { height: 50 }]}>
          <View style={[globalStyles.horizontalLayout, styles.leftContainer]}>
            <IconView
              radius={6}
              size={25}
              iconSize={16}
              bgColor={this.props.bgColor}
              iconColor={"#fff"}
              iconName={this.props.iconName}
            />
            <Text style={[globalStyles.normalText, styles.leftText]}>
              {this.props.title}
            </Text>
          </View>

          <View style={[globalStyles.horizontalLayout, styles.rightContainer]}>
            <Text
              style={[globalStyles.smallText, styles.rightText]}
              numberOfLines={1}
            >
              {this.props.extra}
            </Text>
            {this.props.renderRight}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  leftText: {
    marginLeft: 10
  },
  rightText: {
    marginRight: 8
  },
  rightContainer: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingRight: 10
  },
  leftContainer: {
    backgroundColor: "transparent",
    paddingLeft: 10
  }
});
