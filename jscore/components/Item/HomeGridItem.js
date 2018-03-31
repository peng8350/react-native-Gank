
/*
 * @Author: Jpeng 
 * @Date: 2018-03-31 10:28:30 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-31 11:07:22
 * @Email: peng8350@gmail.com 
 */
//@flow


import React, { Component } from 'react';
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';
import { PRESSEDCOLOR } from '../../constants/colors';

class  HomeGridItem extends Component {


    render() {
        return (
            <TouchableHighlight style={{flex:1}} underlayColor={PRESSEDCOLOR} onPress={() => this.props.onItemPress(this.props.title)} >
            <View  style={styles.itemContainer}>
            <Image  style={styles.imageView} source={this.props.img} />
    
            <Text style={styles.textView}>{this.props.title}</Text>
            </View>
          </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
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
      textView: {

      }
})

export default HomeGridItem;
