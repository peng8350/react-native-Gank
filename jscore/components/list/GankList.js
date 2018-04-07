/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 19:54:15 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-07 23:24:16
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import { FlatList } from "react-native";
import GankItem from "../Item/GankItem";
import { bindActionCreators } from "redux";
import ItemSeparater from "../other/ItemSeparater";
import { FETCHGANK_URL, FETCHGIRL_URL } from "../../constants/strings";
import LoadingBar from "../view/LoadingBar";

export default class GankList extends Component {

  pageIndex = 1

  render() {
    return (
      <FlatList
        style ={[this.props.style]}
        data={this.props.dataSource}
        refreshing={this.props.fetching}
        onRefresh={this.props.onRefresh}
        onEndReached={
          this.props.onLoadMore
        }
        onEndReachedThreshold={0.1}
        ListFooterComponent={ () => !this.props.fetching?<LoadingBar/>:null }
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item }) => {
          return (
            <GankItem
              ctn={item.desc}
              author={item.who}
              // images={item.images}
              time={item.publishedAt}
              onItemSelect={() => {
                this.props.navigation.navigate("Web", { url: item.url });
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <ItemSeparater />}
      />
    );
  }


}

