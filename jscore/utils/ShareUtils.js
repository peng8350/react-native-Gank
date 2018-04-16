/*
 * @Author: Jpeng 
 * @Date: 2018-04-16 22:14:53 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-16 22:15:38
 * @Email: peng8350@gmail.com 
 */

 //@flow

 import React, { Component } from 'react';
import { Share } from 'react-native';

 export default class ShareUtils extends Component{
    static shareMessage() {
        Share.share(
          {
            message: "这是一个gankio的开源代码",
            url: "https://github.com/peng8350/react-native-Gank",
            title: "Gank"
          },
          {
            dialogTitle: "Share React Native website",
            excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
            tintColor: "green"
          }
        )
          .then(this.showResult)
          .catch(error => {
            alert(error);
          });
      }


  static showResult(result) {
    if (result.action === Share.sharedAction) {
      alert("已经分享");
    }
  }
 }