/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 17:29:35
 * @Email: peng8350@gmail.com 
 */
//@flow

import {combineReducers}  from 'redux'
import TabReducer from './TabReducer'
import GirlReducer from './GirlReducer';
import GankReducer from './GankReducer'
import SettingReducer from './SettingReducer'

const rootReducer = combineReducers(
    {TabReducer,GirlReducer,GankReducer,SettingReducer}
)

export default rootReducer
