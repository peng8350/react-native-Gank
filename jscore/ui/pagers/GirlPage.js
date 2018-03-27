/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-27 13:03:15
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Actions from "../../actions/fetchGirlAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GirlList from "../../components/GirlList";

class GirlPage extends Component {
  render() {
    return (
        <GirlList 
          dataSource={[
            {
            key: '1',
              url:
                "https://ws1.sinaimg.cn/large/610dc034ly1fp9qm6nv50j20u00miacg.jpg"
            },
            {
                key:'2',
                url:"https://ws1.sinaimg.cn/large/610dc034ly1fp9qm6nv50j20u00miacg.jpg"
            }
          ]}
        />
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
    actions: bindActionCreators(dispatch, Actions)
  };
};

export default connect(stateToProps, actionsToProps)(GirlPage);
