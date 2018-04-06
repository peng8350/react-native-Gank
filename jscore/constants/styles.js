/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 19:22:32 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-06 20:18:30
 * @Email: peng8350@gmail.com 
 */

//@flow
import { StyleSheet } from "react-native";
import { TEXTNORMALCOLOR, TEXTSMALLCOLOR, THEMECOLOR } from "./colors";

export const globalStyles = StyleSheet.create({
  navStyle: {
    backgroundColor: THEMECOLOR
  },
  navTitle: {
    fontWeight: "bold"
  },
  smallText: {
    fontSize: 10,
    color: TEXTSMALLCOLOR
  },
  normalText: {
    fontSize: 12,
    color: TEXTNORMALCOLOR
  },
  BigText: {
    fontSize: 15,
    textAlign:'center',
    color: TEXTNORMALCOLOR
  },
  itemContainer: {
    backgroundColor: "#fff",
    height: 100,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  horizontalLayout: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  verticalLayout: {
    flex: 1,
    justifyContent: "center"
  },
  verCenLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
