/*
 * @Author: Jpeng 
 * @Date: 2018-03-30 19:22:32 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-21 12:40:34
 * @Email: peng8350@gmail.com 
 */

//@flow
import { StyleSheet } from "react-native";
import {
  TEXTNORMALCOLOR,
  TEXTSMALLCOLOR,
  THEMECOLOR,
  NIGHTBGCOLOR,
  NIGHTTHEMECOLOR,
  NIGHTNORMALTEXTCOLOR,
  BOTTTOMBGCOLOR
} from "./colors";
import { store } from "../Store";

var state;
export var globalStyles = StyleSheet.create({
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
    color: TEXTNORMALCOLOR
  },
  itemContainer: {
    backgroundColor: state ? "#fff" : BOTTTOMBGCOLOR,
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
store.subscribe(() => {
  state = store.getState();
  globalStyles = StyleSheet.create({
    navStyle: {
      backgroundColor: state.SettingReducer.isNight
        ? NIGHTTHEMECOLOR
        : THEMECOLOR
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
      color: state.SettingReducer.isNight
        ? NIGHTNORMALTEXTCOLOR
        : TEXTNORMALCOLOR
    },
    BigText: {
      fontSize: 15,
      textAlign: "center",
      color: state.SettingReducer.isNight
        ? NIGHTNORMALTEXTCOLOR
        : TEXTNORMALCOLOR
    },
    itemContainer: {
      backgroundColor: state.SettingReducer.isNight ? NIGHTBGCOLOR : "#fff",
      height: 100,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 5
    },
    horizontalLayout: {
      backgroundColor: state.SettingReducer.isNight ? NIGHTBGCOLOR : "#fff",
      flex: 1,
      flexDirection: "row",
      alignItems: "center"
    },
    verticalLayout: {
      backgroundColor: state.SettingReducer.isNight ? NIGHTBGCOLOR : "#fff",
      flex: 1,
      justifyContent: "center"
    },
    verCenLayout: {
      backgroundColor: state.SettingReducer.isNight ? NIGHTBGCOLOR : "#fff",
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  });
});
