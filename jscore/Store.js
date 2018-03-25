/*
 * @Author: Jpeng
 * @Date: 2018-03-24 22:55:02 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-25 00:58:29
 * @Email: peng8350@gmail.com 
 */

import {applyMiddleware,createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/index'

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore)
export const store = applyStoreMiddleware(rootReducer)