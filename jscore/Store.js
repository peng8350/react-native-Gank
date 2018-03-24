/**
 -----------------------------------------

 作者:
 时间: 2018/3/23 下午11:34
 邮箱: peng8350@gmail.com

 -----------------------------------------
 **/


import {applyMiddleware,createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/index'

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore)
export const store = applyStoreMiddleware(rootReducer)