/*
 * @Author: Jpeng 
 * @Date: 2018-04-05 16:48:29 
 * @Last Modified by: Jpeng
 * @Last Modified time: 2018-04-05 16:51:59
 * @Email: peng8350@gmail.com 
 */

 //@flow

 let isCalled = false, timer;  
  
/** 
 * 防止点击太快造成多次mount操作,导致很多问题
 * 该方法对付react-navigation navigate操作
 * @param functionTobeCalled 被包装的方法 
 * @param interval 时间间隔，可省略，默认600毫秒 
 */  
export default function CallOnceInInterval(functionTobeCalled, interval = 600){  
    if (!isCalled) {  
        isCalled = true;  
        clearTimeout(timer);  
        timer = setTimeout(() => {  
            isCalled = false;  
        }, interval);  
        return functionTobeCalled();  
    }  
};  