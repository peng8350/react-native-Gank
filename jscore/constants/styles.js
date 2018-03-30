import { StyleSheet } from "react-native";
import { TEXTNORMALCOLOR, TEXTSMALLCOLOR } from "./colors";

/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 19:22:32 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-03-30 20:51:51
 * @Email: peng8350@gmail.com 
 */

//@flow

export const globalStyles = StyleSheet.create({
  navStyle: {
    backgroundColor: "#2fa3e4"
  },
  navTitle: {
    fontWeight: "bold"
  },
  smallText:{
      fontSize:14,
      color: TEXTSMALLCOLOR
  },
  normalText:{
      fontSize: 15,
      color: TEXTNORMALCOLOR,
  },
  itemContainer:{
      backgroundColor: '#fff',
      height:100,
      flex:1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5,
  },
  horizontalLayout:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  verticalLayout:{
    flex:1,
    alignItems: 'center',
  }
});
