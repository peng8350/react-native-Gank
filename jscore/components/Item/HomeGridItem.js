/*
 * @Author: Jpeng 
 * @Date: 2018-03-31 10:28:30 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-05 16:58:22
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet
} from "react-native";
import { PRESSEDCOLOR } from "../../constants/colors";
import IconView from "../view/IconView";
import CallOnceInInterval from "../../utils/CallOnceInInterval";

class HomeGridItem extends Component {
  render() {
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        underlayColor={PRESSEDCOLOR}
        onPress={() => CallOnceInInterval( () => this.props.onItemPress(this.props.title))}
      >
        <View style={styles.itemContainer}>
          <IconView
            iconName={this.props.img}
            iconSize={28}
            size={50}
            bgColor={this.props.bgColor}
            iconColor={"#fff"}
            radius={50}
            iconType={this.props.iconType}
          />

          <Text style={styles.textView}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: "#fff",
    height: 90,
    justifyContent: "center",
    alignItems: "center"
  },
  textView: {
    marginTop: 5
  }
});

export default HomeGridItem;
