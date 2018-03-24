/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:27 
 * @Last Modified by:   Jpeng
 * @Last Modified time: 2018-03-24 22:54:27 
 * @Email: peng8350@gmail.com 
 */

//@flow

import React, { Component } from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,Image,
    View,FlatList
} from 'react-native';
import SettingPage from "./pagers/SettingPage";
import TabNavigator from 'react-native-tab-navigator';
import HomePage from "./pagers/HomePage";
import ReadPage from "./pagers/ReadPage";
import GirlPage from "./pagers/GirlPage";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../actions/TabAction'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



class MainActivity extends Component {
    static navigationOptions = {
        headerTitle: 'Home',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
      super(props);
       
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
              
                selected={this.props.selectedTab === index }
                title={title}
                renderIcon={() => normalIcon}
                renderSelectedIcon={() => selectedIcon}
                onPress={() => this.props.actions.updateTab(index)}
            >{page}</TabNavigator.Item>
        )
    }

    renderTabIcon(path){
        return (
            <Image source={path} style={styles.tabIcon}/>
        )
    }
}

const stateToprops= (state) => {
    return {
        selectedTab: state.TabReducer.selectedTab
    }
}

const actionsToProps = (dispatch) => {
    return{
        actions: bindActionCreators(Actions,dispatch)
    }
}


export default connect(stateToprops,actionsToProps)(MainActivity)



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








































