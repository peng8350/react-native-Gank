/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 20:05:36 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 12:16:36
 * @Last Modified time: 2018-04-04 16:54:56
 */

//@flow

import React, { Component } from "react";
import { globalStyles } from "../../constants/styles";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateUtils from "../../utils/DateUtils";
import { TEXTSMALLCOLOR, PRESSEDCOLOR } from "../../constants/colors";
import IconText from "../view/IconText";

export default class GankItem extends Component {

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
            <IconText name= 'ios-person-outline' text ={this.props.author}/>
            <IconText name = 'ios-clock-outline' text ={DateUtils.parseString(this.props.time, "YYYY年MM月DD日")} />
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
