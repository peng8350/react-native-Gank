/*
 * @Author: Jpeng 
 * @Date: 2018-04-12 17:23:55 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 14:08:45
 * @Email: peng8350@gmail.com 
 */
//@flow

import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  TouchableHighlight,
  Animated
} from "react-native";
import GankItem from "../../components/Item/GankItem";
import GankManager from "../../utils/GankManager";
import MyCheckBox from "../../components/view/MyCheckBox";
import { FETCH_GIRL_SUCCESS } from "../../actions/ActionType";
import DbUtils from "../../utils/DbUtils";
import { globalStyles } from "../../constants/styles";
import IconText from "../../components/view/IconText";
import { THEMECOLOR, NIGHTTHEMECOLOR } from "../../constants/colors";

export default class LikePage extends Component {
  //用来判断选中的数量
  selectCount = 0;
  constructor() {
    super();

    this.state = {
      dataSource: [[], [], [], [], [], []],
      selectList: [],
      rotate: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
      ],
      vischild: [true, true, true, true, true, true]
    };
  }

  _renderCheckBox(index) {
    if (this.props.rightBtnText !== "删除") {
      return (
        <View
          style={{
            flex: 1,
            padding: 5,
            position: "absolute",
            alignItems: "flex-end",
            bottom: 0,
            top: 0,
            right: 0,
            left: 0
          }}
        >
          <MyCheckBox
            selected={this.state.selectList[index]}
            onChecked={selected => {
              this.selectCount += selected ? 1 : -1;
              this.state.selectList[index] = selected;
              if (this.selectCount > 0) this.props.change(2);
              else this.props.change(1);
              this.setState({
                selectList: [].concat(this.state.selectList)
              });
            }}
          />
        </View>
      );
    }
    return null;
  }

  deleteData() {
    let arr1 = [];
    for (let i = 0; i < this.state.selectList.length; i++) {
      if (!this.state.selectList[i]) {
        arr1.push(this.state.dataSource[i]);
      } else {
        let bean = this.state.dataSource[i];
        DbUtils.update("gank", { _id: bean._id, like: false });
      }
    }
    this.setState(
      {
        dataSource: [].concat(arr1)
      },
      () => {
        let arr2 = [];
        for (const item of this.state.dataSource) {
          arr2.push(false);
        }
        this.setState({
          selectList: [].concat(arr2)
        });
        this.selectCount = 0;
      }
    );
  }

  _renderItem = ({ item, index }) => {
    //表示组的下标索引,实属没办法通过renderItem来获取groupIndex
    let groupIndex =
      item.type === "前端"
        ? 0
        : item.type === "Android"
          ? 1
          : item.type === "iOS"
            ? 2
            : item.type === "App"
              ? 3
              : item.type === "拓展资源"
                ? 5
                : 4;
    if (this.state.vischild[groupIndex])
      return (
        <View stlye={{ flex: 1, flexDirection: "row" }}>
          <GankItem
            ctn={item.desc}
            author={item.who}
            // images={item.images}
            time={item.time}
            clickLike={this._pressLike}
            clickMore={this._pressMore}
            onItemSelect={() => {
              this.props.navigation.navigate("Web", { url: item.url });
            }}
          />
          {this._renderCheckBox(index)}
        </View>
      );
    return null;
  };

  _rendeHeader(section, index) {
    const spin = this.state.rotate[index].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-90deg']
    })
    return (
      <TouchableHighlight
        onPress={previous => {
          Animated.timing(this.state.rotate[index], {
            toValue: this.state.vischild[index] ? 1 : 0,
            duration: 300
          }).start();
          this.state.vischild[index] = !this.state.vischild[index];
          this.setState({
            vischild: this.state.vischild
          });
        }}
      >
        <View
          style={[
            globalStyles.horizontalLayout,
            { backgroundColor: "#f6f6f6", height: 40, paddingLeft: 20 }
          ]}
        >
          <IconText
            iconStyle={{ transform: [{rotate: spin}] }}
            textStyle={globalStyles.BigText}
            text={section.title}
            animate={true}
            color={"#fff"}
            size={26}
            name={"ios-arrow-down"}
          />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <SectionList
        sections={this.state.dataSource}
        keyExtractor={(item, index) => index + ""}
        extraData={[
          this.state.selectList,
          this.props.rightBtnText,
          this.state.vischild,
          this.state.rotate
        ]}
        renderItem={this._renderItem}
        renderSectionHeader={({ section }) =>
          this._rendeHeader(section, section.index)
        }
      />
    );
  }

  componentWillMount() {
    let queryList1 = GankManager.getLikeFromDb("前端");
    let queryList2 = GankManager.getLikeFromDb("Android");
    let queryList3 = GankManager.getLikeFromDb("iOS");
    let queryList4 = GankManager.getLikeFromDb("App");
    let queryList5 = GankManager.getLikeFromDb("瞎推荐");
    let queryList6 = GankManager.getLikeFromDb("拓展资源");
    let arr = [
      { index: 0, data: queryList1, title: "前端" },
      { index: 1, data: queryList2, title: "Android" },
      { index: 2, data: queryList3, title: "iOS" },
      { index: 3, data: queryList4, title: "App" },
      { index: 4, data: queryList5, title: "瞎推荐" },
      { index: 5, data: queryList6, title: "拓展资源" }
    ];
    let selectList = [[], [], [], [], [], []];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < arr[i].data.length; i++) {
        selectList[i].push(false);
      }
    }
    this.setState({
      dataSource: [].concat(...arr),
      selectList: selectList
    });
  }
}
