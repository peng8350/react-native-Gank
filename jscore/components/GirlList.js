/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 11:47:56 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-27 13:05:26
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from 'react';
import { StyleSheet, FlatList, View,Image } from 'react-native';
import {getWidth} from '../utils/ScreenUtils'

export default class GirlList extends Component{

    render(){
        return ( <FlatList data={this.props.dataSource} renderItem={({item}) => this._renderItem(item)}
                numColumns={2} 
        />
        )
    }

    _renderItem(item){
        return (
            <Image source={{
                uri: item.url,
                method: 'POST',
                headers: {
                Pragma: 'no-cache'
                },
            }}  style={styles.picture} />
                
        )
    }
    
}
const styles = StyleSheet.create({
    picture: {
        width:getWidth()/2,
        height:200,
    }
})



