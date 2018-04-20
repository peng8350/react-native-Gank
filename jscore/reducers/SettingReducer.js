/*
 * @Author: Jpeng 
 * @Date: 2018-04-02 20:16:52 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 11:39:41
 * @Email: peng8350@gmail.com 
 */

//@flow

import * as Types from "../actions/ActionType";
import { getDefaultDir } from "../utils/SystemUtils";

const initState = {
  headerHeight: 0,
  isNight: false,
  autoRefresh: false,
  editing: false,
  picPos: getDefaultDir()
};

export default function SettingReducer(state = initState, action) {
  switch (action.type) {
    case Types.SETTING_CHANGEHEIGHT:
      return Object.assign({}, state, {
        ...state,
        headerHeight: action.headerHeight
      });
    case Types.SETTING_CHANGEAUTOREFRESH:
      return {
        ...state,
        autoRefresh: action.data
      };
    case Types.SETTING_CHANGEPOSITION:
      return {
        ...state,
        picPos: action.data
      };
    case Types.SETTING_CHANGENIGHT:
      return Object.assign({}, state, {
        ...state,
        isNight: action.data
      });

    case Types.SETTING_EDITING:
      return {
        ...state,
        editing: action.data
      };

    default:
      return state;
  }
}
