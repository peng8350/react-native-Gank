/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 20:05:36 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 12:16:36
 * @Last Modified time: 2018-04-05 14:57:04
 */

//@flow

import React, { Component } from "react";
import { globalStyles } from "../../constants/styles";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateUtils from "../../utils/DateUtils";
import { TEXTSMALLCOLOR, PRESSEDCOLOR } from "../../constants/colors";
import Swipeout from "react-native-swipeout";
import IconText from "../view/IconText";
import { connect } from "react-redux";

export default class GankItem extends Component {

  swipeBtns= [
    {
      backgroundColor: 'deeppink',
      component: this._renderSwipeBtn('ios-heart','收藏'),
    },
    {
      backgroundColor: 'mediumaquamarine',
      component: this._renderSwipeBtn('ios-paper','更多'),
    }
  ]

  _renderSwipeBtn(iconName, text) {
    return (
      <View style={styles.swBtnContainer}>
        <IconText direction={'column'} name={iconName} size={32} text={text} color={'#fff'} textStyle={{ fontSize: 15,color:'#fff'}} />
      </View>
    );
  }

  

  render() {
    return (
      <Swipeout right={this.swipeBtns} buttonWidth={80} autoClose ={true}>
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
                <IconText name="ios-person-outline" text={this.props.author} />
                <IconText
                  name="ios-clock-outline"
                  text={DateUtils.parseString(
                    this.props.time,
                    "YYYY年MM月DD日"
                  )}
                />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  swBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  rightContainer: {
    width: 120
  },
  leftContainer: {
    flex: 1
  }
});
