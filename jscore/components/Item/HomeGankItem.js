/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 14:24:47 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 15:46:11
 * @Email: peng8350@gmail.com 
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
      <Text style={[globalStyles.smallText, { textAlign: "right" }]}>
        <Icon name={iconName} color={TEXTSMALLCOLOR} size={16} />
        {" " + text}
      </Text>
    );
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor={PRESSEDCOLOR}
        onPress={this.props.onItemSelect}
      >
        <View style={[globalStyles.verticalLayout,styles.container]} >
            <View style={styles.topContainer}>
            <Text style={globalStyles.normalText}>{this.props.ctn}</Text>
            </View>
            <View style={styles.bottomContainer}>
                {this._renderIconText('md-home',this.props.type)}
                {this._renderIconText('md-home',this.props.author)}
                {this._renderIconText('md-home',DateUtils.parseString(this.props.time, "YYYY年MM月DD日"))}
            </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        height:150,
        padding:5
    }
    ,
  topContainer: {
      flex:1,
    
  },
  bottomContainer: {
      height:20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
  }
});
