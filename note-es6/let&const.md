# 1 let
+ **定义**：用来声明变量。类似于var，但是所声明的变量，只在let命令所在的代码块内有效
+ ***基本用法***：
```js
// 示例1：
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```
+ **注意点**：
    - let 不具有变量提升
    - let 只在块作用域内有效
    - let 定义变量必须先定义再使用
    - let 不允许在相同作用域内，重复声明同一个变量
```js
// 示例1：只在块作用域内有效
for (let i = 0; i < 10; i++) {
  // ...
}
console.log(i);     // ReferenceError: i is not defined
```
```js
// 示例1：var-for
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6]();     // 10

// 示例2：let-for
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
```
# 2 块级作用域
+ let实际上为 JavaScript 新增了块级作用域
```js
// 示例1：
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```
# 3 const
+ **定义**：`const`: 声明一个只读的常量。一旦声明，常量的值就不能改变; 一旦声明变量，就必须立即初始化
+ **const变量**：const变量的指向不变，但是指向的内容可以变
+ **作用范围**：const的作用域与let命令相同，只在声明所在的块级作用域内有效
+ **注意点**：
    - const命令声明的常量也是不提升，并且只能在声明的位置后面使用。
    - const声明的常量，也与let一样不可重复声明
```js
// 示例1：
const PI = 3.1415;
PI // 3.1415
PI = 3;
// TypeError: Assignment to constant variable.
```