/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:04 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-26 21:50:18
 * @Email: peng8350@gmail.com 
 */
// @flow
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeGridView from '../../components/HomeGridView'

//@flow
export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeGridView></HomeGridView>
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
