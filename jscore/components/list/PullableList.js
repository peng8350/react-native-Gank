/*
 * @Author: Jpeng 
 * @Date: 2018-04-10 16:04:30 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-10 18:19:28
 * @Email: peng8350@gmail.com 
 */
//@flow
import React, { Component } from "react";
import { FlatList } from "react-native";
import ItemSeparater from "../other/ItemSeparater";
import LoadingBar from "../view/LoadingBar";

export default class PullableList extends Component {

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
          //之所以判断是不是正在加载,是因为这里存在调用两次上拉回调可能性的bug,并且要有数据才上拉加载
          if (!this.state.isLoadMore&&this.props.data.length>0) {
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
        onEndReachedThreshold={0.1}
        {...this.props}
        style={[{height:'100%'},this.props.styles]}
      />
    );
  }
}
