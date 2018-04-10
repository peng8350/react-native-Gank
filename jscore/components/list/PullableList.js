/*
 * @Author: Jpeng 
 * @Date: 2018-04-10 16:04:30 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-10 17:04:24
 * @Email: peng8350@gmail.com 
 */
//@flow
import React, { Component } from "react";
import { FlatList } from "react-native";
import ItemSeparater from "../other/ItemSeparater";
import LoadingBar from "../view/LoadingBar";

export default class PullableList extends Component {
  static defaultOptions = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoadMore: false,
      isRefresh: false
    };
  }

  RefreshComplete() {
    this.setState({
      isRefresh: false
    });
  }

  LoadComplete() {
    this.setState({
      isLoadMore: false
    });
  }

  render() {
    return (
      <FlatList
         
        keyExtractor={(item, index) => index + ""}
        onRefresh={() => {
          this.setState({
            isRefresh: true
          });
          this.props.onRefresh();
        }}
        refreshing={this.state.isRefresh}
        onEndReached={() => {
          //之所以判断是不是正在加载,是因为这里存在调用两次上拉回调可能性的bug
          if (!this.state.isLoadMore) {
            this.setState({
              isLoadMore: true
            });
            this.props.onLoadMore();
          }
        }}
        ListFooterComponent={() =>
          this.state.isLoadMore ? <LoadingBar /> : null
        }
        renderItem={this.props.renderItem}
        ItemSeparatorComponent={() => <ItemSeparater />}
        onEndReachedThreshold={0.5}
        {...this.props}
      />
    );
  }
}
