/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-08 00:06:06
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
  isLoading = false;

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.GankType,
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

  fetchGank(url, down) {
   
    this.setState({
      fetching: true,
      error: false
    });
    if (!this.state.fetching) {
      HttpUtils.get(
        url,
        responseJson => {
          this.isLoading = false
          let arr = responseJson.results;
          if (down) {
            //下拉操作
            if (
              arr != undefined &&
              this.state.dataSource != undefined &&
              this.state.dataSource.length > 0 &&
              arr[0].desc === this.state.dataSource[0].desc
            ) {
              this.setState(prevState => {
                return {
                  fetching: false
                };
              });
              return;
            }
          }
          this.pageIndex++;
          this.setState(prevState => {
            return {
              fetching: false,
              error: false,
              dataSource: prevState.dataSource.concat(arr)
            };
          });
        },
        error => {
          this.isLoading = false
          this.setState({
            fetching: false,
            error: true
          });
        }
      );
    }
  }

  _onRefresh() {
    const url =
      FETCHGANK_URL +
      (this.props.navigation.state.params.GankType === "IOS"
        ? "iOS"
        : this.props.navigation.state.params.GankType) +
      "/20/" +
      1;
    this.fetchGank(url, true);
  }

  _onLoadMore() {
    if(!this.isLoading){
    this.isLoading = true;
    const url =
      FETCHGANK_URL +
      (this.props.navigation.state.params.GankType === "IOS"
        ? "iOS"
        : this.props.navigation.state.params.GankType) +
      "/20/" +
      this.pageIndex;
    this.fetchGank(url, false);
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ pressRight: this._pressRight });
  }

  render() {
    return (
      <View style={[globalStyles.verticalLayout]}>
        <GankList
          dataSource={this.state.dataSource}
          fetching={this.state.fetching}
          onRefresh={() => this._onRefresh()}
          onLoadMore={() => this._onLoadMore()}
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
    enterSearch: state.GankReducer.enterSearch,
    searching: state.GankReducer.searching,
    searchList: state.GankReducer.searchList
  };
};

const actionDispatch = dispatch => {
  return {
    action: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, actionDispatch)(GankActivity);
