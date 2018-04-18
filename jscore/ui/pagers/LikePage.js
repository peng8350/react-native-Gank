/*
 * @Author: Jpeng 
 * @Date: 2018-04-12 17:23:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-18 22:27:55
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
      dataSource: [],
      selectList: []
    };
  }

  _renderItem = ({ item,index}) => {
    return (
      <View stlye={{ flex: 1, flexDirection: "row" }}>
        <GankItem
          ctn={item.desc}
          author={item.who}
          // images={item.images}
          time={item.time}
          clickLike={this._pressLike}
          clickMore={this._pressMore}
          onItemSelect={() => {
            this.props.navigation.navigate("Web", { url: item.url });
          }}
        />
        <View
          style={{
            flex: 1,
            padding: 5,
            position: "absolute",
            alignItems: "flex-end",
            bottom: 0,
            top: 0,
            right: 0,
            left: 0
          }}
        >
          <MyCheckBox selected={this.state.selectList[index]} onChecked={(selected) => {
            this.state.selectList[index] = selected
            this.setState({
              selectList: [].concat(this.state.selectList)
            })
          }}/>
        </View>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        keyExtractor={(item, index) => index + ""}
        extraData={this.state.selectList}
        renderItem={this._renderItem}
      />
    );
  }

  componentWillMount() {
    let queryList = GankManager.getLikeFromDb(this.props.type);
    let selectList = [];
    for (const item of queryList) {
      selectList.push(false);
    }
    this.setState({
      dataSource: [].concat(...queryList),
      selectList: selectList
    });
  }
}
