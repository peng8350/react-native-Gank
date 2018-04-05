/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 17:54:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-05 20:52:24
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../constants/styles";
import GankList from "../components/list/GankList";
import { FETCHGANK_URL } from "../constants/strings";
import Icon from "react-native-vector-icons/Ionicons";
import SearchHeader from "react-native-search-header";

export default class GankActivity extends Component {
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

  _pressRight = () => {
    let bar = this.refs.searchBar;
    // if (bar.isHidden()) bar.show();
    // else bar.hide();
    bar.clear()
  };

  componentDidMount() {
    this.props.navigation.setParams({ pressRight: this._pressRight });
    this.refs.searchBar.show()
  }

  render() {
    return (
      <View style={globalStyles.verticalLayout}>
        <SearchHeader
          ref={"searchBar"}
          entryAnimation={"from-right-side"}
          placeholder={"标题/作者/日期"}
          onSearch ={ () => {alert('search')} }
          topOffset={0}
        />
        <GankList
          gankType={this.props.navigation.state.params.GankType}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
