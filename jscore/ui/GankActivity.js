/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-07 18:13:32
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { globalStyles } from "../constants/styles";
import GankList from "../components/list/GankList";
import { FETCHGANK_URL } from "../constants/strings";
import Icon from "react-native-vector-icons/Ionicons";
import SearchHeader from "react-native-search-header";
import LoadingBar from "../components/view/LoadingBar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action from "../actions/fetchGankAction";
import HttpUtils from "../utils/HttpUtils";

class GankActivity extends Component {
  pageIndex = 1;

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.GankType,
    headerBackTitle: "首页1",
    headerBackTitleStyle: { color: "#fff" },
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.pressRight()}>
        <Icon
          suppressHighlighting={true}
          style={{ marginRight: 12 }}
          color="#fff"
          size={28}
          name="ios-search"
        />
      </TouchableOpacity>
    )
  });

  constructor() {
    super();
    this.state = {
      dataSource: [],
      fetching: false,
      error: false
    };
  }

  _pressRight = () => {
    let bar = this.refs.searchBar;
    if (bar.isHidden()) bar.show();
    else bar.hide();
  };

  componentWillUnmount() {
    this.props.action.toggleSearch(false);
  }

  fetchGank(url) {
    if (!this.state.fetching) {
      this.setState({
        fetching: true,
        error: false
      });
      HttpUtils.get(
        url,
        responseJson => {
          this.setState(prevState => {
            return {
              fetching: false,
              error: false,
              dataSource: prevState.dataSource.concat(responseJson.results)
            };
          });
        },
        error => {
          this.setState({
            fetching: false,
            error: true
          });
        }
      );
    }
  }

  componentDidMount() {
    const url =
      FETCHGANK_URL +
      (this.props.navigation.state.params.GankType === "IOS"
        ? "iOS"
        : this.props.navigation.state.params.GankType) +
      "/40/" +
      "1";
    this.fetchGank(url);
    this.props.navigation.setParams({ pressRight: this._pressRight });
  }

  render() {
    return (
      <View style={globalStyles.verticalLayout}>
        <GankList
          dataSource={this.state.dataSource}
          gankType={this.props.navigation.state.params.GankType}
          navigation={this.props.navigation}
        />
        <SearchHeader
          ref={"searchBar"}
          entryAnimation={"from-right-side"}
          placeholder={"标题/作者/日期"}
          onSearch={event => {
            this.props.action.searchGank(
              "http://gank.io/api/search/query/" +
                event.nativeEvent.text +
                "/category/" +
                this.props.navigation.state.params.GankType +
                "/count/3100/page/1"
            );
          }}
          topOffset={0}
          onShow={() => this.props.action.toggleSearch(true)}
          onHide={() => this.props.action.toggleSearch(false)}
        />
        {this.props.enterSearch ? (
          <GankList
            style={styles.searchList}
            gankType={this.props.navigation.state.params.GankType}
            dataSource={this.props.searchList}
            navigation={this.props.navigation}
          />
        ) : null}
        <Modal visible={this.props.searching} transparent={true}>
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              justifyContent: "center",
              flex: 1,
              alignItems: "center"
            }}
          >
            <LoadingBar title={"搜索中..."} />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchList: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 44,
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0
  }
});

const stateToprops = state => {
  return {
    fetching: state.GankReducer.fetching,
    enterSearch: state.GankReducer.enterSearch,
    searching: state.GankReducer.searching,
    dataSource: state.GankReducer.dataSource,
    searchList: state.GankReducer.searchList
  };
};

const actionDispatch = dispatch => {
  return {
    action: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, actionDispatch)(GankActivity);
