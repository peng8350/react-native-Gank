/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 11:47:56 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 10:49:02
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  TouchableHighlight,
  Platform
} from "react-native";
import { getWidth } from "../../utils/ScreenUtils";
import PicImage from "../view/PicImage";
import { TEXTNORMALCOLOR } from "../../constants/colors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions/fetchGirlAction";

class GirlList extends Component {
  pageSize = 0;
  _onRefresh(isUp) {
    if (isUp) {
      this.pageSize = 1;
    } else {
      this.pageSize++;
    }
    this.props.actions.fetchGirl(isUp, this.pageSize);
  }

  componentDidMount() {
    this.props.actions.fetchGirl(true, ++this.pageSize);
  }

  render() {
    return (
      <FlatList
        data={this.props.dataSource}
        renderItem={(info) => this._renderItem(info)}
        numColumns={2}
        keyExtractor={this._extraUniqueKey}
        refreshing={this.props.fetching}
        onRefresh={() => this._onRefresh(true)}
        onEndReached={() => {
          if (this.props.dataSource.length != 0) this._onRefresh(false);
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          this.props.dataSource.length != 0&&Platform.OS==='ios' ? <GirlFooter /> : undefined
        }
      />
    );
  }

  _extraUniqueKey(item, index) {
    return "index" + index + item;
  }

  _renderItem(info) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.actions.startViewPic(info.index);
        }}
      >
        <PicImage url={info.item.url} />
      </TouchableHighlight>
    );
  }
}

class GirlFooter extends Component {
  render() {
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator />
        <Text style={styles.footerText}>等待加载中...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  footerText: {
    fontSize: 14,
    color: TEXTNORMALCOLOR
  }
});

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

export default connect(stateToProps, actionsToProps)(GirlList);
