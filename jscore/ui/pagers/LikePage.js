/*
 * @Author: Jpeng 
 * @Date: 2018-04-12 17:23:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-18 21:09:15
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import GankItem from "../../components/Item/GankItem";
import GankManager from "../../utils/GankManager";
import MyCheckBox from "../../components/view/MyCheckBox";

export default class LikePage extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: []
    };
  }

  _renderItem({ item }) {
    return (
      
      <MyCheckBox />
      /*<GankItem
        ctn={item.desc}
        author={item.who}
        // images={item.images}
        time={item.time}
        clickLike={this._pressLike}
        clickMore={this._pressMore}
        onItemSelect={() => {
          this.props.navigation.navigate("Web", { url: item.url });
        }}
      />*/
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        keyExtractor={(item, index) => index + ""}
        renderItem={this._renderItem}
      />
    );
  }

  componentWillMount() {
    let queryList = GankManager.getLikeFromDb(this.props.type);
    this.setState({
      dataSource: [].concat(...queryList)
    });
  }
}
