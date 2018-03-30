/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 19:54:15 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-30 22:34:46
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import { FlatList } from "react-native";
import GankItem from "../Item/GankItem";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/fetchGankAction";
import ItemSeparater from "../ItemSeparater";
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
        keyExtractor={ (item,index) => index+''}
        renderItem={({ item }) => {
          return (
            <GankItem ctn={item.desc} author={item.who} time={item.publishedAt} />
          );
        }}
        ItemSeparatorComponent={() => <ItemSeparater />}
      />
    );
  }

  componentDidMount() {
      const url = FETCHGANK_URL+this.props.gankType+"/40/"+this.props.pageIndex
      this.props.acations.fetchGank(url)
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
    acations: bindActionCreators(Actions, dispatch)
  };
};

export default connect(stateToprops, dispatchToProps)(GankList);
