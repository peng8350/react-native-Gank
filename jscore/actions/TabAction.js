/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:32 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-24 22:56:27
 * @Email: peng8350@gmail.com 
 */

import * as Types from './ActionType'

export function updateTab(pos){
    return {
        type : Types.updateTab,
        selectedTab: pos
    }
}