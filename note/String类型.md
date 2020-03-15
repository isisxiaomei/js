[toc]
# 1 概述
+ ***概念***：String对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象
```js
// 示例1：
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 // "string"
typeof s2 // "object"
```
+ 字符串类似数组
```js
new String('abc')   // String {0: "a", 1: "b", 2: "c", length: 3}
(new String('abc'))[1] // "b"
```
+ String用法
    - `new String` 用作构造函数返回字符串对象
    - String对象可以当作工具方法使用，将任意类型的值转为普通字符串(不是字符串对象)。
```js
// 示例1：
String(true) // "true"
String(5) // "5"
```
# 2 静态方法
## 2.1 String.fromCharCode()
+ String.fromCharCode()：参数是一个或多个数值【数值是asicma】，返回值是这些`asicma`组成的字符串
+ **注意点**：该方法不支持 Unicode 码点大于0xFFFF的字符
```js
// 示例1：
String.fromCharCode() // ""
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111)    // "hello"
```
# 3 实例属性
## 3.1 String.prototype.length
+ length属性： 返回字符串的长度。
```js
'abc'.length // 3
```
# 4 实例方法
## 4.1 String.prototype.charAt()
+ charAt方法返回指定位置的字符，参数是从0开始编号的位置
    - 参数不满足条件 charAt返回空字符串
```js
// 示例1：
var s = new String('abc');
s.charAt(1) // "b"
s.charAt(s.length - 1) // "c"

'abc'.charAt(-1) // ""
```
## 4.2 String.prototype.charCodeAt()
+ charCodeAt方法返回字符串指定位置的 ascima；相当于String.fromCharCode()的逆操作。
+ 如果没有任何参数，charCodeAt返回首字符的 Unicode 码点
+ 如果参数为负数，或大于等于字符串的长度，charCodeAt返回NaN
```js
// 示例1：
'abc'.charCodeAt(1) // 98
'abc'.charCodeAt() // 97
'abc'.charCodeAt(-1) // NaN
```
## 4.3 String.prototype.concat()
+ concat方法用于连接字符串，返回一个新字符串，不改变原字符串；接受多个参数
+ 如果参数不是字符串，concat方法会将其先转为字符串，然后再连接
```js
// 示例1：
var s1 = 'abc';
var s2 = 'def';

s1.concat(s2) // "abcdef"
s1 // "abc"
```
```js
// 示例2：
var one = 1;
var two = 2;
var three = '3';
''.concat(one, two, three) // "123"
one + two + three // "33"
```
## 4.4 String.prototype.slice()
+ `slice`: 用于取出子字符串并返回，不改变原字符串。第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）
+ 注意点：
    - 省略第二个参数，则表示子字符串一直到原字符串结束
    - 参数是负值，表示从结尾开始倒数计算的位置，即该 负值+字符串长度 的结果为下标
    - 第一个参数大于第二个参数，slice方法返回一个空字符串
```js
// 示例1：
'JavaScript'.slice(0, 4) // "Java"
'JavaScript'.slice(4) // "Script"

// 示例2：
'JavaScript'.slice(-6) // "Script"
'JavaScript'.slice(0, -6) // "Java"

// 示例3：
'JavaScript'.slice(2, 1) // ""
```
## 4.5 String.prototype.substring()
+ `substring`: 方法用于从原字符串取出子字符串并返回，不改变原字符串；参数开始结束下标 [m,n)【不建议使用】
+ 注意点：
    - 第一个参数大于第二个参数，substring方法会自动更换两个参数的位置
    - 参数是负数，substring方法会自动将负数转为0
```js
// 示例1：
'JavaScript'.substring(0, 4) // "Java"
'JavaScript'.substring(4) // "Script"

// 示例2：
'JavaScript'.substring(10, 4) // "Script"
// 等同于
'JavaScript'.substring(4, 10) // "Script"


// 示例3：
'JavaScript'.substring(-3) // "JavaScript"
'JavaScript'.substring(4, -3) // "Java"
```
## 4.6 String.prototype.substr()
+ `substr()`: 用于从原字符串取出子字符串并返回，不改变原字符串
    - 第一个参数是子字符串的开始位置，第二个参数是子字符串的长度
+ 注意点：
    - 省略第二个参数，则表示子字符串一直到原字符串的结束
    - 第一个参数是负数，表示倒数计算的字符位置
    - 第二个参数是负数，将被自动转为0，因此会返回空字符串
```js
// 示例1：
'JavaScript'.substr(4, 6) // "Script"
'JavaScript'.substr(4) // "Script"


// 示例2：
'JavaScript'.substr(-6) // "Script"
'JavaScript'.substr(4, -1) // ""
```
## 4.7 String.prototype.indexOf() & String.prototype.lastIndexOf()
+ `indexOf`: 查找子串第一次出现的位置，不匹配返回`-1`
    - indexOf：接受第二个参数，表示从该位置开始向后匹配
+ `lastIndexOf`: 区别是lastIndexOf从尾部开始匹配，indexOf则是从头部开始匹配
    - lastIndexOf：第二个参数表示从该位置起向前匹配
```js
// 示例1：
'hello world'.indexOf('o') // 4
'JavaScript'.indexOf('script') // -1
'hello world'.indexOf('o', 6) // 7

// 示例2：
'hello world'.lastIndexOf('o') // 7
'hello world'.lastIndexOf('o', 6) // 4   从6下标起 向前匹配
```
## 4.8 String.prototype.trim()
+ `trim`：用于去除字符串两端的`空格(\t、\v、\n、\r)`，返回一个新字符串，不改变原字符串
```js
// 示例1：
'  hello world  '.trim()    // "hello world"
'\r\nabc \t'.trim() // 'abc'
```
## 4.9 String.prototype.toLowerCase() & String.prototype.toUpperCase()
+ 转为大小写，都返回一个新字符串，不改变原字符串
```js
// 示例1：
'Hello World'.toLowerCase() // "hello world"
'Hello World'.toUpperCase() // "HELLO WORLD"
```
## 4.10 String.prototype.match()
+ `match`: 用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null【备注：匹配可用正则】
+ **注意点**：
    - 如果正则表达式带有g修饰符，则该方法与正则对象的exec方法行为不同，会一次性返回所有匹配成功的结果【exec：带g是返回第一次匹配到的，然后接着调接着匹配】
    - 设置正则表达式的lastIndex属性，对match方法无效，匹配总是从字符串的第一个字符开始
    - 返回的数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串
```js
// 示例1：
'cat, bat, sat, fat'.match('at') // ["at"]
'cat, bat, sat, fat'.match('xt') // null

// 示例2：
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

s.match(r1) // ["x"]
s.match(r2) // null


// 示例3：
var s = 'abba';
var r = /a/g;

s.match(r) // ["a", "a"]
r.exec(s) // ["a"]

// 示例4：
var matches = 'cat, bat, sat, fat'.match('at');
matches.index // 1
matches.input // "cat, bat, sat, fat"
```
## 4.11 String.prototype.search() & String.prototype.replace()
+ `search`： 返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回-1
```js
// 示例1：
'_x_x'.search(/x/)  // 1
```
+ `replace`: 替换匹配到的值；接受两个参数，一个是正则，一个是替换的内容
    - 加g修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值
```js
// 示例1：
'aaa'.replace('a', 'b') // "baa"
'aaa'.replace(/a/, 'b') // "baa"
'aaa'.replace(/a/g, 'b') // "bbb"

// 示例2：消除空格
var str = '  #id div.class  ';
str.replace(/^\s+|\s+$/g, '')   // "#id div.class"
```
+ replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容
```js
$&：匹配的子字符串。
$`：匹配结果前面的文本。
$'：匹配结果后面的文本。
$n：匹配成功的第n组内容，n是从1开始的自然数。
$$：指代美元符号$。
```
```js
// 示例1：
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1')  // "world hello"
'abc'.replace('b', '[$`-$&-$\']')   // "a[a-b-c]c"
```
+ replace方法的第二个参数的替换函数，可以接受多个参数
    - 替换函数的第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配
```js
// 示例1：
'3 and 5'.replace(/[0-9]+/g, function (match) {
  return 2 * match;
})      // "6 and 10"

// 示例2：
var template = '<span id="p1"></span>'
  + '<span id="p2"></span>'
  + '<span id="p3"></span>';

template.replace(
  /(<span id=")(.*?)(">)(<\/span>)/g,
  function(match, $1, $2, $3, $4){
    return $1 + $2 + $3 + prices[$2] + $4;
  }
);
```
## 4.12 String.prototype.split()
+ split： 按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组
    - `str.split(separator, [limit])`: 第二个参数限定返回数组的成员的个数
```js
// 示例1：
'a|b|c'.split('|') // ["a", "b", "c"]

// 示例2：指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2)       //[ 'a', 'b' ]
```
+ ***注意点***：
    - 如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。
    - 如果省略参数，则返回数组的唯一成员就是原字符串。
    - 满足分割规则的两个部分紧邻着，返回数组之中会有一个空字符串【示例3】
    - 满足分割规则的部分处于字符串的开头或结尾，返回数组的第一个或最后一个成员是一个空字符串【示例4】
```js
// 示例1：
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]

// 示例2：
'a|b|c'.split() // ["a|b|c"]

// 示例3：
'a||c'.split('|') // ['a', '', 'c']

// 示例4：
'|b|c'.split('|') // ["", "b", "c"]
'a|b|'.split('|') // ["a", "b", ""]
```
## 4.13 String.prototype.localeCompare()
+ `localeCompare`: 用于比较两个字符串,返回整数 大于0 小于0 0
    - localeCompare可接受第二个参数，指定比较所使用的的语言
```js
// 示例1：
'apple'.localeCompare('banana') // -1

// 示例2：  de表示德语，sv表示瑞典语
'ä'.localeCompare('z', 'de') // -1
'ä'.localeCompare('z', 'sv') // 1
```