/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-11 20:35:28
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { globalStyles } from "../constants/styles";
import { FETCHGANK_URL } from "../constants/strings";
import Icon from "react-native-vector-icons/Ionicons";
import SearchHeader from "react-native-search-header";
import LoadingBar from "../components/view/LoadingBar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Action from "../actions/fetchGankAction";
import HttpUtils from "../utils/HttpUtils";
import DbUtils from "../utils/DbUtils";
import GankManager from "../utils/GankManager";
import GankItem from "../components/Item/GankItem";
import PullableList from "../components/list/PullableList";

class GankActivity extends Component {
  pageIndex = 1;
  type = "";

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

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      error: false
    };
  }

  _pressRight = () => {
    let bar = this.refs.searchBar;
    if (bar.isHidden()) bar.show();
    else bar.hide();
  };

  componentWillUnmount() {
    GankManager.insertDb(this.state.dataSource);
    this.props.action.toggleSearch(false);
  }

  _onRefresh = () => {
    const url = FETCHGANK_URL + this.type + "/20/" + 1;
    HttpUtils.get(
      url,
      responseJson => {
        let arr = responseJson.results;
        //下拉操作
        if (
          arr != undefined &&
          this.state.dataSource != undefined &&
          this.state.dataSource.length > 0 &&
          arr[0].desc === this.state.dataSource[0].desc
        ) {
          return;
        }
        if (arr.length > 0) {
          this.pageIndex++;
          let newArr = GankManager.toGankBean(arr);
          this.setState(prevState => {
            return {
              error: false,
              dataSource: newArr
            };
          });
        }
        this.refs.ganklist.RefreshComplete();
      },
      error => {
        this.refs.ganklist.RefreshComplete();
        this.setState({
          error: true
        });
      }
    );
  };

  _onLoadMore = () => {
    const url = FETCHGANK_URL + this.type + "/20/" + this.pageIndex;
    HttpUtils.get(
      url,
      responseJson => {
        let arr = responseJson.results;
        this.pageIndex++;
        if (arr.length > 0) {
          let newArr = GankManager.toGankBean(arr);
          console.log(newArr)
          this.setState(previous => {
            return {
              error: false,
              dataSource: previous.dataSource.concat(newArr)
            };
          });
        }
        this.refs.ganklist.LoadComplete();
      },
      error => {
        this.setState({
          error: true
        });
        this.refs.ganklist.LoadComplete();
      }
    );
  };

  componentDidMount() {
    this.aa = true
    alert(aa)
    this.type =
      this.props.navigation.state.params.GankType === "IOS"
        ? "iOS"
        : this.props.navigation.state.params.GankType;
    this.props.navigation.setParams({ pressRight: this._pressRight });
    let queryList = GankManager.getDataFromDb(this.type);
    this.pageIndex = queryList.length / 20 + 1;

    if (queryList.length > 0)
      this.setState({
        dataSource: queryList
      });
  }

  render() {
    return (
      <View style={[globalStyles.verticalLayout]}>
        <PullableList
          ref={"ganklist"}
          data={this.state.dataSource}
          onRefresh={this._onRefresh}
          onLoadMore={this._onLoadMore}
          renderItem={({ item }) => {
            return (
              <GankItem
                ctn={item.desc}
                author={item.who}
                // images={item.images}
                time={item.time}
                onItemSelect={() => {
                  this.props.navigation.navigate("Web", { url: item.url });
                }}
              />
            );
          }}
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
        {/* {this.props.enterSearch ? (
          <PullableList
          />
        ) : null} */}
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
