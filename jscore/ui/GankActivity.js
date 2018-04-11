/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-12 00:25:24
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
import DbUtils, { realm } from "../utils/DbUtils";
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

  constructor() {
    super();
    this.state = {
      dataSource: [],
      liked: [false, false, false, false],
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
          this.refs.ganklist.RefreshComplete();
          return;
        }
        if (arr.length > 0) {
          this.pageIndex++;
          let newArr = GankManager.toGankBean(arr);
          this.setState(prevState => {
            return {
              error: false,
              dataSource: newArr.concat(this.state.dataSource)
            };
          },() => GankManager.insertDb(newArr));
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

  _pressLike = index => {
    let selectRow = this.state.dataSource[index];
    this.state.liked[index] = !this.state.liked[index];
    DbUtils.update('gank',{_id:selectRow._id,like:true})
    this.setState({
      ...this.state
    });
  };

  _pressMore = index => {};

  _onLoadMore = call => {
    const url = FETCHGANK_URL + this.type + "/20/" + this.pageIndex;
    HttpUtils.get(
      url,
      responseJson => {
        let arr = responseJson.results;

        if (arr.length > 0) {
          this.pageIndex++;
          let newArr = GankManager.toGankBean(arr);
          this.setState(
            {
              error: false,
              dataSource: this.state.dataSource.concat(newArr)
            },
            () => {
              GankManager.insertDb(newArr);
              call();
            }
          );
        }
      },
      error => {
        call();
        this.setState({
          error: true
        });
      }
    );
  };

  componentDidMount() {
    this.type =
      this.props.navigation.state.params.GankType === "IOS"
        ? "iOS"
        : this.props.navigation.state.params.GankType;
    this.props.navigation.setParams({ pressRight: this._pressRight });

    var queryList = GankManager.getDataFromDb(this.type);
    this.pageIndex = queryList.length / 20 + 1;
    if (queryList.length > 0)
      this.setState(
        () => {
          return {
            error: false,
            dataSource: this.state.dataSource.concat(...queryList)
          };
        },
        () => {
          for(let i =0 ;i<queryList.length;i++){
            this.state.liked[i] = this.state.dataSource[i].like
          }
        }
      );
  }

  render() {
    return (
      <View style={[globalStyles.verticalLayout]}>
        <PullableList
          ref={"ganklist"}
          data={this.state.dataSource}
          extraData={this.state.liked}
          onRefresh={this._onRefresh}
          onLoadMore={this._onLoadMore}
          renderItem={({ item, index }) => {
            return (
              <GankItem
                index={index}
                ctn={item.desc}
                author={item.who}
                like={this.state.liked[index]}
                // images={item.images}
                time={item.time}
                clickLike={this._pressLike}
                clickMore={this._pressMore}
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
