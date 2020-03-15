<!-- TOC -->

- [1 Promise 的含义](#1-promise-%e7%9a%84%e5%90%ab%e4%b9%89)
- [2 基本使用](#2-%e5%9f%ba%e6%9c%ac%e4%bd%bf%e7%94%a8)
- [3 Promise.prototype.then()](#3-promiseprototypethen)
- [4 Promise.prototype.catch()](#4-promiseprototypecatch)
- [5 Promise.prototype.finally()](#5-promiseprototypefinally)
- [6 Promise.resolve()](#6-promiseresolve)
- [7 Promise.reject()](#7-promisereject)

<!-- /TOC -->
# 1 Promise 的含义
+ 对象异步操作状态：Promise对象代表一个异步操作，有三种状态：`pending（进行中）、fulfilled（已成功）和rejected（已失败）`
+ **背景**: 帮忙解决回调地狱问题
+ **缺点**：
    - 1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消
    - 2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
    - 3. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
# 2 基本使用
+ `Promise`: Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署.
+ `resolve函数`: 作用是将Promise对象的状态从“未完成”变为“成功”，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
+ `reject函数`: 作用是将Promise对象的状态从“未完成”变为“失败”，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去; 注意reject相当于抛出错误
```js
// 示例1：
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
+ `then方法`: Promise实例生成以后，then方法接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用(可选)。这两个函数都接受Promise对象传出的值作为参数
```js
// 示例1：
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
+ **注意点**：
    - 1. 执行顺序问题，Promise 新建后就会立即执行，然后then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出
    - 2. 调用resolve或reject并不会终结 Promise 的参数函数的执行
```js
// 示例1：
// 解析：Promise 新建后就会立即执行
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved

// 示例2：
new Promise((resolve, reject) => {
    setTimeout( ()=>{
        console.log("setTimeout")
    } , 1000);
    resolve(1);
    console.log("2")
})
.then(res => {
    console.log(res); // 1
})；
// 2 1 setTimeout

// 示例3：
new Promise((resolve, reject) => {
    setTimeout( ()=>{
        resolve(1);
        console.log("setTimeout")
    } , 5000);
    console.log("2")
})
.then(res => {
    console.log(res); //1
})；
// 2  setTimeout 1
```
```html
<!-- 示例1： -->
<script>
    console.log(0);
    function fun(){
        console.log(1);
        return new Promise(function(resolve, reject){
            console.log(2);
            resolve(3);
            reject(4);
        });
    }
    fun().then(function(rst){
        console.log("rst"+ rst)
    }, function(err){
        console.log("err"+ err)
    });
    var tt = function(){
        console.log(5);
    }
    tt();
</script>
<!--0   1   2   5   rst3  -->
```
```js
// 示例1：
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```
```js
// 示例1：reject(4);和resolve(3);的执行需要人为代码逻辑控制，如果不控制，则按调用顺序执行；并且只会执行两者的其中一个。
function fun(){
    console.log(1);
    return new Promise(function(resolve, reject){
        reject(4);
        resolve(3);
        console.log(2);
    });
}
fun().then(function(rst){
    console.log("rst"+ rst)
}, function(err){
    console.log("err"+ err)
});
// 1 2 err4
```
# 3 Promise.prototype.then()
+ **作用**: 是为 Promise 实例添加状态改变时的回调函数
+ `then(resolvedCallBack, rejectCallBack)`: 参数1是resolvedCallBack， 参数2是rejectCallBack【参数2可选】
+ **then返回值**：
    - 默认返回一个新的Promise实例【因此可以采用链式写法】
    - then的参数回调函数完成以后，会将返回结果作为参数，传入紧接着then的下一个then的回调函数
```js
// 示例1：
// 解析：因为then默认返回的Promise，所以then的回调函数resolved返回的会传递给下一个then的resolved回调
new Promise((resolve, reject) => {
    setTimeout(res => {
        console.log(res); //undefine
        resolve(1);
    }, 1000);
})
.then(res => {
    console.log(res); // 1
    return 100;
})
.then(res => {
    console.log(res); // 100
})
.catch(resError => {
    console.log(resError); // 不执行
});
```
# 4 Promise.prototype.catch()
+ **作用**：Promise.prototype.catch方法是.then(null, rejection)或.then(undefined, rejection)的别名用于指定发生错误时的回调函数
+ **区别**：catch和reject回调的区别是，then的参数reject回调只处理上一步Promise中发生的错误；catch会处理Promise对象中发生的错误，还会处理then方法指定的回调函数，如果运行中抛出错误，也会被catch方法捕获
```js
// 示例1：
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数(then的回调函数)运行时发生的错误
  console.log('发生错误！', error);
});
```
+ **注意点**：
    - 1. 如果 Promise 状态已经变成resolved，再抛出错误是无效的
    - 2. Promise 对象的错误具有“冒泡”性质，会一直向后传递，中间遇到then不执行，直到被捕获为止。
    - 3. 每个catch只对上面的代码负责，如果catch中再抛出错误，可接着用catch捕获
```js
// 示例1：Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```
```js
// 示例1：
new Promise((resolve, reject) => {
    resolve(1);
})
.then(res => {
    console.log(res); // 1
    throw new Error("errorTest")
    return 100;
})
.then(res => {
    console.log(res); // 这个then不执行
})
.catch(resError => {
    console.log(resError); "errorTest"
});
```
+ **参数**：`Promise.prototype.catch(回调函数)`
    - 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，外层照样执行
```js
// 示例1：
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```
+ **返回值**：catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法
```js
// 示例1：
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on
```
# 5 Promise.prototype.finally()
+ `finally()`: 用于指定不管 Promise 对象最后状态如何，都会执行的操作.
+ `finally(回调函数)`： 回调函数不接受参数
```js
// 示例1：
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

# 6 Promise.resolve()
+ 作用：`Promise.resolve(现有对象)`将现有对象转为新 Promise 对象
+ 本质：
```js
// 本质
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
+ Promise.resolve()参数问题
    - 1. 参数是一个 Promise 实例；直接返回该实例
    - 2. 参数是一个具有`then方法`的对象,；返回转成的promise对象，立即自动调用之前参数对象的then方法
    - 3. 参数不是具有then方法的对象，或根本就不是对象；则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved
    - 4. 不带有任何参数；直接返回一个resolved状态的 Promise 对象
```js
// 示例1：解析： 返回P1对象，因为此时Promise.resolve(thenable)返回的已经是resolved状态的promise对象了，这是如果有同步代码先执行同步代码，同步代码执行完毕后自动调用thenable的then方法，resolve(42)，再人为p1.then接收到42
let thenable = {
    then: function(resolve, reject) {
        console.log("1");
        resolve(42);
    }
};

let p1 = Promise.resolve(thenable);
console.log("2")
p1.then(function(value) {
    console.log(value);  // 42
});
console.log("3")
// 2 3 1 42
```
+ 注意点：
    - 1. 立即resolve()的 Promise 对象，是在本轮“事件循环”的结束时执行，不是在下一轮“事件循环”的开始时
```js
// 示例1：解析setTimeout(fn, 0)在下一轮“事件循环”开始时执行；Promise.resolve()在本轮“事件循环”结束时执行
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});
console.log('one');

// one
// two
// three
```
# 7 Promise.reject()
+ `Promise.reject(reason)`: 也会返回一个新的 Promise 实例，该实例的状态为rejected
+ 本质：
```js
// 示例1：
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```
+ 参数问题：Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数; 这一点与Promise.resolve方法不一致.
```js
// 示例1：
const thenable = {
  then(resolve, reject) {
    console.log("then1")
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
    console.log("catch1")
    console.log(e === thenable)
})
// catch1 true
```

Promise.try()
Promise.all()
Promise.race()
Promise.allSettled()
Promise.any()