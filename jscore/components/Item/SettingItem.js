/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 19:59:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-02 20:50:06
 * @Email: peng8350@gmail.com 
 */

 //@flow

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../../constants/styles';
 
 export default class  SettingItem extends Component{

    static defaultProps = {
        title: '标题',
        extra: '提示文字',
        renderRight: undefined,

    }

    render(){
        return (
            <View style={[globalStyles.itemContainer,{height:50}]}>
            <View style={globalStyles.horizontalLayout}>
                
                <Text style={globalStyles.normalText}>{this.props.title}</Text>
            </View>

            <View style={globalStyles.horizontalLayout}>
                <Text style={globalStyles.smallText}>{this.props.extra}</Text>
                {this.props.renderRight}
            </View>
            </View>
        )
    }

 }

 const styles = StyleSheet.create({

 })