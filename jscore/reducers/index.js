/**
 -----------------------------------------

 作者:
 时间: 2018/3/23 下午11:13
 邮箱: peng8350@gmail.com

 -----------------------------------------
 **/



import {thunk} from 'redux-thunk'
import {combineReducers}  from 'redux'
import homeReducer from './homeReducer'


const rootReducer = combineReducers(
    {homeReducer}
)

export default rootReducer
