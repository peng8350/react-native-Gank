/**
 -----------------------------------------

 作者:
 时间: 2018/3/24 下午12:21
 邮箱: peng8350@gmail.com

 -----------------------------------------
 **/
 
import * as Types from '../actions/ActionType'

const initState= {
    selectedTab: 0
}

export default function homeReducer(state=initState,action)
{
    switch (action.type){
        case Types.updateTab:
            return {
                ...state,
                selectedTab: action.selectedTab
            }
            break;

        default:
            return state;
            break;

    }
}