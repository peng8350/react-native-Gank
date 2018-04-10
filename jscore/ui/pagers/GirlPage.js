/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-10 17:11:42
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import * as Actions from "../../actions/fetchGirlAction";
import PullableList from "../../components/list/PullableList";
import { connect } from "react-redux";
import * as Action from '../../actions/fetchGirlAction'
import {bindActionCreators} from 'redux'
import PicImage from "../../components/view/PicImage";

class GirlPage extends Component {

  pageSize = 0;
  _onRefresh(isUp) {
    if (isUp) {
      this.pageSize = 1;
    } else {
      this.pageSize++;
    }
    this.props.actions.fetchGirl(isUp, this.pageSize,() => {
      if(isUp){
        this.refs.girllist.RefreshComplete()
      }
      else {
        this.refs.girllist.LoadComplete()
      }
    });
  }

  _renderItem(info) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.actions.startViewPic(info.index);
        }}
      >
        <PicImage url={{uri:info.item.url}} placeholder={require('../../resources/empty.png')} />
      </TouchableHighlight>
    );
  }


  componentDidMount() {
    // this.props.actions.fetchGirl(true, ++this.pageSize,() => {
    //     this.refs.girllist.RefreshComplete()
    // });
  }
  
  render() {
    return (
      <View>
        <PullableList
          ref={'girllist'}
          data={this.props.dataSource}
          renderItem={info => this._renderItem(info)}
          numColumns={2}
          refreshing={this.props.fetching}
          onRefresh={() => this._onRefresh(true)}
          onLoadMore={() => {
            this._onRefresh(false);
          }}
        />
      </View>
    );
  }
}


const stateToProps = state => {
  return {
    fetching: state.GirlReducer.fetching,
    dataSource: state.GirlReducer.dataSource
  };
};

const actionsToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(stateToProps, actionsToProps)(GirlPage);