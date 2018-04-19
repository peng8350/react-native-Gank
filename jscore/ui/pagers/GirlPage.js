/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:12 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-19 20:21:48
 * @Email: peng8350@gmail.com 
 */

//@flow
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Modal
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

class GirlPage extends Component {
  pageSize = 0;
  _onRefresh(isUp) {
    if (isUp) {
      this.pageSize = 1;
    } else {
      this.pageSize++;
    }
    this.props.actions.fetchGirl(isUp, this.pageSize, () => {
      if (isUp) {
        this.refs.girllist.RefreshComplete();
      } else {
        this.refs.girllist.LoadComplete();
      }
    });
  }

  _renderItem(info) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.actions.startViewPic(info.index);
        }}
      >
        <PicImage
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

  componentDidMount() {
    this.props.actions.fetchGirl(true, ++this.pageSize, () => {
      this.refs.girllist.RefreshComplete();
    });
  }

  render() {
    return (
      <View>
        <PullableList
          ref={"girllist"}
          data={this.props.dataSource}
          renderItem={info => this._renderItem(info)}
          numColumns={2}
          refreshing={this.props.fetching}
          onRefresh={() => this._onRefresh(true)}
          onLoadMore={() => {
            this._onRefresh(false);
          }}
        />
        <Modal visible={this.props.viewing}>
          <View style={[globalStyles.verCenLayout,{backgroundColor: '#000'}]}>
            <PhotoView
              source={{ uri: this.props.dataSource.length>0?this.props.dataSource[this.props.viewIndex].url:'http://baidu.com' }}
              minimumZoomScale={0.5}
              maximumZoomScale={3}
              androidScaleType="center"
              onTap={ () => this.props.actions.stopViewPic() }
              onViewTap={ () => this.props.actions.stopViewPic() }
              style={{ width: getWidth(), height: getHeight() }}
            />
          </View>
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
    viewIndex: state.GirlReducer.viewIndex
  };
};

const actionsToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
};

export default connect(stateToProps, actionsToProps)(GirlPage);
