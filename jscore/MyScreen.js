/*
 * @Author: Jpeng 
 * @Date: 2018-04-15 20:30:40 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-15 20:33:51
 * @Email: peng8350@gmail.com 
 */
//@flow
import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";
import MainActivity from "./ui/MainActivity";
import GankActivity from "./ui/GankActivity";
import WebActivity from "./ui/WebActivity";
import LikeActivity from "./ui/LikeActivity";
import { connect } from "react-redux";
import { globalStyles } from './constants/styles';
import { THEMECOLOR, NIGHTTHEMECOLOR } from './constants/colors';

class MyScreen extends Component{

  
    render(){
        Screens = StackNavigator(
            {
              Main: { screen: MainActivity },
              Gank: { screen: GankActivity },
              Like: {screen: LikeActivity},
              Web: { screen: WebActivity }
            },
            {
              navigationOptions: {
                headerStyle: [globalStyles.navStyle,{backgroundColor: this.props.isNight?NIGHTTHEMECOLOR:THEMECOLOR}],
                headerTintColor: "white",
                headerTitleStyle: globalStyles.navTitle
              },
              mode: "modal"
            }
          );
      return <Screens/>
    }
  }
  const stateToProps = state => {
    return {
      isNight : state.SettingReducer.isNight
    }
  }
  export default connect(stateToProps)(MyScreen)