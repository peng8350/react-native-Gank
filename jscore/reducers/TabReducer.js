/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:48 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-27 20:19:48
 * @Email: peng8350@gmail.com 
 */

 //@flow
import * as Types from '../actions/ActionType'
import { TAB1_TITLE } from '../constants/strings';

const initState= {
    selectedTab: 0,
}

export default function TabReducer(state =initState,action)
{
    switch (action.type){
        case Types.UPDATE_TAB:
            return {
                ...state,
                selectedTab: action.selectedTab
            }

        default:
            return state;

    }
}