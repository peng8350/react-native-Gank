/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:27:45
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
  CameraRoll
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

class GirlPage extends Component {
  pageSize = 0;
  _onRefresh(isUp,call) {
    if (isUp) {
      this.pageSize = 1;
    } else {
      this.pageSize++;
    }
    this.props.actions.fetchGirl(isUp, this.pageSize, () => {
      if (isUp) {
        this.refs.girllist.RefreshComplete();
      } else {
        call()
        // this.refs.girllist.LoadComplete();
      }
    });
  }

  _renderItem(info) {
    const marginStyle  = info.index&1?{marginLeft: 5,marginBottom: 3}:{marginRight: 2,marginBottom: 1}
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.actions.startViewPic(info.index);
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
    downPic(this.props.dataSource[this.props.viewIndex].url,'/Users/peng/Pictures');
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
    if(this.props.autoRefresh)
    this.props.actions.fetchGirl(true, ++this.pageSize, () => {
      this.refs.girllist.RefreshComplete();
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        <PullableList
          ref={"girllist"}
          data={this.props.dataSource}
          renderItem={info => this._renderItem(info)}
          numColumns={2}
          onRefresh={() => this._onRefresh(true)}
          onLoadMore={(call) => {
            this._onRefresh(false,call);
          }}
        />
        <Modal visible={this.props.viewing}>
          <TouchableHighlight
            onLongPress={() => this.refs.actionSheet.show()}
            style={[globalStyles.verCenLayout, { backgroundColor: "#000" }]}
          >
            <View>
              <PhotoView
                source={{
                  uri:
                    this.props.dataSource.length > 0
                      ? this.props.dataSource[this.props.viewIndex].url
                      : "http://baidu.com"
                }}
                minimumZoomScale={0.5}
                maximumZoomScale={3}
                androidScaleType="center"
                onViewTap={() => this.props.actions.stopViewPic()}
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
    isNight: state.SettingReducer.isNight,
    fetching: state.GirlReducer.fetching,
    dataSource: state.GirlReducer.dataSource,
    viewing: state.GirlReducer.viewing,
    viewIndex: state.GirlReducer.viewIndex,
    picPos: state.SettingReducer.picPos,
    autoRefresh: state.SettingReducer.autoRefresh
  };
};

const actionsToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(stateToProps, actionsToProps)(GirlPage);
