/*
 * @Author: Jpeng 
 * @Date: 2018-03-28 12:29:06 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 18:38:31
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component, PureComponent } from "react";
import { StyleSheet, Image, View } from "react-native";
import { getWidth } from "../../utils/ScreenUtils";
import HttpUtils from "../../utils/HttpUtils";

//占位图,error图，渐变流加载
export default class PicImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false
    };
  }

  _renderPlaceHolder() {
    if (this.state.loading && this.props.placeholder) {
      return (
        <Image
          style={[
            styles.image,
            {
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0
            },
            this.props.style
          ]}
          source={this.props.placeholder}
          resizeMethod={"resize"}
        />
      );
    }
  }

  render() {
    return (
      <View>
        <Image
          style={[styles.image, this.props.style]}
          source={this.props.url}
          onLoad={() => {
            this.setState({ loading: false, error: false });
          }}
          resizeMethod={"resize"}
        />

        {this._renderPlaceHolder()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: getWidth() / 2,
    height: 200
  }
});
