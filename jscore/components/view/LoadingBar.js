/*
 * @Author: Jpeng 
 * @Date: 2018-04-01 20:23:52 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-22 11:35:45
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { globalStyles } from "../../constants/styles";

export default class LoadingBar extends Component {
  constructor() {
    super();
    this.state = {
      timer: 1
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        counter: this.state.timer > 3 ? 1 : ++this.state.timer
      });
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  static defaultProps = {
    title: "数据加载中"
  };

  render() {
    //实现加载中动效
    let append = "";
    for (let i = 1; i <= this.state.counter; i++) {
      append += ".";
    }
    return (
      <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
        <ActivityIndicator size={"large"} />
        <Text style={[globalStyles.normalText, { marginTop: 8 }]}>
          {this.props.title + append}
        </Text>
      </View>
    );
  }
}
