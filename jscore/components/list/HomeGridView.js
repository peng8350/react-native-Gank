/*
 * @Author: Jpeng 
 * @Date: 2018-03-26 21:20:17 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-30 20:03:12
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { FlatList, StyleSheet, View, Image, Text, TouchableHighlight } from "react-native";
import { PRESSEDCOLOR } from "../../constants/colors";
import ItemSeparater from "../ItemSeparater";
import { StackNavigator } from "react-navigation";



export default class HomeGirdView extends Component {
  dataSource = [];

  componentWillMount() {
    const itemTitles = ["前端", "Android", "IOS", "App", "瞎推荐", "拓展资源"];
    const images = [
      require("../../resources/homeGrid1.png"),
      require("../../resources/homeGrid2.png"),
      require("../../resources/homeGrid3.png"),
      require("../../resources/homeGrid4.png"),
      require("../../resources/homeGrid5.png"),
      require("../../resources/homeGrid6.png")
    ];
    this._initData(itemTitles, images);
  }

  render() {
    return (
      <FlatList style={styles.container}
        ListFooterComponent={() => <ItemSeparater/>}
        ListHeaderComponent={() => <ItemSeparater/>}
        data={this.dataSource}
        numColumns={3}
        renderItem={({ item }) => this._renderGridItem(item)}
      />
    );
  }

  _initData = (itemTitles, images) => {
    for (let i = 0; i < 6; i++) {
      this.dataSource.push({
          key : i,
        title: itemTitles[i],
        img: images[i]
      });
    }
  };

  _renderGridItem(data) {
    return (
        <TouchableHighlight style={{flex:1}} underlayColor={PRESSEDCOLOR} onPress={() => {
            this.props.navigation.navigate('Gank',{GankType: data.title})
        }} >
        <View  style={styles.itemContainer}>
        <Image  style={styles.imageView} source={data.img} />

        <Text style={styles.textView}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 5,
    },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height:90,
    justifyContent: "center",
    alignItems: 'center',
  },
  imageView: {
    marginBottom: 5,
    width: 45,
    height: 45
  },
  textView: {}
});
