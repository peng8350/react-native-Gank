/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:04 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-04 16:01:05
 * @Email: peng8350@gmail.com 
 */
// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeGridView from '../../components/list/HomeGridView'
import HomeGankList from "../../components/list/HomeGankList";

//@flow
export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
      
        <HomeGankList navigation={this.props.navigation} header = { <HomeGridView navigation={this.props.navigation}></HomeGridView>}></HomeGankList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  }
})
