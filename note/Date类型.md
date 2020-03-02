# 1. 简介
+ Date对象是JavaScript 原生的时间库。它以国际标准时间（UTC）1970年1月1日00:00:00作为时间的零点
+ 单位：毫秒
# 2 普通函数用法
+ `Date()`： 可以作为普通函数直接调用，无论有无参数都返回一个代表当前时间的字符串
```js
// 示例1:
Date()              // "Tue Dec 17 2019 16:44:11 GMT+0800 (中国标准时间)"
Date(2000, 1, 1)    // "Tue Dec 17 2019 16:44:11 GMT+0800 (中国标准时间)"
```
# 3 构造函数用法
+ 如果不加参数，返回的实例就是当前时间字符串【求值：date默认调用toString()，而不是valueOf()】
```js
// 示例1：
var today = new Date();
today                   // "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"
// 等同于
today.toString()        // "Tue Dec 01 2015 09:34:43 GMT+0800 (CST)"
```
+ 构造函数参数： 作为构造函数时，Date对象可以接受多种格式的参数，返回一个该参数对应的时间实
```js
// 示例1：
// 参数为时间零点开始计算的毫秒数
new Date(1378218728000)         // Tue Sep 03 2013 22:32:08 GMT+0800 (CST)

// 参数为日期字符串
new Date('January 6 2013');     // Sun Jan 06 2013 00:00:00 GMT+0800 (CST)
new Date('9 January 2013');

// 代表年、月、日、时、分、秒、毫秒
new Date(2013, 0, 1, 0, 0, 0, 0)        // Tue Jan 01 2013 00:00:00 GMT+0800 (CST)
```
+ **参数注意点**:
    - 第一点，参数可以是负整数，代表1970年元旦之前的时间
    - 第二点，只要是能被`Date.parse()`方法解析的字符串，都可以当作参数
    - 第三点，参数为年、月、日等多个整数时，年和月是不能省略的【只写年会被当做毫秒处理】
    
```js
// 示例1：以下都能被Date.parse()解析
new Date('2013-2-15')
new Date('2013/2/15')
new Date('02/15/2013')
new Date('2013-FEB-15')
new Date('FEB, 15, 2013')
new Date('FEB 15, 2013')
new Date('February, 15, 2013')
new Date('February 15, 2013')
new Date('15 Feb 2013')
new Date('15, February, 2013')
// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
```
+ ***参数范围***：
    - 参数超出正常范围，会被自动折算【比如：如果月设为13 表示2月】
    - 日期设为0，就代表上个月的最后一天
    - 参数还可以使用负数，表示从基准日扣去相应的时间
```js
// 参数取值范围
【年】：使用四位数年份，比如2000。如果写成两位数或个位数，则加上1900，即10代表1910年。如果是负数，表示公元前。
【月】：【0-11】
【日】：【1-31】
【时】：0到23。
【分】：0到59。
【秒】：0到59
【毫秒】：0到999。
```
```js
// 示例1：
new Date(2013, 0, 0)    // Mon Dec 31 2012 00:00:00 GMT+0800 (CST)

// 示例2：
new Date(2013, 0, -1)   // Sun Dec 30 2012 00:00:00 GMT+0800 (CST)
```
# 4 日期运算
+ **日期运算**: 两个日期实例对象进行`减法运算`时，返回的是它们间隔的`毫秒数`；进行`加法运算`时，返回的是两个`字符串连接而成的新字符串`
```js
// 示例1：
var d1 = new Date(2000, 2, 1);
var d2 = new Date(2000, 3, 1);

d2 - d1     // 2678400000
d2 + d1     // "Sat Apr 01 2000 00:00:00 GMT+0800 (CST)Wed Mar 01 2000 00:00:00 GMT+0800 (CST)"
```
# 5 静态方法
## 5.1 Date.now()
+ `Date.now()`: 返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数
```js
// 示例1：
Date.now() // 1364026285194
```
## 5.2 Date.parse()
+ `Date.parse()`: 用来解析日期字符串，返回该时间距离时间零点的毫秒数【解析失败：返回NaN】
+ 标准格式：YYYY-MM-DDTHH:mm:ss.sssZ【z表示时区】
```js
// 示例1：
Date.parse('Aug 9, 1995')
Date.parse('January 26, 2011 13:51:50')
Date.parse('Mon, 25 Dec 1995 13:30:00 GMT')
Date.parse('Mon, 25 Dec 1995 13:30:00 +0430')
Date.parse('2011-10-10')
Date.parse('2011-10-10T14:48:00')
Date.parse('xxx') // NaN
```
## 5.3 Date.UTC()
+ `Date.UTC`: 接受年、月、日等变量作为参数，返回该时间距离时间零点.
    - 区别：作用同Date构造函数一样，区别在于`Date.UTC方法的参数，会被解释为 UTC 时间（世界标准时间），Date构造函数的参数会被解释为当前时区的时间`
```js
// 示例1：
Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])    // 格式
Date.UTC(2011, 0, 1, 2, 3, 4, 567)  // 1293847384567

```
# 6 实例方法
## 6.1 Date.prototype.valueOf()
+ `valueOf()`: 返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数，该方法等同于getTime方法
```js
// 示例1：
var d = new Date();
d.valueOf() // 1362790014817
d.getTime() // 1362790014817
```
## 6.2 to 类方法
+ `Date.prototype.toString()`: 返回一个完整的日期字符串
+ `Date.prototype.toUTCString()`: 返回对应的 UTC 时间，也就是比北京时间晚8个小时
+ `Date.prototype.toISOString()`: 返回对应时间的 ISO8601 写法。
+ `Date.prototype.toJSON()`: 返回一个符合 JSON 格式的 ISO 日期字符串，与toISOString方法的返回结果完全相同。
+ `Date.prototype.toDateString()`: 返回日期字符串（不含小时、分和秒）
+ `Date.prototype.toTimeString()`: 返回时间字符串（不含年月日）
```js
// 示例1：
var d = new Date(2013, 0, 1);
d               // "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"
d.toString()    // "Tue Jan 01 2013 00:00:00 GMT+0800 (CST)"

d.toJSON()          // "2012-12-31T16:00:00.000Z"
d.toISOString()     // "2012-12-31T16:00:00.000Z"
d.toUTCString()     // "Mon, 31 Dec 2012 16:00:00 GMT"
d.toDateString()     // "Tue Jan 01 2013"
var d = new Date(2013, 0, 1);
d.toTimeString()    // "00:00:00 GMT+0800 (CST)"
```
## 6.3 get 类方法

## 6.4 set 类方法

