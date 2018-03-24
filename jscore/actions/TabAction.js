/**
 -----------------------------------------

 作者:
 时间: 2018/3/24 下午12:30
 邮箱: peng8350@gmail.com

 -----------------------------------------
 **/

import * as Types from './ActionType'

export function updateTab(pos){
    return {
        type : Types.updateTab,
        selectedTab: pos
    }
}