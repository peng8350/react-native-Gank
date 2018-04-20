/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:55:12
 * @Email: peng8350@gmail.com 
 */
//@flow

import { combineReducers } from "redux";
import MainReducer from "./MainReducer";
import GirlReducer from "./GirlReducer";
import GankReducer from "./GankReducer";
import SettingReducer from "./SettingReducer";
import HomeReducer from "./HomeReducer";

const rootReducer = combineReducers({
  MainReducer,
  GirlReducer,
  GankReducer,
  SettingReducer,
  HomeReducer
});

export default rootReducer;
