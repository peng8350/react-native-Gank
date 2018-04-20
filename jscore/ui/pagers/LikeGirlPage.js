/*
 * @Author: Jpeng 
 * @Date: 2018-04-20 22:17:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 22:33:47
 * @Email: peng8350@gmail.com 
 */

 //@flow
 import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  CameraRoll,
  FlatList
} from "react-native";
import * as Actions from "../../actions/fetchGirlAction";
import PullableList from "../../components/list/PullableList";
import { connect } from "react-redux";
import * as Action from "../../actions/fetchGirlAction";
import { bindActionCreators } from "redux";
import PicImage from "../../components/view/PicImage";
import PhotoView from "react-native-photo-view";
import { getWidth, getHeight } from "../../utils/ScreenUtils";
import { globalStyles } from "../../constants/styles";
import { isIOS, _Download, downPic } from "../../utils/SystemUtils";
import ActionSheet from "react-native-actionsheet";
import DbUtils from "../../utils/DbUtils";

class LikeGirlPage extends Component {

  constructor() {
    super();
    this.state = {
      dataSource: [],
      selectList: [],
      viewing: false,
      viewIndex: 0
    };
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
              viewing:true,
              viewIndex: info.index
          })
        }}
      >
        <PicImage
          style={marginStyle}
          url={{ uri: info.item.url }}
          placeholder={
            this.props.isNight
              ? require("../../resources/empty_night.png")
              : require("../../resources/empty.png")
          }
        />
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

  componentDidMount() {
      let arr=DbUtils.queryAll('girl')
      this.setState({
          dataSource: arr
      })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref={"girllist"}
          data={this.state.dataSource}
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
                  this.state.dataSource&&this.state.dataSource.length > 0
                      ? this.state.dataSource[this.state.viewIndex].url
                      : "http://baidu.com"
                }}
                minimumZoomScale={0.5}
                maximumZoomScale={3}
                androidScaleType="center"
                onViewTap={() => this.setState({
                    viewing: false
                })}
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


const stateToProps = state => {
    return {
        isNight : state.SettingReducer.isNight
    }
}
const dispatchAction = dispatch => {

    return {
        actions: bindActionCreators(Action,dispatch)
    }
}

export default connect(stateToProps,dispatchAction)(LikeGirlPage)