# 1 简介
## 1.1 基本概念
+ **Generator 函数**：Generator 函数是一个状态机，封装了多个内部状态
+ **Generator 函数返回**：执行 Generator 函数会返回一个遍历器对象，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态
+ **Generator形式**：
    - 1. function关键字与函数名之间有一个星号
    - 2. 函数体内部使用`yield表达式`，定义不同的内部状态
+ **Generator调用理解**：调用 Generator 函数后，该函数并不执行，而是返回一个指向内部状态的指针对象；每次调用next方法，内部指针就从函数头部或`上一次停下来的地方开始执行`，直到遇到下一个`yield表达式（或return语句）`为止
```js
// 示例1：
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
hw.next()   // { value: 'hello', done: false }
hw.next()   // { value: 'world', done: false }
hw.next()   // { value: 'ending', done: true }
hw.next()   // { value: undefined, done: true }
```

## 1.2 yield 表达式
+ **yield**：只有当调用next方法、内部指针指向该语句时才会执行，相当于提供了手动的“惰性求值”
+ **next逻辑**：
    - 1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
    - 2. 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
    - 3. 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
    - 4. 如果该函数没有return语句，则返回的对象的value属性值为undefined
+ **有无yeild问题**:
    - Generator 函数可以不用yield表达式，这时调用Generator 函数，返回的迭代器直接调next()会一次执行函数中所有的代码直到return表达式的值(没有return返回undefined)
    - yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
```js
// 示例1：
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  console.dir(generator.next());
}, 2000);
// 执行了！
// object-->undefined
```
```js
// 示例1：yield不能用在普通函数中；forEach的参数是个普通函数
var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};
```
+ **yield注意点**：
    - 1. yield表达式如果用在另一个表达式之中，必须放在圆括号里面
    - 2. yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号
```js
// 示例1：
function* demo() {
  console.log('Hello' + yield); // SyntaxError
  console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
// 示例2：
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```
## 1.3 与Iterator接口的关系
+ **迭代器和Generator理解**：任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象；由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口

```js
// 示例1：
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]
```
+ Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身
```js
// 示例1：解析因为gen()返回的是遍历器对象g，遍历器对象g本身的遍历器属性Symbol.iterator是一个遍历器生成函数，调用之后也返回一个遍历器对象，这时候返回的就是g本身
function* gen(){
  // some code
}
var g = gen();
g[Symbol.iterator]() === g
// true
```
# 2 next 方法的参数
+ yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
```js
// 示例1：
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}
var g = f();
g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```



# 3 for...of 循环
## 3.1 for-of遍历
+ for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法
    - 一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象(for-of遍历不包含return)
```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  return 6;
}
for (let v of foo()) {
  console.log(v);
}
// 1 2 3
```
## 3.2 为原生对象提供for-of
+ **背景**：原生对象没有迭代器接口，无法使用for...of循环
+ **解决**：
    - 方法1：为原生对象`Symbol.iterator`属性添加Generator函数
    - 方法2：直接通过 Generator 函数为它加上这个接口，就可以用了
```js
// 示例1：
let obj = {age: 18, sex: '女'}；
funtion* objectEntries(){
    let propKeys = Object.keys(this);
    for (let propKey of propKeys) {
        yield [propKey, this[propKey]];
    }
}
obj[Symbol.iterator] = objectEntries;
for(let [k,v] of obj) {
    console.log(`${k}: ${v}`);
}

// 示例2：
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}
let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
```


# 4 Generator.prototype.throw()
+ Generator 函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
```js
// 示例1：
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b    解析 ：由于i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获
```
+ **throw方法参数**：throw方法可以接受一个参数，该参数会被catch语句接收，建议抛出Error对象的实例
```js
// 示例1：
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log(e);
  }
};

var i = g();
i.next();
i.throw(new Error('出错了！'));
// Error: 出错了！(…)
```
+ 如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
```js
// 示例1：
var g = function* () {
  while (true) {
    yield;
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 外部捕获 a
```
+ 如果 Generator 函数内外部都没有部署try...catch代码块，那么程序将报错，直接中断执行
```js
// 示例1：
var gen = function* gen(){
  yield console.log('hello');
  yield console.log('world');
}

var g = gen();
g.next();
g.throw();
// hello
// Uncaught undefined
```
+ throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法【相当于启动generator内部代码】
```js
// 示例1：
function* gen() {
  try {
    yield 1;
  } catch (e) {
    console.log('内部捕获');
  }
}
var g = gen();
g.throw(1);     // Uncaught 1
```
+ 遍历器对象的throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法
```js
// 示例1：
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');
  yield console.log('c');
}
var g = gen();
g.next() // a
g.throw() // b
g.next() // c
```
+ **注意点**: 如果`Generator函数`内部抛出错误，内部并未捕获，程序会直接终止；如果此时外部捕获了，则Generator函数内部剩余代码终止【此时外部再调用next方法将返回一个value属性等于undefined、done属性等于true的对象】，js引擎认为`Generator函数`已经运行结束了
```js
// 示例1：
function* g() {
            yield 1;
            console.log('throwing an exception');
            throw new Error('generator broke!');
            yield 2;
            yield 3;
        }

        function log(generator) {
            var v;
            console.log('starting generator');
            try {
                v = generator.next();
                console.log('第一次运行next方法', v);
            } catch (err) {
                console.log('捕捉错误1',v);
                console.log('捕捉错误1',err);
            }
            try {
                v = generator.next();
                console.log('第二次运行next方法', v);
            } catch (err) {
                console.log('捕捉错误2', v);
                console.log('捕捉错误2', err);
            }
            try {
                v = generator.next();
                console.log('第三次运行next方法', v);
            } catch (err) {
                console.log('捕捉错误3', v);
                console.log('捕捉错误3', err);
            }
            console.log('caller done');
        }

        log(g());

//         starting generator
// test.html:29 第一次运行next方法 {value: 1, done: false}
// test.html:18 throwing an exception
// test.html:38 捕捉错误2 {value: 1, done: false}
// test.html:39 捕捉错误2 Error: generator broke!
//     at g (test.html:19)
//     at g.next (<anonymous>)
//     at log (test.html:35)
//     at test.html:51
// test.html:43 第三次运行next方法 {value: undefined, done: true}
// test.html:48 caller done
```
# 5 Generator.prototype.return()
+ `Generator.prototype.return()`: Generator 函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历 Generator 函数
    - 如果return方法调用时，不提供参数，则返回值的value属性为undefined
+ **注意点**：
    - 1. 如果 Generator 函数内部有try...finally代码块，且正在执行try代码块，那么return方法会导致立刻进入finally代码块，执行完以后，整个函数才会结束【finally执行完后再next会获得之前return给定的返回值】
```js
// 示例1：
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}
var g = gen();
g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```
```js
// 示例2：
function* numbers() {
    try {
        yield 2;
        yield 3;
    } finally {
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
console.log(g.next())
console.log(g.return(7))
console.log(g.next())
console.log(g.next())
console.log(g.next())

// {value: 2, done: false}
// {value: 4, done: false}
// {value: 5, done: false}
// {value: 7, done: true}
// {value: undefined, done: true}
```
# 6 next()、throw()、return() 的共同点
+ next()：是将yield表达式替换成一个值。
+ throw()： 是将yield表达式替换成一个throw语句
+ return()： 是将yield表达式替换成一个return语句
```js
// 示例1：
gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;

gen.throw(new Error('出错了')); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));


gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```
# 7 yield* 表达式
+ **背景**: 如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历，如果有多个嵌套写起来很麻烦
+ **定义**：ES6 提供了`yield*`表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数
```js
// 示例1：背景
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // 手动遍历 foo()
  for (let i of foo()) {
    console.log(i);
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// x
// a
// b
// y


// 示例2：yield* 作用
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```
+ **本质**: 
    - 1. yield*后面的 Generator 函数（没有return语句时），不过是for...of的一种简写形式，完全可以用后者替代前者；反之，在有return语句时，则需要用var value = yield* iterator的形式获取return语句的值; 
```js
// 示例1：
function* concat(iter1, iter2) {
  yield* iter1;
  yield* iter2;
}

// 等同于

function* concat(iter1, iter2) {
  for (var value of iter1) {
    yield value;
  }
  for (var value of iter2) {
    yield value;
  }
}
```
```js
// 示例1：
function* foo() {
  yield 2;
  return "foo";
}

function* bar() {
  yield 1;
  var v = yield* foo();
  console.log("v: " + v);
  yield 3;
}

var it = bar();

it.next()
// {value: 1, done: false}
it.next()
// {value: 2, done: false}
it.next()
// "v: foo"
// {value: 3, done: false}
it.next();
// {value: undefined, done: true}
```

+ **注意点**: 
    - 1. `yeild*` 后面跟着的其实是一个可迭代对象（生成器函数也是返回一个迭代器对象）
    - 2. 任何数据结构只要有 Iterator 接口，就可以被yield*遍历
```js
// 示例1：
function* gen(){
  yield* ["a", "b", "c"];
}
gen().next() // { value:"a", done:false }


// 示例2：
let read = (function* () {
  yield 'hello';
  yield* 'hello';
})();
read.next().value // "hello"
read.next().value // "h"
```


作为对象属性的 Generator 函数
Generator 函数的this
含义
应用