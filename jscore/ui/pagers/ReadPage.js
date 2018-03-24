/**
 -----------------------------------------

 作者:
 时间: 2018/3/24 下午1:56
 邮箱: peng8350@gmail.com

 -----------------------------------------
 **/


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
