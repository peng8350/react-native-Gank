/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 20:05:36 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 12:16:36
 * @Last Modified time: 2018-04-01 20:31:22
 */

//@flow

import React, { Component } from "react";
import { globalStyles } from "../../constants/styles";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateUtils from "../../utils/DateUtils";
import { TEXTSMALLCOLOR, PRESSEDCOLOR } from "../../constants/colors";



export default class GankItem extends Component {
  render() {
    return (
      <TouchableHighlight underlayColor={PRESSEDCOLOR} onPress={this.props.onItemSelect}>
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
              <Text style={[globalStyles.smallText, { textAlign: "right" }]}>
                <Icon
                  name="ios-person-outline"
                  color={TEXTSMALLCOLOR}
                  size={16}
                />
                {" " + this.props.author}
              </Text>
              <Text style={[globalStyles.smallText, { textAlign: "right" }]}>
                <Icon
                  name="ios-clock-outline"
                  color={TEXTSMALLCOLOR}
                  size={14}
                />
                {" " + DateUtils.parseString(this.props.time, "YYYY年MM月DD日")}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  rightContainer: {
    width:120
  },
  leftContainer: {
    flex:1
  }
});
