/*
 * @Author: Jpeng 
 * @Date: 2018-03-24 22:54:20 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-24 22:56:51
 * @Email: peng8350@gmail.com 
 */


import React,{Component} from 'react'
import {
    View,Text,StyleSheet
} from 'react-native'


export default class ReadPage extends  Component{
    render(){
        return <View style={styles.container}>
            <Text>阅读界面</Text>
        </View>
    }
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

})
