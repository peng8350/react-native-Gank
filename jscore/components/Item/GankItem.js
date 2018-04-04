/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 20:05:36 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 12:16:36
 * @Last Modified time: 2018-04-04 16:18:23
 */

//@flow

import React, { Component } from "react";
import { globalStyles } from "../../constants/styles";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateUtils from "../../utils/DateUtils";
import { TEXTSMALLCOLOR, PRESSEDCOLOR } from "../../constants/colors";

export default class GankItem extends Component {
  _renderIconText(iconName, text) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10
        }}
      >
        <Icon name={iconName} color={TEXTSMALLCOLOR} size={16} />
        <Text
          style={[
            globalStyles.smallText,
            { textAlign: "right", marginLeft: 2 }
          ]}
        >
          {" " + text}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={PRESSEDCOLOR}
        onPress={this.props.onItemSelect}
      >
        <View style={globalStyles.itemContainer}>
          <View style={styles.leftContainer}>
            <Text style={globalStyles.normalText}>{this.props.ctn}</Text>
          </View>

          <View style={styles.rightContainer}>
            <View
              style={[
                globalStyles.verticalLayout,
                {
                  alignItems: "flex-end",
                  justifyContent: "space-between"
                }
              ]}
            >
              {this._renderIconText("ios-person-outline", this.props.author)}
              {this._renderIconText(
                "ios-clock-outline",
                DateUtils.parseString(this.props.time, "YYYY年MM月DD日")
              )}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  rightContainer: {
    width: 120
  },
  leftContainer: {
    flex: 1
  }
});
