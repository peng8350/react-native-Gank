/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 22:08:46
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
import { BOTTTOMBGCOLOR, NIGHTBGCOLOR } from "../constants/colors";
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation
} from "react-native-popup-dialog";
import { getWidth } from "../utils/ScreenUtils";

const slideAnimation = new SlideAnimation({
  slideFrom: "left"
});

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
      selectPos: 0,
      dataSource: [],
      liked: [false, false, false, false],
      error: false
    };
  }

  _renderMoreView(){
    return (
      <View>
      <Text style={[globalStyles.normalText, { margin: 3 }]}>
      描述:{"\n"}
      {this.state.dataSource[this.state.selectPos].desc}
      </Text>
      <Text style={[globalStyles.normalText, { margin: 3 }]}>
        类型:{"\n"}
        {this.state.dataSource[this.state.selectPos].type}
      </Text>
      <Text style={[globalStyles.normalText, { margin: 3 }]}>
        时间:{"\n"}
        {this.state.dataSource[this.state.selectPos].time}
      </Text>
      <Text style={[globalStyles.normalText, { margin: 3 }]}>
        作者:{"\n"}
        {this.state.dataSource[this.state.selectPos].who}
      </Text>
      <Text style={[globalStyles.normalText, { margin: 3 }]}>
        地址:{"\n"}
        {this.state.dataSource[this.state.selectPos].url}
      </Text>
      </View>
    )
  }

  _renderDialog() {
    return (
      <PopupDialog
        show={this.props.showMore}
        width={getWidth() * 0.75}
        dialogStyle={{
          backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#fff"
        }}
        dialogAnimation={slideAnimation}
        onDismissed={() => this.props.action.showMore(false)}
        dialogTitle={
          <DialogTitle
            title="更多信息"
            titleStyle={{
              backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#fff",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0
            }}
          />
        }
        actions={[
          <DialogButton
            key="1"
            textStyle={[globalStyles.BigText, { color: "red" }]}
            text="取消"
            align="center"
            onPress={() => {
              this.props.action.showMore(false);
            }}
          />
        ]}
      >
        <View style={globalStyles.verticalLayout}>
        
            {this._renderMoreView()}
        </View>
      </PopupDialog>
    );
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
          this.setState(
            prevState => {
              return {
                error: false,
                dataSource: newArr.concat(this.state.dataSource)
              };
            },
            () => GankManager.insertDb(newArr)
          );
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
    DbUtils.update("gank", { _id: selectRow._id, like: true });
    this.setState({
      ...this.state
    });
  };

  _pressMore = index => {
    this.setState(
      {
        selectPos: index
      },
      () => this.props.action.showMore(true)
    );
  };

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

  _renderSearchingBar() {
    return (
      <Modal visible={this.props.searching} transparent={true}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: this.props.isNight ? NIGHTBGCOLOR : "#fff",
              borderRadius: 6,
              borderWidth: 12,
              borderColor: this.props.isNight ? NIGHTBGCOLOR : "#fff"
            }}
          >
            <LoadingBar title={"搜索中"} />
          </View>
        </View>
      </Modal>
    );
  }

  _renderSearchList() {
    return this.props.enterSearch ? (
      <PullableList
        style={[
          styles.searchList,
          { backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#f3f3f3" }
        ]}
        data={this.props.searchList}
        renderItem={({ item, index }) => {
          return (
            <GankItem
              index={index}
              ctn={item.desc}
              author={item.who}
              showSwipes={false}
              like={this.state.liked[index]}
              // images={item.images}
              time={item.publishedAt}
              clickLike={this._pressLike}
              clickMore={this._pressMore}
              onItemSelect={() => {
                this.props.navigation.navigate("Web", { url: item.url });
              }}
            />
          );
        }}
      />
    ) : null;
  }

  componentWillMount() {
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
          for (let i = 0; i < queryList.length; i++) {
            this.state.liked[i] = this.state.dataSource[i].like;
          }
        }
      );
    else {
      if (this.props.autoRefresh) this._onRefresh();
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#f3f3f3"
        }}
      >
        <PullableList
          style={{
            backgroundColor: this.props.isNight ? BOTTTOMBGCOLOR : "#f3f3f3"
          }}
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
                showSwipes={true}
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
        {this._renderSearchList()}
        {this._renderSearchingBar()}
        {this._renderDialog()}
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
    isNight: state.SettingReducer.isNight,
    enterSearch: state.GankReducer.enterSearch,
    searching: state.GankReducer.searching,
    searchList: state.GankReducer.searchList,
    showMore: state.GankReducer.showMore
  };
};

const actionDispatch = dispatch => {
  return {
    action: bindActionCreators(Action, dispatch)
  };
};

export default connect(stateToprops, actionDispatch)(GankActivity);
