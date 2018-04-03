/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 20:16:52 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 17:32:02
 * @Email: peng8350@gmail.com 
 */

 //@flow

 import * as Tpyes from '../actions/ActionType'

const initState = {
    headerHeight: 0
}

 export default function SettingReducer(state=initState,actions){
     switch(actions.type){
         case Tpyes.SETTING_CHANGEHEIGHT:
         return {
             ...state,
             headerHeight:actions.headerHeight
         }
         default:
         return state;
     }
 }