/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 20:05:36 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 12:16:36
 * @Last Modified time: 2018-04-06 21:46:46
 */

//@flow

import React, { Component } from "react";
import { globalStyles } from "../../constants/styles";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateUtils from "../../utils/DateUtils";
import { TEXTSMALLCOLOR, PRESSEDCOLOR } from "../../constants/colors";
import Swipeout from "react-native-swipeout";
import IconText from "../view/IconText";
import { connect } from "react-redux";
import CallOnceInInterval from "../../utils/CallOnceInInterval";
import PicImage from "../view/PicImage";

export default class GankItem extends Component {
  swipeBtns = [
    {
      backgroundColor: "deeppink",
      component: this._renderSwipeBtn("ios-heart", "收藏")
    },
    {
      backgroundColor: "mediumaquamarine",
      component: this._renderSwipeBtn("ios-paper", "更多")
    }
  ];

  _renderSwipeBtn(iconName, text) {
    return (
      <View style={styles.swBtnContainer}>
        <IconText
          direction={"column"}
          name={iconName}
          size={32}
          text={text}
          color={"#fff"}
          textStyle={{ fontSize: 15, color: "#fff" }}
        />
      </View>
    );
  }

  _renderImage(){
    if(this.props.images===undefined){
      return (
        <PicImage
        style={styles.image}
        url={require("../../resources/empty.png")}
         />
      )
    }
    else{
      return   <PicImage
      style={styles.image}
      url={{uri:this.props.images[0]+'?imageView2/0/w/200'}}
      placeholder={require("../../resources/empty.png")
    }
      />
    }
  }

  render() {
    return (
      <Swipeout right={this.swipeBtns} buttonWidth={80} autoClose={true}>
        <TouchableHighlight
          underlayColor={PRESSEDCOLOR}
          onPress={() => CallOnceInInterval(this.props.onItemSelect)}
        >
          <View style={globalStyles.itemContainer}>
            <View style={styles.leftContainer}>
              {this._renderImage()}
              <Text style={[globalStyles.normalText,{flex:1}]} numberOfLines={3}>{this.props.ctn}</Text>
            </View>

            <View style={styles.rightContainer}>
              <View
                style={[
                  globalStyles.verticalLayout,
                  {
                    alignItems: "flex-end",
                    justifyContent: "space-between"
                  }
                ]}
              >
                <IconText name="ios-person-outline" text={this.props.author} />
                <IconText
                  name="ios-clock-outline"
                  text={DateUtils.parseString(
                    this.props.time,
                    "YYYY年MM月DD日"
                  )}
                />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  swBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  rightContainer: {
    width: 120
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
     width: 60, 
     height: 80 ,
     marginRight: 5,
     borderRadius: 5,
  }
});
