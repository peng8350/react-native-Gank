/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:32 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-16 22:20:50
 * @Email: peng8350@gmail.com 
 */

//@flow

import * as Types from "./ActionType";
import { TAB1_TITLE, TAB2_TITLE, TAB3_TITLE } from "../constants/strings";

export function updateTab(pos: number) {
  return {
    type: Types.UPDATE_TAB,
    selectedTab: pos
  };
}

export function toggleAboutDlg(open) {
  return {
    type: Types.TOGGLEABOUTDLG,
    data: open
  };
}
