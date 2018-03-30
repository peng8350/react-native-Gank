/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-30 19:37:47
 * @Email: peng8350@gmail.com 
 */

 //@flow

 import React, { Component } from 'react';
import { View } from 'react-native';
import { globalStyles } from '../constants/styles';
 

 export default class GankActivity extends Component{

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.GankType,
    })
    render(){
        return (
            <View>

            </View>
        )
    }

 }