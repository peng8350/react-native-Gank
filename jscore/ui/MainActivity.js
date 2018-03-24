/**
 -----------------------------------------

 作者:
 时间: 2018/3/23 上午12:33
 邮箱: peng8350@gmail.com

 -----------------------------------------

**/

import React, { Component } from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,Image,
    View
} from 'react-native';
import SettingPage from "./pagers/SettingPage";
import TabNavigator from 'react-native-tab-navigator';
import HomePage from "./pagers/HomePage";
import ReadPage from "./pagers/ReadPage";
import GirlPage from "./pagers/GirlPage";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class MainActivity extends Component<Props> {
    static navigationOptions = {
        headerTitle: 'Home',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
      super(props);
      this.state = {
          selectedTab :0
      };
    }



    render() {
        return (
            <View style={styles.container}>
                {this.renderTabBar()}
            </View>
        );
    }


    renderTabBar()
    {
        return (
            <TabNavigator>
                {this.renderTabBarItem(0,'首页',this.renderTabIcon(require('../resources/tab1_normal.png'))
                    ,this.renderTabIcon(require('../resources/tab1_selected.png')),(<HomePage/>))}
                {this.renderTabBarItem(1,'待定',this.renderTabIcon(require('../resources/tab2_normal.png'))
                    ,this.renderTabIcon(require('../resources/tab2_selected.png')),(<ReadPage/>))}
                {this.renderTabBarItem(2,'福利',this.renderTabIcon(require('../resources/tab3_normal.png'))
                    ,this.renderTabIcon(require('../resources/tab3_selected.png')),<GirlPage/>)}
                {this.renderTabBarItem(3,'首页',this.renderTabIcon(require('../resources/tab4_normal.png'))
                    ,this.renderTabIcon(require('../resources/tab4_selected.png')),<SettingPage/>)}
            </TabNavigator>
        )
    }


    renderTabBarItem(index,title,normalIcon,selectedIcon,page)
    {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === index }
                title={title}
                renderIcon={() => normalIcon}
                renderSelectedIcon={() => selectedIcon}
                onPress={() => this.setState({selectedTab: index})}
            >{page}</TabNavigator.Item>
        )
    }

    renderTabIcon(path){
        return (
            <Image source={path} style={styles.tabIcon}/>
        )
    }
}




const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    tabBar:{

        height: 45
    },
    tabIcon:{
      width:24,
        height:24
    }
});








































