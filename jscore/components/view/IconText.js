/*
 * @Author: Jpeng 
 * @Date: 2018-04-04 16:50:58 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 18:21:41
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from "react";
import { View, Text,Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../../constants/styles";
import { TEXTSMALLCOLOR } from "../../constants/colors";


/**
 * 描述: 这个控件是用来配合字体和文本并排,但是只提供左边图标右边文字的样本
 * name: 图标的名字(md-arrow-dropright)
 * text: textView的文本
 * size :图标大小
 * color: 图标颜色
 * textStyle: 字体样式
 */

const AnimatedIcon = Animated.createAnimatedComponent(Icon)
export default class IconText extends Component {
  static defaultProps = {
    color: TEXTSMALLCOLOR,
    size: 16,
    text: "文字",
    direction: "row",
    animate: false,
    textStyle: [globalStyles.smallText, { textAlign: "right", marginLeft: 2 }]
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
     return false
  }

  _renderIcon(){
    //注意,这里如果要开启动画的话,对性能肯定会造成影响
    if(this.props.animate){
      return <AnimatedIcon
          style={this.props.iconStyle}
          name={this.props.name}
          color={this.props.color}
          size={this.props.size}
        />
    }
    else{
      return <Icon
      style={this.props.iconStyle}
      name={this.props.name}
      color={this.props.color}
      size={this.props.size}
    />
    }
  }

  render() {
    
    return (
      <View
        style={[
          this.props.style,
          {
            flexDirection: this.props.direction,
            alignItems: "center"
          }
        ]}
      >
        {this._renderIcon()}
        
        <Text style={this.props.textStyle}>{" " + this.props.text}</Text>
      </View>
    );
  }
}
