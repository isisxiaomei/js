<!-- TOC -->

- [Iterator](#iterator)
  - [基本概念](#%e5%9f%ba%e6%9c%ac%e6%a6%82%e5%bf%b5)
  - [注意点](#%e6%b3%a8%e6%84%8f%e7%82%b9)
  - [应用场景](#%e5%ba%94%e7%94%a8%e5%9c%ba%e6%99%af)
  - [遍历器对象的 return() & throw()](#%e9%81%8d%e5%8e%86%e5%99%a8%e5%af%b9%e8%b1%a1%e7%9a%84-return--throw)
- [for-of](#for-of)
  - [数组遍历](#%e6%95%b0%e7%bb%84%e9%81%8d%e5%8e%86)
  - [set遍历](#set%e9%81%8d%e5%8e%86)
  - [map遍历](#map%e9%81%8d%e5%8e%86)
  - [array&set&map遍历相关](#arraysetmap%e9%81%8d%e5%8e%86%e7%9b%b8%e5%85%b3)
  - [for-of对象](#for-of%e5%af%b9%e8%b1%a1)

<!-- /TOC -->
# Iterator
## 基本概念
+ 目的：Iterator 接口主要供for...of消费
+ 过程：可迭代对象每一次调用next方法，都会返回数据结构的当前成员的信息。就是返回一个包含`value和done`两个属性的对象。其中，`value属性是当前成员的值`，`done属性是一个布尔值，表示遍历是否结束`
+ 一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法 (原型链上的对象具有该方法也可）
+ for-of遍历就默认调用Symbol.iterator方法
```js
// 示例1：模拟内部迭代器
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```
+ 默认迭代器接口：调用`Symbol.iterator`方法返回一个拥有`next方法`的迭代对象
```js
// 示例1：
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```

## 注意点
+ 普通对象部署数组的Symbol.iterator方法没用，类似数组的对象调用数组的Symbol.iterator方法可以(因为for-of迭代数组时只返回具有数字索引的属性)
```js
// 示例1：
let iterable = {
  0: 'a',
  1: 'b',
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b'
}
// 示例2：
let iterable = {
  a: 'a',
  b: 'b',
  length: 2,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined
}
```
## 应用场景

## 遍历器对象的 return() & throw()
+ 注意点：留意到遍历器对象的3个方法（next方法, return方法, throw方法）都返回的是对象
+ 遍历器对象除了具有next方法，还可以具有return方法和throw方法
+ `return()`: 
    - 如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法
    - return方法必须返回一个对象
+ `throw()`: 
```js
// 示例1：下面两种情况触发return方法
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}
// 情况一
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二：注意此处会在执行return方法关闭文件之后，再抛出错误
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
```
# for-of
## 数组遍历
+ 用于可遍历结果的遍历
+ `for-of和for-in的区别`:
    - 1. for...in循环，获取键名，不能直接获取键值。for...of，允许遍历获得键值【示例1】
    - 2. for...of遍历，数组的遍历器接口只返回具有数字索引的属性【示例2】
```js
// 示例1：
var arr = ['a', 'b', 'c', 'd'];
for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}

// 示例2：
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
```

## set遍历
+ set遍历每次返回一个值，并且遍历的顺序是按照各个成员被添加进数据结构的顺序
```js
// 示例1：
var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit
```
## map遍历
+ Map遍历时，返回的是一个数组，数组的两个成员分别为当前 Map 成员的键名和键值
+ 遍历的顺序是按照各个成员被添加进数据结构的顺序
```js
// 示例1：
let map = new Map().set('a', 1).set('b', 2);
for (let pair of map) {
  console.log(pair);
}
// ['a', 1]
// ['b', 2]

// 示例2：
for (let [key, value] of map) {
  console.log(key + ' : ' + value);
}
// a : 1
// b : 2
```
## array&set&map遍历相关
+ `entries()`:  返回一个遍历器对象，用来遍历[键名, 键值]组成的数组。对于数组，键名就是索引值；对于 Set，键名与键值相同。
+ `keys()`: 返回一个遍历器对象，用来遍历所有的键名。
+ `values()`:  返回一个遍历器对象，用来遍历所有的键值。
```js
let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

## for-of对象
+ 对于普通的对象，for...of会报错，必须部署了 Iterator 接口后才能使用。for...in循环依然可以用来遍历键名
+ 解决对象for-in, 使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组
```js
// 示例1：
let es6 = {
  edition: 6,
};

for (let e in es6) {
  console.log(e);
}
// edition

for (let e of es6) {
  console.log(e);
}
// TypeError: es6[Symbol.iterator] is not a function


// 示例2：
for (var key of Object.keys(someObject)) {
  console.log(key + ': ' + someObject[key]);
}
```
