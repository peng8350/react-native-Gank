/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 11:47:56 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-28 13:30:35
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import {getWidth} from '../utils/ScreenUtils'
import PicImage from './PicImage';

export default class GirlList extends Component{
    
    render(){
        return ( <FlatList data={this.props.dataSource} renderItem={({item}) => this._renderItem(item)}
                numColumns={2}  keyExtractor={this._extraUniqueKey}
        />
        )
    }

    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    
    _renderItem(item){
        return (
            <PicImage url = {item.url}  />
        )
    }
    
}



