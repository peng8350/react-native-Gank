/*
 * @Author: Jpeng 
 * @Date: 2018-03-27 12:58:26 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-03 17:03:16
 * @Email: peng8350@gmail.com 
 */
//@flow
import { Dimensions } from "react-native";

export function getWidth() {
  return Dimensions.get("window").width;
}

export function getHeight() {
  return Dimensions.get("window").height;
}
