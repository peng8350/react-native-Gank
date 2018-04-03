/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 20:16:26 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 17:24:22
 * @Email: peng8350@gmail.com 
 */

 //@flow 
 
 import * as Types from './ActionType.js'
 
 export function changeHeight(height){
     return {
         type: Types.SETTING_CHANGEHEIGHT,
         headerHeight: height
     }
 }