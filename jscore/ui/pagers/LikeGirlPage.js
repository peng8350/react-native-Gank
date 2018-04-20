/*
 * @Author: Jpeng 
 * @Date: 2018-04-20 22:17:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 00:26:30
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  CameraRoll,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import PicImage from "../../components/view/PicImage";
import PhotoView from "react-native-photo-view";
import { getWidth, getHeight } from "../../utils/ScreenUtils";
import { globalStyles } from "../../constants/styles";
import { isIOS, _Download, downPic } from "../../utils/SystemUtils";
import ActionSheet from "react-native-actionsheet";
import DbUtils from "../../utils/DbUtils";
import MyCheckBox from "../../components/view/MyCheckBox";

export default class LikeGirlPage extends Component {
  selectCount = 0;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selectList: [],
      viewing: false,
      viewIndex: 0
    };
  }

  _renderCheckBox(index) {
    if (this.props.rightBtnText != "删除") {
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

  _renderItem(info) {
    const marginStyle =
      info.index & 1
        ? { marginLeft: 5, marginBottom: 3 }
        : { marginRight: 2, marginBottom: 1 };
    return (
      <TouchableHighlight
        onPress={() => {
          this.setState({
            viewing: true,
            viewIndex: info.index
          });
        }}
      >
        <View>
          <PicImage
            style={marginStyle}
            url={{ uri: info.item.url }}
            placeholder={
              this.props.isNight
                ? require("../../resources/empty_night.png")
                : require("../../resources/empty.png")
            }
          />
          {this._renderCheckBox(info.index)}
        </View>
      </TouchableHighlight>
    );
  }

  _saveToPath() {
    downPic(
      this.props.dataSource[this.props.viewIndex].url,
      "/Users/peng/Pictures"
    );
  }

  _renderActionSheet() {
    let actionArr = ["收藏", "下载到本地手机", "关闭"];
    return (
      <ActionSheet
        ref={"actionSheet"}
        title={"你想要做什么?"}
        options={actionArr}
        cancelButtonIndex={2}
        onPress={index => {
          switch (index) {
            case 0:
              break;
            case 1:
              //下载图片保存到本地
              this._saveToPath();
              break;
          }
        }}
      />
    );
  }

  deleteData = () => {
    let arr1 = [];
    for (let i = 0; i < this.state.selectList.length; i++) {
      if (!this.state.selectList[i]) {
        arr1.push(this.state.dataSource[i]);
      } else {
        let bean = this.state.dataSource[i];
        DbUtils.delete("girl", "_id='" + bean._id + "'");
      }
    }
    this.setState(
      {
        dataSource: [].concat(...arr1)
      },
      () => {
        let arr2 = [];
        for (const item of arr1) {
          arr2.push(false);
        }
        this.setState({
          selectList: [].concat(...arr2)
        });
        this.selectCount = 0;
      }
    );
  };

  componentWillMount() {
    let querys = DbUtils.queryAll("girl");
    let selectList = [];
    let arr =[]
    for (let i = 0; i < querys.length; i++) {
      selectList.push(false);
      arr.push({url:querys[i].url,_id:querys[i]._id})
    }
 

    this.setState({
      dataSource: arr,
      selectList: selectList
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={"girllist"}
          data={this.state.dataSource}
          extraData={[this.state.selectList, this.props.rightBtnText]}
          renderItem={info => this._renderItem(info)}
          keyExtractor={(item, index) => index + ""}
          numColumns={2}
        />
        <Modal visible={this.state.viewing}>
          <TouchableHighlight
            onLongPress={() => this.refs.actionSheet.show()}
            style={[globalStyles.verCenLayout, { backgroundColor: "#000" }]}
          >
            <View>
              <PhotoView
                source={{
                  uri:
                    this.state.dataSource &&
                    this.state.dataSource.length > 0 &&
                      this.state.dataSource[this.state.viewIndex]
                      ? this.state.dataSource[this.state.viewIndex].url
                      : "http://baidu.com"
                }}
                minimumZoomScale={0.5}
                maximumZoomScale={3}
                androidScaleType="center"
                onViewTap={() =>
                  this.setState({
                    viewing: false
                  })
                }
                style={{ width: getWidth(), height: getHeight() }}
              />
              {this._renderActionSheet()}
            </View>
          </TouchableHighlight>
        </Modal>
      </View>
    );
  }
}
