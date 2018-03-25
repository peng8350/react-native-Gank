/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:24 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-26 00:02:07
 * @Email: peng8350@gmail.com 
 */
 
import React,{Component} from 'react'
import {
    View,Text,StyleSheet
} from 'react-native'



export default class SettingPage extends  Component{
    render(){
        return <View style={styles.container}>
            <Text>设置界面</Text>
        </View>
    }
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },

})
