<!-- TOC -->

- [1. 函数扩展](#1-%e5%87%bd%e6%95%b0%e6%89%a9%e5%b1%95)
  - [1.1 rest 参数](#11-rest-%e5%8f%82%e6%95%b0)
  - [1.2 箭头函数](#12-%e7%ae%ad%e5%a4%b4%e5%87%bd%e6%95%b0)
  - [1.3 匿名函数和箭头函数的区别：](#13-%e5%8c%bf%e5%90%8d%e5%87%bd%e6%95%b0%e5%92%8c%e7%ae%ad%e5%a4%b4%e5%87%bd%e6%95%b0%e7%9a%84%e5%8c%ba%e5%88%ab)

<!-- /TOC -->
# 1. 函数扩展

## 1.1 rest 参数

- 使用背景：es6
- rest 参数是真数组，arguments 是伪数组
- arguments 是函数的局部变量，arguments.length 表示传入的实参个数
- es6 的箭头函数内部不能使用 arguments；这样箭头函数就无法访问参数个数，所有 rest 参数应运而生

```js
// 示例1：
// ...args：表示rest参数
// 产生一个函数局部变量args,这个变量是一个数组，数组里面包含了这个函数调用时传递的所有实参(注意是实参)
function fun(...args) {
  console.log(args);
  //实参数组长度
  console.log(args.length);
  // 验证args是否是数组
  console.log(args instanceof Array);
  // 判断args是什么类型
  console.log(Object.prototype.toString.call(args)); //"[object Array]"
  // 判断是数组es5的方法
  console.log(Array.isArray(args));
}
fun(1, 2, 3);
```

## 1.2 箭头函数

- 箭头函数应用场景：就是用来替换匿名函数的；简化匿名函数写法
- 箭头函数基本用法

```js
// 示例1：无参匿名函数
div.onclick = function() {} / 相当于;
div.onclick = () => {};

// 示例2：有一个参数(箭头函数的括号可以省略)
div.onclick =
  function(name) {
    console.log(name);
  } / 相当于;
div.onclick = name => {
  console.log(name);
};
div.onclick = name => {
  console.log(name);
};

// 示例3：有多个参数
div.onclick =
  function(name, age) {
    console.log(name);
  } / 相当于;
div.onclick = (name, age) => {
  console.log(name);
};
```

## 1.3 匿名函数和箭头函数的区别：

- 函数体内的 this 对象， 就是定义时所在的对象，而不是使用时所在的对象
- 不可以当做构造函数，不能使用 new 命令，否则会抛出错误
- 不可以使用 arguments 对象，该对象在函数体内不存在，可以使用 rest 参数代替
- 不可以使用 yield 命令，因此箭头函数不能作为 Generator 函数
  - 这种方式不常用；Generator 用的不多，现在经常使用的是 async 替代

```js
1. 由于匿名函数有独立作用域，而箭头函数没有独立作用域，所以箭头函数内部this是其外层函数决定的
```

```js
// 示例1：
var p = {
  age: 20,
  run: function() {
    setTimeout(function() {
      // this指向window
      console.log(this);
    }, 1000);
  },

  tave: () => {
    setTimeout(() => {
      //this指向window
      //由于箭头函数不具有独立作用域，所以需要向上查找，发现还是一个箭头函数，箭头函数再上面没有其他函数作用域，所以是window作用域
      console.log(this);
    }, 1000);
  },

  travel: function() {
    //这里匿名函数的this指向p对象
    setTimeout(() => {
      //this指向p对象
      //由于箭头函数不具有独立作用域，所以需要向上查找，发现还是一个匿名函数，匿名函数指向p对象
      console.log(this);
    }, 1000);
  },

  //es6对象函数的简写：推荐使用的方式
  say() {
    console.log("say方法的this：", this); //指向p
    setTimeout(() => {
      console.log(this); //向上查找发现say函数的this指向p，所以箭头函数的this也指向p
    }, 1000);
  }
};
```
