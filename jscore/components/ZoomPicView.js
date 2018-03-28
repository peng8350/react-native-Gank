/*
 * @Author: Jpeng 
 * @Date: 2018-03-28 22:46:16 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-28 23:37:25
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../actions/fetchGirlAction";
import { bindActionCreators } from "redux";
import { Modal } from "react-native";
import { ImageViewer } from "react-native-image-zoom-viewer";

class ZoomPicView extends Component {
    
  render() {
    return (
        
      <Modal visible={this.props.viewing} >
        <ImageViewer imageUrls={this.props.dataSource}
            onClick= {this.props.actions.stopViewPic} index ={this.props.viewIndex}
        />
      </Modal>
    );
  }
}

const stateToProps = state => {
  return {
    viewing: state.GirlReducer.viewing,
    viewIndex: state.GirlReducer.viewIndex,
    dataSource: state.GirlReducer.dataSource
  };
};

const dispatchAction = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(stateToProps, dispatchAction)(ZoomPicView);
