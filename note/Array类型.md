# 1 Array基本概念
+ 数组中的每一项可以保存任何数据类型
+ 数组的大小是可以动态调整，可以随着数据的添加自动增长
+ 备注：区分静态方法和实例方法是没有实例的时候可以通过`Array.prototype.实例方法`的形式调用
# 2 数组创建方式
+ 两种创建方式：
    - 一种是通过`new Array()`构造函数;
    - 另一种数组字面量表示法
+ 备注：同对象一样，通过数组字面量表示法是不会调用Array构造函数
```js
// 方式1：
var arrs = new Array();
var arrs = new Array(20);   // 注意这里20表示开辟数组长度为20
var arrs = new Array("red");// 表示数组的第一项是red

// 方式2:
var arrs = ["red", 1];
```
# 3 数组长度
+ 数组的长度属性不是只读的；因此通过设置length，可以从数组的末尾移除项或者添加新项
+ 未初始化的项值都为undefined，或者越界访问到不存在的项值都是undefined
```js
// 示例1:
var arrs = [1,2];
arrs.length = 4;
arrs[2]     // 此时数组的长度为4，第三项没有放值所以是undefine
```

# 4 静态方法
+ `Array.isArray(value)`: 判断value是不是数组
```js
var arr = [1, 2, 3];
typeof arr // "object"
Array.isArray(arr) // true
```
# 5 实例方法

## 5.1 转换方法
+ `arr.toLocaleString()`：数组的toLocaleString方法返回数组每个值与逗号拼接的字符串形式
+ `arr.valueOf()`: 数组的valueOf方法返回数组本身
+ `arr.toString()`: 数组的toString方法返回数组每个值与逗号拼接的字符串形式
+ 备注：toLocaleString和toString区别是toLocaleString获取数组项的时候是针对每个数组项调用toLocaleString; toString获取数组项的时候是针对每个数组项调用toString.
```js
// 示例1：
var arr = [1, 2, 3];
arr.valueOf() // [1, 2, 3]

// 示例2：
var arr = [1, 2, 3];
arr.toString() // "1,2,3"

// 示例3：
var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // "1,2,3,4,5,6"
```
## 5.2 栈方法
+ `push()`: 用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组
+ `pop()`: 用于在数组的末端删除一个元素，并返回删除的元素。注意，该方法会改变原数组
+ 注意：对空数组使用pop方法，不会报错，而是返回undefined
```js
// 示例1：
arr.push(1) // 1
arr.push('a') // 2
arr.push(true, {}) // 4
arr // [1, 'a', true, {}]

// 示例2：
var arr = ['a', 'b', 'c'];
arr.pop() // 'c'
arr // ['a', 'b']

// 示例3：
[].pop() // undefined
```
## 5.3 队列方法
+ `shift()`: 用于删除数组的第一个元素，并返回该元素;该方法会改变原数组。
+ `unshift()`: 用于在数组的第一个位置添加元素, 并返回添加新元素后的数组长度。注意，该方法会改变原数组
```js
// 示例1：
var a = ['a', 'b', 'c'];
a.shift() // 'a'
a // ['b', 'c']

// 示例2：
var a = ['a', 'b', 'c'];
a.unshift('x'); // 4
a       // ['x', 'a', 'b', 'c']

// 示例3：
var arr = [ 'c', 'd' ];
arr.unshift('a', 'b') // 4
arr // [ 'a', 'b', 'c', 'd' ]
```



## 5.4 join()
+ `join()`: 以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔
+ 注意：如果数组成员是undefined或null或空位，会被转成空字符串
```js
// 示例1：
var a = [1, 2, 3, 4];
a.join(' ') // '1 2 3 4'
a.join() // "1,2,3,4"

// 示例2：
[undefined, null].join('#') // '#'
['a',, 'b'].join('-') // 'a--b'
```
## 5.5 concat()
+ `concat`: 用于多个数组的合并; 它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变
+ 注意：
    - 除了数组作为参数，concat也接受其他类型的值作为参数，添加到目标数组尾部
    - 如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝,或者说引用
```js
// 示例1：
['hello'].concat(['world'])     // ["hello", "world"]

['hello'].concat(['world'], ['!'])  // ["hello", "world", "!"]

[2].concat({a: 1}, {b: 2})   // [2, { a: 1 }, { b: 2 }]

// 示例2：对象的浅拷贝，改变源对象，新数组的值也发生变化
var oldArray = [{ a: 1 }];
var newArray = oldArray.concat();
oldArray[0].a = 2;
newArray[0].a // 2
```
## 5.6 reverse()
+ `reverse()`: 反转数组元素；该方法将改变原数组。
```js
// 示例1：
var a = ['a', 'b', 'c'];
a.reverse() // ["c", "b", "a"]
a           // ["c", "b", "a"]
```

## 5.7 slice()
+ `slice()`: 用于提取目标数组的一部分，`返回一个新数组`，原数组不变
+ 语法：`arr.slice(start, end);` [start, end)
    - 如果省略第二个参数，则一直返回到原数组的最后一个成员
    - 省略两个参数等同于原数组的拷贝
    - -2表示倒数计算的第二个位置，-1表示倒数计算的第一个位置
    - 第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组
```js
// 示例1：
var a = ['a', 'b', 'c'];
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]

// 示例2：
var a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]

// 示例3：
var a = ['a', 'b', 'c'];
a.slice(4) // []
a.slice(2, 1) // []
```

## 5.8 splice()
+ `splice()`: 删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组
+ 语法：`arr.splice(start, count, addElement1, addElement2, ...);`
    - 起始位置也可能是负数，表示从倒数位置开始删除
    - 如果只是单纯地插入元素，splice方法的第二个参数可以设为0
    - 如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组
```js
// 示例1：
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]

// 示例2:
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2, 1, 2) // ["e", "f"]
a // ["a", "b", "c", "d", 1, 2]

// 示例3：
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2) // ["c", "d"]

// 示例4： 单纯插入元素
var a = [1, 1, 1];
a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]

// 示例5：
var arr = [1,1,1];
arr.splice(1,1,3,3,3);  // []
arr //[1, 3, 3, 3, 1]

// 示例6：
var a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```
## 5.9 sort()
+ `sort()`: 对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。
+ 数值会被先转成字符串，再按照字典顺序进行比较
+ 可以传入自定义排序函数; 自定义函数必须返回数值，不能是boolean值
```js
// 示例1：
['d', 'c', 'b', 'a'].sort()     // ['a', 'b', 'c', 'd']

// 示例2：
[10111, 1101, 111].sort(function (a, b) {
  return a - b;
})
// [111, 1101, 10111]

// 示例3: 
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a - b)
```
## 5.10 map()
+ `map(fun)`: 将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。
+ map给回调函数传递3个参数: `map(fun(item, index, arr))` —— 当前成员、当前位置和数组本身
+ map方法还可以接受第二个参数，用来绑定回调函数内部的this变量
+ map方法不会跳过undefined和null，但是会跳过空位
```js
// 示例1：
var numbers = [1, 2, 3];
numbers.map(function (n) {
  return n + 1;
});         // [2, 3, 4]
numbers     // [1, 2, 3]


// 示例2：
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
}); // [0, 2, 6]
```
```js
// 示例1：map给回调函数传递3个参数
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});     // [0, 2, 6]
```
```js
// 示例1： 通过map方法的第二个参数，将回调函数内部的this对象，指向arr数组
var arr = ['a', 'b', 'c'];

[1, 2].map(function (e) {
  return this[e];
}, arr)
// ['b', 'c']
```
```js
// 示例1: map方法不会跳过undefined和null，但是会跳过空位

var f = function (n) { return 'a' };
[1, undefined, 2].map(f) // ["a", "a", "a"]
[1, null, 2].map(f) // ["a", "a", "a"]
[1, , 2].map(f) // ["a", , "a"]
```
## 5.11 forEach()
+ forEach的用法与map方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组
+ 区别：forEach方法不返回值，只用来操作数据
+ 如果数组遍历的目的是为了得到返回值，那么使用map方法，否则使用forEach方法

```js
// 示例1:
function log(element, index, array) {
  console.log('[' + index + '] = ' + element);
}

[2, 5, 9].forEach(log);
// [0] = 2
// [1] = 5
// [2] = 9
```

## 5.12 filter()
+ `filter()`: 用于过滤数组成员，满足条件的成员组成一个新数组返回。
```js
// 示例1：
[1, 2, 3, 4, 5].filter(function (elem) {
  return (elem > 3);
})      // [4, 5]

// 示例2：
[1, 2, 3, 4, 5].filter(function (elem, index, arr) {
  return index % 2 === 0;
});
// [1, 3, 5]

// 示例3： 绑定内部this
var obj = { MAX: 3 };
var myFilter = function (item) {
  if (item > this.MAX) return true;
};
var arr = [2, 8, 3, 4, 1, 3, 2, 9];
arr.filter(myFilter, obj) // [8, 4, 9]
```

## 5.13 reduce()和reduceRight()
+ `reduce()`: 依次处理数组的每个成员，使用第一个和第二个成员操作的结果再和第三个成员操作依次进行
+ reduce是从左往右；reduceRight从右往左
+ reduce第一个参数都是一个函数。该函数接受以下四个参数。
    - 累积变量，默认为数组的第一个成员
    - 当前变量，默认为数组的第二个成员
    - 当前位置（从0开始）【可选】
    - 原数组【可选】
+ reduce的第二个参数可以指定累计变量初始值
```js
// 示例1：
[1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
})      // 15

// 示例2：找出字符最长的数组成员
function findLongest(entries) {
  return entries.reduce(function (longest, entry) {
    return entry.length > longest.length ? entry : longest;
  }, '');
}
findLongest(['aaa', 'bb', 'c']) // "aaa"

// 示例3：指定参数a的初值为10，所以数组从10开始累加
[1, 2, 3, 4, 5].reduce(function (a, b) {
  return a + b;
}, 10);     // 25
```
## 5.14 some()和every()
+ some()和every()：返回一个布尔值，表示判断数组成员是否符合某种条件。
+ some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false
+ every方法是所有成员的返回值都是true，整个every方法才返回true，否则返回false。
+ some和every方法还可以接受第二个参数，用来绑定参数函数内部的this变量
+ 注意：对于空数组，some方法返回false，every方法返回true，回调函数都不会执行。
```js
// 示例1:
var arr = [1, 2, 3, 4, 5];
arr.some(function (elem, index, arr) {
  return elem >= 3;
});     // true

// 示例2：
var arr = [1, 2, 3, 4, 5];
arr.every(function (elem, index, arr) {
  return elem >= 3;
});     // false

// 示例3：
function isEven(x) { return x % 2 === 0 }
[].some(isEven) // false
[].every(isEven) // true
```

## 5.15 indexOf()和lastIndexOf()
+ `indexOf`: 返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1
    - indexOf方法还可以接受第二个参数，表示搜索的开始位置
+ `lastIndexOf`: 返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1
+ 注意：这两个方法内部，使用严格相等运算符（===）进行比较，而NaN是唯一一个不等于自身的值；所以不能用于搜索NaN的位置
```js
// 示例1：
var a = ['a', 'b', 'c'];
a.indexOf('b') // 1

// 示例2：
['a', 'b', 'c'].indexOf('a', 1) // -1

// 示例3：
var a = [2, 5, 9, 2];
a.lastIndexOf(2) // 3

// 示例4：
[NaN].indexOf(NaN) // -1
[NaN].lastIndexOf(NaN) // -1
```