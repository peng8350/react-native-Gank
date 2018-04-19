/*
 * @Author: Jpeng 
 * @Date: 2018-04-06 22:21:10 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-19 22:54:37
 * @Email: peng8350@gmail.com 
 */

import React from "react";
import { Platform, CameraRoll } from "react-native";
import RNFS from "react-native-fs";
//@flow

export function isIOS() {
  return Platform.OS === "ios";
}

export function isAndroid() {
  return Platform.OS === "android";
}

export function getDefaultDir() {
  let dirs =
    Platform.OS === "ios"
      ? RNFS.LibraryDirectoryPath
      : RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
  return (downloadDest = `${dirs}/`);
}

export function downPic(uri, path) {
  if (!uri) return null;
  return new Promise((resolve, reject) => {
    const formUrl = uri;
    const options = {
      fromUrl: formUrl,
      toFile:
        (path ? path : downloadDest) + `${(Math.random() * 10000000) | 0}.jpg`,
      background: true,
      begin: res => {
        console.log("begin", res);
        console.log("contentLength:", res.contentLength / 1024 / 1024, "M");
      }
    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise
        .then(res => {
          var promise = CameraRoll.saveToCameraRoll(downloadDest);

          promise
            .then(function(result) {
              alert("保存成功");
            })
            .catch(function(error) {
              alert("保存失败！\n" + error);
            });
          resolve(res);
        })
        .catch(err => {
          reject(new Error(err));
        });
    } catch (e) {
      reject(new Error(e));
    }
  });
}
