/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:48 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:55:10
 * @Email: peng8350@gmail.com 
 */

//@flow
import * as Types from "../actions/ActionType";

const initState = {
  selectedTab: 0,
  isShowAbout: false
};

export default function TabReducer(state = initState, action) {
  switch (action.type) {
    case Types.UPDATE_TAB:
      return {
        ...state,
        selectedTab: action.selectedTab
      };
    case Types.TOGGLEABOUTDLG:
      return {
        ...state,
        isShowAbout: action.data
      };

    default:
      return state;
  }
}
