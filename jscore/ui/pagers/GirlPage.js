/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-25 23:07:54
 * @Email: peng8350@gmail.com 
 */


import React,{Component} from 'react'
import {
    View,Text,StyleSheet
} from 'react-native'


export default class GirlPage extends  Component{

    render(){
        return <View style={styles.container}>
            <Text>福利界面</Text>
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
