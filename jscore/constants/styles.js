import { StyleSheet } from "react-native";
import { TEXTNORMALCOLOR, TEXTSMALLCOLOR } from "./colors";

/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 19:22:32 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 15:30:24
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
      fontSize:12,
      color: TEXTSMALLCOLOR,
  },
  normalText:{
      fontSize: 14,
      color: TEXTNORMALCOLOR,
  },
  itemContainer:{
      backgroundColor: '#fff',
      height:100,
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 5,
  },
  horizontalLayout:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLayout:{
    flex:1,
    justifyContent: 'center',
  },
  verCenLayout:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  }
});
