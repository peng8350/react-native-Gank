/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 20:16:26 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 22:49:58
 * @Email: peng8350@gmail.com 
 */

 //@flow 
 
 import * as Types from './ActionType.js'
import { AsyncStorage } from 'react-native';
 
export function setPicPosition(position){
    return {
        type: Types.SETTING_CHANGEPOSITION,
        data:position
    }   
}

export function setAutoRefresh(refresh){
    return {
        type: Types.SETTING_CHANGEAUTOREFRESH,
        data:refresh
    }   
}

export function setNight(isNight){
    AsyncStorage.setItem('isNight')
    return {
        type: Types.SETTING_CHANGENIGHT,
        data:isNight
    }   
}

 export function changeHeight(height){
     return {
         type: Types.SETTING_CHANGEHEIGHT,
         headerHeight: height
     }
 }