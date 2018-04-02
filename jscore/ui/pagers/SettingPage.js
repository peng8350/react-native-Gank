/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:24 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-02 20:13:33
 * @Email: peng8350@gmail.com 
 */
 //@flow
import React,{Component} from 'react'
import {
    View,Text,StyleSheet
} from 'react-native'
import SettingList from '../../components/list/SettingList';


export default class SettingPage extends  Component{
    render(){
        return (
            <SettingList/>
        )
    }
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})
