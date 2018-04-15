/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 14:24:47 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-15 21:11:10
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { globalStyles } from "../../constants/styles";
import { View, Text, StyleSheet, TouchableHighlight, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateUtils from "../../utils/DateUtils";
import { TEXTSMALLCOLOR, PRESSEDCOLOR } from "../../constants/colors";
import ItemSeparater from "../other/ItemSeparater";
import { getWidth } from "../../utils/ScreenUtils";
import IconText from "../view/IconText";
import CallOnceInInterval from "../../utils/CallOnceInInterval";

export default class HomeGankItem extends Component {
  
  render() {
    return (
      <TouchableHighlight
        style={{ margin: 5 }}
        underlayColor={PRESSEDCOLOR}
        onPress={() => CallOnceInInterval(this.props.onItemSelect) }
      >
        <View style={[globalStyles.verticalLayout, styles.container]}>
          <View style={styles.topContainer}>
            <Text style={globalStyles.normalText}>{this.props.ctn}</Text>
          </View>
          <ItemSeparater
            height={0.5}
            width={getWidth() * 0.75}
            direction={"flex-end"}
          />
          <View style={styles.bottomContainer}>
            <IconText name ='ios-color-filter-outline' text={this.props.type}/>
            <IconText style={{marginLeft: 10}} name ='ios-person-outline' text={this.props.author}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    shadowRadius: 2,
    shadowColor: "#333",
    shadowOffset: { height: 5, width: 5 },
    shadowOpacity: 0.3,
    padding: 5,
  },
  topContainer: {
    flex: 1
  },
  bottomContainer: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  }
});
