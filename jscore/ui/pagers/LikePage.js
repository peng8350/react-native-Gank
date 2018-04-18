/*
 * @Author: Jpeng 
 * @Date: 2018-04-12 17:23:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-18 23:05:58
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import GankItem from "../../components/Item/GankItem";
import GankManager from "../../utils/GankManager";
import MyCheckBox from "../../components/view/MyCheckBox";
import { FETCH_GIRL_SUCCESS } from "../../actions/ActionType";

export default class LikePage extends Component {
  //用来判断选中的数量
  selectCount = 0;  
  constructor() {
    super();
    this.state = {
      dataSource: [],
      selectList: []
    };
  }

  _renderCheckBox(index){
    if(this.props.rightBtnText!=='删除'){
      return (
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
          this.selectCount += selected?1:-1;
          this.state.selectList[index] = selected
          if(this.selectCount>0)
          this.props.change(2)
          else this.props.change(1)
          this.setState({
            selectList: [].concat(this.state.selectList)
          })
        }}/>
      </View>
      )
    }
    return null;
  }

  clearCount(){
    for (var item of this.state.queryList) {
      item = false
    }
    this.selectCount=0
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
        {this._renderCheckBox(index)}
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.dataSource}
        keyExtractor={(item, index) => index + ""}
        extraData={[this.state.selectList,this.state.rightBtnText]}
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
