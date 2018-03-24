/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:48 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-24 22:56:16
 * @Email: peng8350@gmail.com 
 */
 
import * as Types from '../actions/ActionType'

const initState= {
    selectedTab: 0
}

export default function TabReducer(state=initState,action)
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