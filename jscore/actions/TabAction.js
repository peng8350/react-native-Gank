/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:32 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-25 22:36:55
 * @Email: peng8350@gmail.com 
 */

//@flow

import * as Types from './ActionType'
import { TAB1_TITLE, TAB2_TITLE, TAB3_TITLE, TAB4_TITLE } from '../constants/strings';

export function updateTab(pos){
    return {
        type : Types.UPDATE_TAB,
        selectedTab: pos
    }
}