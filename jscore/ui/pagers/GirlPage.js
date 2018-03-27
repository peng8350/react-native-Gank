/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-27 21:32:59
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

  componentDidMount(){
    this.props.actions.fetchGirl(1)
  }

  render() {
    return (
      
        <GirlList 
          dataSource={this.props.dataSource}
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
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(stateToProps, actionsToProps)(GirlPage);
