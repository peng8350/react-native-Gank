/**
 -----------------------------------------

 作者:
 时间: 2018/3/23 下午11:22
 邮箱: peng8350@gmail.com

 -----------------------------------------
 **/


import React, { Component } from 'react';

import { Provider } from 'react-redux';

import {store} from './Store'
import {StackNavigator} from 'react-navigation'
import MainActivity from "./ui/MainActivity";

const Screens= StackNavigator(
    {
        Main:{screen: MainActivity}
    }
)

export default class App extends Component {

    render() {

        return (
            <Provider store = {store}>
                <Screens/>
            </Provider>


        )

    }

}