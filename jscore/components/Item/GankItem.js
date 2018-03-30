import React, { Component } from "react";
import { globalStyles } from "../../constants/styles";
import { View, Text, StyleSheet } from "react-native";

/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 20:05:36 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-30 20:50:55
 * @Email: peng8350@gmail.com 
 */

//@flow

export default class GankItem extends Component {
  render() {
    return (
      <View style={globalStyles.itemContainer}>
        <View style={styles.leftContainer}>
          <Text style={globalStyles.normalText}>{this.props.ctn}</Text>
        </View>

        <View
          style={{
            width: 100
          }}
        >
          <View style={[globalStyles.verticalLayout, styles.rightContainer]}>
            <Text style={[{ textAlign: "right" }, globalStyles.smallText]}>
              {this.props.author}
            </Text>
            <Text style={[{ textAlign: "right" },globalStyles.smallText]}>{this.props.time}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: 100
  },
  leftContainer: {
    flex: 1
  }
});
