/*
 * @Author: Jpeng 
 * @Date: 2018-03-28 12:29:06 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 16:26:55
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { getWidth } from "../../utils/ScreenUtils";

export default class PicImage extends Component {
  componentDidMount() {}

  render() {
    return (
      <Image
        style={styles.image}
        source={{ uri: this.props.url }}
        resizeMethod={"resize"}
        resizeMode={"cover"}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: getWidth() / 2,
    height: 200
  }
});
