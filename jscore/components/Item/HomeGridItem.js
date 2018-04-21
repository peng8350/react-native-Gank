/*
 * @Author: Jpeng 
 * @Date: 2018-03-31 10:28:30 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 18:37:03
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
import { globalStyles } from "../../constants/styles";

class HomeGridItem extends Component {

  shouldComponentUpdate(){
    return false
  }

  render() {
    return (
      <TouchableHighlight
        style={{ flex: 1 }}
        underlayColor={PRESSEDCOLOR}
        onPress={() =>
          CallOnceInInterval(() => this.props.onItemPress(this.props.title))
        }
      >
        <View style={[globalStyles.verCenLayout, styles.itemContainer]}>
          <IconView
            iconName={this.props.img}
            iconSize={28}
            size={50}
            bgColor={this.props.bgColor}
            iconColor={"#fff"}
            radius={50}
            iconType={this.props.iconType}
          />

          <Text style={[globalStyles.BigText, styles.textView]}>
            {this.props.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    height: 90,
    justifyContent: "center",
    alignItems: "center"
  },
  textView: {
    marginTop: 5
  }
});

export default HomeGridItem;
