/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:57 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-30 18:53:49
 * @Email: peng8350@gmail.com 
 */
import React, { Component } from "react";

import { Provider } from "react-redux";

import { store } from "./Store";
import { StackNavigator } from "react-navigation";
import MainActivity from "./ui/MainActivity";
import GankActivity from "./ui/GankActivity";

const Screens = StackNavigator({
  Main: { screen: MainActivity },
  Gank: {screen: GankActivity}
});

export default class App extends Component {
  render() {
    return (
      
      <Provider store={store}>
        <Screens />
      </Provider>
    );
  }
}
