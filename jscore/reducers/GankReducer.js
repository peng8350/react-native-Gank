/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 21:30:48 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-20 13:38:14
 * @Email: peng8350@gmail.com 
 */

//@flow
import * as Types from "../actions/ActionType";
const initStyles = {
  enterSearch: false,
  searching: false,
  showMore: false,
  searchList: []
};

export default function GankReducer(state = initStyles, action) {
  switch (action.type) {
      case Types.SEARCH_GANK_REQUESTING:
      return {
        ...state,
        searching : true
      }
      case Types.SEARCH_GANK_SCCUESS:
      return {
        ...state,
        searching : false,
        searchList: [].concat(action.data)
        
      }
      case Types.SEARCH_GANK_FAILED:
      return {
        ...state,
        searching: false
      }
      case Types.ENTER_SEARCH:
      return {
        ...state,
        enterSearch:true
      }
      case Types.EXIT_SEARCH:
      return {
        ...state,
        enterSearch:false,
        searchList: []
      }
      case Types.GANK_SHOWITEMMORE:
      return {
        ...state,
        showMore : action.showMore
      }

    default:
      return state;
  }
}
