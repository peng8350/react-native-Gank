/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 14:24:47 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 16:21:53
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { globalStyles } from "../../constants/styles";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateUtils from "../../utils/DateUtils";
import { TEXTSMALLCOLOR, PRESSEDCOLOR } from "../../constants/colors";
import ItemSeparater from "../other/ItemSeparater";
import { getWidth } from "../../utils/ScreenUtils";

export default class GankItem extends Component {
  _renderIconText(iconName, text) {
    return (
      <View style={{flexDirection: 'row',
      alignItems: 'center',marginLeft:10}}>
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
        style={{ margin: 5 }}
        underlayColor={PRESSEDCOLOR}
        onPress={this.props.onItemSelect}
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
            {this._renderIconText("ios-color-filter-outline", this.props.type)}
            {this._renderIconText("ios-person-outline", this.props.author)}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 150,
    shadowRadius: 2,
    shadowColor: "#333",
    shadowOffset:{height:5,width:5},
    shadowOpacity: 0.3,
    padding: 5
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
