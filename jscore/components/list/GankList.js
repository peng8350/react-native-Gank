/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 19:54:15 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-06 19:53:20
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import { FlatList } from "react-native";
import GankItem from "../Item/GankItem";
import { bindActionCreators } from "redux";
import * as Action from "../../actions/fetchGankAction";
import ItemSeparater from "../other/ItemSeparater";
import { FETCHGANK_URL, FETCHGIRL_URL } from "../../constants/strings";
import { connect } from "react-redux";

class GankList extends Component {
  static defaultProps = {
    pageIndex: 1
  };

  render() {
    return (
      <FlatList
        data={this.props.dataSource}
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item }) => {
          return (
            <GankItem
              images={item.images}
              ctn={item.desc}
              author={item.who}
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


  componentWillMount() {
    this.props.actions.clearList();
    if (!this.props.fetching) {
      const url =
        FETCHGANK_URL +
        (this.props.gankType === "IOS" ? "iOS" : this.props.gankType) +
        "/40/" +
        this.props.pageIndex;
      this.props.actions.fetchGank(url);
    }
  }
}

const stateToprops = state => {
  return {
    dataSource: state.GankReducer.dataSource,
    fetching: state.GankReducer.fetching,
    error: state.GankReducer.error
  };
};

const dispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, dispatchToProps)(GankList);
