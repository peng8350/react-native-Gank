# Gank
这是一个本人作为练习React Native的第一个项目,干货集中营,入门15天的第一个项目,开发时间:1个月

## Screenshoots
Android:<br>
![](/art/android1.gif)
<br>
Ios:<br>
![](/art/ios1.gif)
<br>
Android:<br>
![](/art/android2.gif)
Ios:
<br>
![](/art/ios2.gif)
<br>
Android:<br>
![](/art/android3.gif)
Ios:<br>
![](/art/ios3.gif)
<br>

## Third party
* [Realm](https://github.com/realm/realm-js)
* [Redux](https://github.com/reactjs/redux)
* [react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)
* [react-navigation](https://github.com/react-navigation/react-navigation)
* [react-native-actionsheet](https://github.com/beefe/react-native-actionsheet)
* [react-native-fs](https://github.com/itinance/react-native-fs)
* [react-native-photo-view](https://github.com/alwx/react-native-photo-view)
* [react-native-swipeout](https://github.com/dancormier/react-native-swipeout)
* [react-native-tab-navigator](https://github.com/happypancake/react-native-tab-navigator)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [react-native-search-header](https://github.com/tuantle/react-native-search-header)


## 目前存在的问题

* 搜索栏想要清除文本的文字,无法清除,搜索栏是调用别人的组件的，原作者说是官方的bug
* 无论是Android还是ios,只要你加上gif后,加载大量gif的同时,ui会卡顿4-10秒左右,但我又不知道怎么把ios上的gif动态效果给去掉,使用的是image,默认就是有gif的效果,官方文档没有说明如何禁止gif
* scrollable-tab-view这个存在一个bug,就是用到滑动的tab的时候,组件刚初始化的时候tab的指标没有显示,点击一下或者滑动一下界面的就显示了
* ios平台:跳转或者后退页面会造成两次componentdidmount或者willmount触发两次以上回调,这个问题我严重怀疑是react-navigation的bug,这个问题在它issue里很多人都提问过,尽管我尝试更新到最新版的react-navigation还是有这个问题,触发两次的回调会严重影响性能,所以跳转或者移除GankActivity这个页面时,性能严重下滑,估计就是和这个bug有关
* navigationOptions想要传入一些状态的时候,很棘手,官方提供的一种方法就是this.props.navigation.setParams({})传入一个对象来获取当前组件的状态,可以是可以,但是有个致命的问题就是,无论我在willmount还是didmount调用这个方法,事实上还是需要一定时间才能把参数传进去(- -!意思是说回调willmount或didmount都要时间上的延迟),我有一个onPressRight的方法,然后通过setParams()传入navigationOptions改变它的状态,但万一用户点击页面后快速点击右边的呢?这时,我状态还没来得及传进去就GG了。说了那么多,其实我想表达的就是setParams把组件里的状态传到导航的这种方法,有一个时间上的延迟问题,不能达到立马改变。其实这个问题也是一个大众都会问到的一个问题
* flatlist滑动太快的时候,item渲染空白?

## 感想
* 刚开始说实在的,并不知道redux有什么用啊,然后参考别人的写着写着之后,才明白这是一个提供给我们给多个组件共享一个组件状态的库,试想下,如果多个组件引用一个组件,这会不会导致代码不断传参传参呢?
* 我用过realm这个数据库后,下次我要考虑要不要继续用这个好?因为这个有个极大的坑爹地方,最新版本开调试后subscrition is not defined?下降版本没有这个问题,另外,如果你删除了node_modules后重新安装,然后run-ios,你会发现你卡住了,一直downloading realm-sync-......无法下载,估计就是被墙了，每次都要卡那么几个小时,无语...开shadowsocks翻墙也是无解。
* 性能还是比原生差很多很多的,如果flatlist要加载超大量的数据的话就直接gg了,所以用react native写app最蛋疼的就是性能上的问题了！

## 感谢
感谢@代码家提供的数据

## LICENSE
```
    MIT License

    Copyright (c) 2018 Jpeng

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
```