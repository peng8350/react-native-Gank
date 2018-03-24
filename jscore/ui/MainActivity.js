/**
 -----------------------------------------

 作者:
 时间: 2018/3/23 上午12:33
 邮箱: peng8350@gmail.com

 -----------------------------------------

**/

// @flow

import React, { Component } from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class MainActivity extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>主界面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});








































