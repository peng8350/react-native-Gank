/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:57 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-25 12:40:34
 * @Email: peng8350@gmail.com 
 */
import React, { Component } from "react";

import { Provider } from "react-redux";

import { store } from "./Store";
import { StackNavigator } from "react-navigation";
import MainActivity from "./ui/MainActivity";

const Screens = StackNavigator({
  Main: { screen: MainActivity }
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
