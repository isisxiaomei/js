<!-- TOC -->

- [js继承](#js继承)
  - [1. 继承的概念&背景](#1-继承的概念背景)
  - [2. 继承的几种方式](#2-继承的几种方式)
    - [2.1 原型链继承](#21-原型链继承)
    - [2.2 拷贝继承(混入继承)](#22-拷贝继承混入继承)
  - [2.3 原型式继承（道格拉斯——>蝴蝶书）](#23-原型式继承道格拉斯蝴蝶书)
  - [2.4 借用构造函数实现继承](#24-借用构造函数实现继承)
  - [2.5 寄生继承](#25-寄生继承)
  - [2.6 寄生组合继承](#26-寄生组合继承)
- [3 prototype](#3-prototype)
- [4 对象&函数&原型3者关系](#4-对象函数原型3者关系)
- [5 constructor](#5-constructor)
  - [5.1 基本概念](#51-基本概念)
  - [5.2 constructor作用](#52-constructor作用)
  - [5.3 constructor注意点](#53-constructor注意点)

<!-- /TOC -->
# js继承
> js中的继承是广义的，拷贝继承也算继承
## 1. 继承的概念&背景
+ **概念**：如果你能通过***某种方式***，可以让某个对象访问到其他对象中的属性、方法，那么我们就把这种方式称之为继承。
+ **背景**：有些对象会有方法，而这些方法都是函数（函数也是对象），如果把这些方法都放在构造函数中声明，则会产生内存浪费
## 2. 继承的几种方式
### 2.1 原型链继承
```javascript
// 原型继承1
fucntion Person() {}
Person.prototype.sayName = function(){
    console.log("man")
};
var person1 = new Person();
person1.sayName();  //john
```

```javascript
// 原型继承2
fucntion Person() {}
Person.prototype.s1 = function(){
    console.log("s1")
};
Person.prototype.s1 = function(){
    console.log("s2")
};
Person.prototype.s1 = function(){
    console.log("s3")
};

var person1 = new Person();
person1.s1();  //s1
// 以上方式如果需要添加多个方法会造成代码的冗余，解决冗余问题重写原型对象
fucntion Person() {}
Person.prototype = {
    constructor: Person,
    a1: function(){alert("1")},
    a2: function(){alert("2")},
    a3: function(){alert("3")}
}
var person1 = new Person();
person1.a1();  //1
// 注意点：
a、一般情况下先重写原型再创建对象
b、重写的原型对象需要添加一个constructor属性，并指向构造函数
```
### 2.2 拷贝继承(混入继承)
+ **背景**：有时候想使用某个对象中的属性，但不能直接修改，于是就创建一个该对象的拷贝（此处是浅拷贝）
+ **使用场景**：属性一大半都相同时，此时使用拷贝继承会非常和谐
+ es6的`<对象拷贝运算符>`仿佛就是为拷贝继承而生的，简单的让人发指
```javascript
// 拷贝继承示例
var obj1 = { gender: "男", grade: "高一", group: "第五组" };
var obj2 = {};
for(var key in obj1){
    if(obj1.hasOwnProperty(key)){
        //obj2.key = obj1.key; 这里只能使用中括号不能使用.的方式，因为key是个变量
        obj2[key] = obj1[key];
    }
}
console.log(obj2);
```

```javascript
// es6的拷贝继承
var source = { gender: "男" };
// 让target是一个新对象，同时拥有gender: "男" 属性
var target = { ...source };

// 在拷贝的同时增加新的属性group: "第五组"
var target = { ...source,  group: "第五组"};

```
## 2.3 原型式继承（道格拉斯——>蝴蝶书）
>平时开发用的不多，但是经典库中使用的很多;
>>其次是当需要做内存优化时，可以使用

+ **场景：**
  - 创建一个纯洁对象，对象什么属性都没有(连原型对象都没有)
  - 创建一个继承自父对象的子对象
+ **使用方式：**
```javascript
var o1 = {name: "xxx"};
var o2 = Object.creat(o1);  //o2.__proto__ === o1;此时o1是o2的父对象

```
```javascript
// 创建空对象
var obj = Object.create(null);      //此时obj中什么都没有
// 创建son继承parent
var parent = { age: 18 };
var son = Object.create(parent);    //son.__proto__ === parent
```
## 2.4 借用构造函数实现继承
+ **场景**：适用于两种构造函数之间逻辑有相似的地方
+ **原理**：使用到函数call、apply调用方式
+ **局限性**：父类构造函数的代码必须全部适应于子类
```js
// 目的使得Person拥有Animal的属性达到继承的效果
function Animal(name, age){
    this.name = name;
    this.age = age;
}
function Person(name, age, gender, say){
    //通过函数调用的方式，函数内部的指针指向window
    //Animal(name, age); //不行

    //目的：将Animal内部的this指向Person的实例
    // Animal.call(this, name, age)表示将Animal内部的this指向Person实例，这里传入的this就指代Person对象，然后属性name, age传入
    Animal.call(this, name, age)
    // call的等价代码apply; 注意参数的区别
    Animal.apply(this, [name, age])
    this.gender = gender;
    this.say = say;
}
var p1 = new Person("john", 18, "男", function(){});
console.log(p1);
```

## 2.5 寄生继承
## 2.6 寄生组合继承



# 3 prototype
+ **prototype本质**：Js规定，每个函数都有一个prototype属性，指向一个对象；对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型
+ **根对象**： JavaScript 规定，所有对象都有自己的原型对象（prototype）；根对象`Object.prototype` 即Object构造函数的prototype属性; `Object.prototype` 对象的原型是`null`
```js
// 示例1：
Object.getPrototypeOf(Object.prototype) // null
```

# 4 对象&函数&原型3者关系
+ ***对象和原型***：对象中都有一个`__proto__`的属性，指向父对象；以此来实现该对象访问父对象的中的相关属性; 注意`__proto__`属性只能在控制台查看，但是没有提供代码访问；所以要获取实例对象原型可以通过`Object.getPrototypeOf(实例对象)` 获取。`Object.getPrototypeOf(person1) === Person.prototype`
+ ***函数和原型***：对于构造函数来说，生成实例的时候，`prototype`会自动成为实例对象的原型；构造函数中的`prototype`属性可以通过`Person.prototype`进行访问
+ ***函数也是对象***：函数也是对象，函数对象是Function的实例
```js
// 示例1：
function fun(){}
console.dir(fun.constructor.name);  //对象.constructor 返回对象的构造函数
```
+ ***对象***：对象有属性`__proto__`, 指向该对象的构造函数的原型对象。
+ ***函数***：
    - 函数除了有属性`__proto__`(因为函数也是对象，__proto__属性)
    - 还有属性`prototype`，`prototype`指向该方法的原型对象(备注：只有当函数成为构造函数创建实例时，prop属性会自动成为实例对象的原型)。
```js
// 示例1：函数对象
function fun(){}
// 解析：Object.getPrototypeOf(fun) 得到fun对象的构造函数的原型对象（理解每个对象的__proto__）
// 解析：fun.constructor.prototype  得到fun对象的构造函数的原型对象(理解 对象.constructor===构造函数)
console.log(Object.getPrototypeOf(fun) === fun.constructor.prototype);  // true
```
+ 获取实例对象的原型对象，有三种方法：
```js
// 示例1：
var P = function (){}
var p = new P();
console.log(p.__proto__ === P.prototype);   // true
console.log(p.__proto__ === p.constructor.prototype);   // true
```
# 5 constructor
## 5.1 基本概念
+ **constructor属性**：`prototype`对象有一个`constructor`属性，默认指向prototype对象所在的构造函数。
```js
// 示例1：
function P() {}
P.prototype.constructor === P // true
```
+ **constructor继承性**：由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承
```js
// 示例1：
function P() {}
var p = new P();

// p.constructor属性是继承原型的
p.constructor === P // true
p.constructor === P.prototype.constructor // true
```
## 5.2 constructor作用
+ ***constructor作用1***：可以得知某个实例对象，到底是哪一个构造函数产生的
```js
// 示例1：
function F() {};
var f = new F();

f.constructor === F // true
```
+ ***constructor作用2***：可以通过实例对象获取构造函数；再利用构造函数创建实例对象
```js
// 示例1：
function F() {};
var f = new F();
var obj = new f.constructor();
```

+ ***constructor作用3***：如果不能确定constructor属性是什么函数，可以通过`name`属性，从实例得到构造函数的名称
```js
// 示例1：
function F() {};
var f = new F();
f.constructor.name  // F
```
## 5.3 constructor注意点
+ `constructor`: 表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错
```js
// 示例1：
// 坏的写法
C.prototype = {
  method1: function (...) { ... },
  // ...
};

// 好的写法
C.prototype = {
  constructor: C,
  method1: function (...) { ... },
  // ...
};

// 更好的写法
C.prototype.method1 = function (...) { ... };
```