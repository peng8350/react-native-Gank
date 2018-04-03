/*
 * @Author: Jpeng 
 * @Date: 2018-03-26 21:20:17 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 19:47:48
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
} from "react-native";
import ItemSeparater from "../other/ItemSeparater";
import { StackNavigator } from "react-navigation";
import HomeGridItem from "../Item/HomeGridItem";

export default class HomeGirdView extends Component {
  dataSource = [];

  componentWillMount() {
    const itemTitles = ["前端", "Android", "IOS", "App", "瞎推荐", "拓展资源"];
    const images = [
      {
        iconName: 'ios-globe',
        bgColor: '#f1c410',
        iconType: 'Ionicons'
      },
      {
        iconName: 'logo-android',
        bgColor: '#19bc9c',
        iconType: 'Ionicons'
      },
      {
        iconName: 'logo-apple',
        bgColor: '#bdc3c7',
        iconType: 'Ionicons'
      },
      {
        iconName: 'mobile-phone',
        bgColor: '#e67e22',
        iconType: 'FontAwesome'
      },
      {
        iconName: 'ios-magnet',
        bgColor: '#b493c8',
        iconType: 'Ionicons'
      },
      {
        iconName: 'ios-briefcase',
        bgColor: '#1e527e',
        iconType: 'Ionicons'
      },
    ];
    this._initData(itemTitles, images);
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        ListFooterComponent={() => <ItemSeparater />}
        ListHeaderComponent={() => <ItemSeparater />}
        data={this.dataSource}
        numColumns={3}
        renderItem={({ item }) => this._renderGridItem(item)}
      />
    );
  }

  _initData = (itemTitles, images) => {
    for (let i = 0; i < 6; i++) {
      this.dataSource.push({
        key: i,
        title: itemTitles[i],
        img: images[i].iconName,
        bgColor: images[i].bgColor,
        iconType: images[i].iconType
      });
    }
  };

  _onItemPress = (title) => {
      this.props.navigation.navigate("Gank", { GankType: title });
  }

  _renderGridItem(data) {
    return (
      <HomeGridItem
        onItemPress={this._onItemPress}
        img={data.img}
        title={data.title}
        bgColor={data.bgColor}
        iconType= {data.iconType}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5
  }
});
