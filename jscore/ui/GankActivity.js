/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-01 20:33:39
 * @Email: peng8350@gmail.com 
 */

 //@flow

 import React, { Component } from 'react';
import { View } from 'react-native';
import { globalStyles } from '../constants/styles';
import GankList from '../components/list/GankList';
import { FETCHGANK_URL } from '../constants/strings';
 

 export default class GankActivity extends Component{



    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.GankType,
    })


    render(){
        return (
                <GankList gankType= {this.props.navigation.state.params.GankType}  navigation ={this.props.navigation}/>
        )
    }


 }

