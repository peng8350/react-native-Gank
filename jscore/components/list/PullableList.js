/*
 * @Author: Jpeng 
 * @Date: 2018-04-10 16:04:30 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-17 23:04:56
 * @Email: peng8350@gmail.com 
 */
//@flow
import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import ItemSeparater from "../other/ItemSeparater";
import LoadingBar from "../view/LoadingBar";

export default class PullableList extends Component {

  loading = false

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
        {...this.props}
        keyExtractor={(item, index) => index + ""}
        onRefresh={() => {
          this.setState({
            isRefresh: true
          });
          if(this.props.onRefresh)
          this.props.onRefresh();
        }}
        refreshing={this.state.isRefresh}
        onEndReached={() => {
          //之所以判断是不是正在加载,是因为这里存在调用>2上拉回调可能性的bug,并且要有数据才上拉加载
          if(this.props.data.length===0)return;
          if(!this.props.onLoadMore)return;
            if (!this.loading ) {
              this.loading = true;
              this.setState({
                isLoadMore: true
              },
              () => {
                
                this.props.onLoadMore(() => {
                  this.loading =false;
                
                  this.LoadComplete()
                })
              }
            ); 
              

            }
        }}
        ListFooterComponent={() =>
          this.state.isLoadMore ? <LoadingBar /> : null
        }
        ListEmptyComponent={ <View  style={{flex:-1}}>
          <Text style={{backgroundColor: '#000',alignSelf:'center'}}>asd</Text>
        </View>
        }
        renderItem={this.props.renderItem}
        ItemSeparatorComponent={() => <ItemSeparater />}
        onEndReachedThreshold={0.01}
    
      />
    );
  }
}
