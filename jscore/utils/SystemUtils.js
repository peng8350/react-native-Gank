import { Platform } from "react-native";

/*
 * @Author: Jpeng 
 * @Date: 2018-04-06 22:21:10 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-06 22:21:56
 * @Email: peng8350@gmail.com 
 */

 //@flow

 export function isIOS(){
     return Platform.OS==='ios'
 }

 export function isAndroid(){
     return Platform.OS ==='android'
 }