/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 14:19:35 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-07 19:40:50
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import * as Action from "../../actions/fetchHomeAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import HomeGankItem from "../Item/HomeGankItem";
import LoadingBar from "../view/LoadingBar";

class HomeGankList extends Component {
  _extraUniqueKey(item, index) {
    return "index" + index + item;
  }

  render() {
    return (
      <FlatList
      ListFooterComponent={ () => this.props.loading?<LoadingBar/>:null }
        ListHeaderComponent={this.props.header}
        data={this.props.dataSource}
        keyExtractor={this._extraUniqueKey}
        renderItem={({ item, index }) => {
          return (
            <HomeGankItem
              type={item.type}
              ctn={item.desc}
              author={item.who}
              time={item.publishedAt}
              onItemSelect={() => {
                this.props.navigation.navigate("Web", { url: item.url });
              }}
            />
          );
        }}
      />
    );
  }

  componentDidMount() {
    this.props.actions.fetchData();
  }
}

const stateToprops = state => {
  return {
    dataSource: state.HomeReducer.dataSource,
    loading: state.HomeReducer.loading,
    error: state.HomeReducer.error
  };
};

const dispatchToAction = dispatch => {
  return {
    actions: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, dispatchToAction)(HomeGankList);
