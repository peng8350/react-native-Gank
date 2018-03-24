/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:54:44 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-24 22:56:14
 * @Email: peng8350@gmail.com 
 */



import {thunk} from 'redux-thunk'
import {combineReducers}  from 'redux'
import TabReducer from './TabReducer'


const rootReducer = combineReducers(
    {TabReducer}
)

export default rootReducer
