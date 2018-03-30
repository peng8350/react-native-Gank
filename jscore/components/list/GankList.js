import React,{ Component } from "react";
import { FlatList } from "react-native";
import GankItem from "../Item/GankItem";
import ItemSeparater from "../ItemSeparater";

/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 19:54:15 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-30 20:25:29
 * @Email: peng8350@gmail.com 
 */

 //@flow

 export default class GankList extends Component{


    fakeData =[]


    render(){
        return (
            <FlatList
                data= {this.fakeData} renderItem={({item}) => {
                    return <GankItem ctn={item.ctn} author={item.author}
                        time = {item.time}
                    />
                }}
                ItemSeparatorComponent={() => <ItemSeparater/>}
            />
        
        )
    }

    componentWillMount(){
        for(let i =  0 ;i<20;i++){
            this.fakeData.push({
                key: i+'',
                time: '1111',
                ctn: '这是描述',
                author: '谁谁谁',
                url : '网址网址'
            })
        }
    }
 }