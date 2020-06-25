# 1 概括
+ 大多数引用类型都是Object类型的实例

## 1.1 创建object实例3种方式
+ 备注：通过对象字面量创建对象不会调用Object构造函数
```js
// 方式1: 通过new操作符后跟Object构造函数
var person = new Object();

// 方式2：通过对象字面量
var person = {
    age: 18
};

// 方式3：通过Object.create()
```
# 2 普通函数Object()
+ **概念**: 可以当作工具方法使用，将任意值转为对象
+ **转换法则**：
    - 参数是原始类型值，则返回原始类型值对应的包装对象
    - 参数是一个对象，它总是返回该对象，不用转换
    - 参数为空（或者为undefined和null），Object()返回一个空对象
```js
// 示例1：
var obj = Object(1);
obj instanceof Object // true
obj instanceof Number // true
```
```js
// 示例1：
var arr = [];
var obj = Object(arr); // 返回原数组
obj === arr // true

var value = {};
var obj = Object(value) // 返回原对象
obj === value // true

var fn = function () {};
var obj = Object(fn); // 返回原函数
obj === fn // true
```

```js
// 示例1：参数是null
var obj = Object();
// 等同于
var obj = Object(undefined);
var obj = Object(null);
obj instanceof Object // true
```
+ **Object()作用**：可以写一个判断变量是否为对象的函数
```js
// 示例1：
function isObject(value) {
  return value === Object(value);
}
```
# 3 构造函数Object()
+ **作用**：用于创建新对象
+ **注意点**：Object(value)与new Object(value)两者的语义是不同的，Object(value)表示将value转成一个对象，new Object(value)则表示新生成一个对象，它的值是value；
+ **生成对象的规则同**：`new Object()`生成新对象的规则和`Object()`转换对象的规则一样
```js
// 示例1：
var obj = new Object();
```

# 4 Object的静态方法
+ 所谓`静态方法`，是指部署在Object对象自身的方法
## 4.1 Object.keys()和Object.getOwnPropertyNames()
+ **定义**: 参数是一个对象；返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名
+ **作用**：用来遍历对象的属性；或者获取对象属性个数
+ **区别**：Object.keys方法只返回可枚举的属性；Object.getOwnPropertyNames方法还返回不可枚举的属性名
```js
// 示例1：
var obj = {
  p1: 123,
  p2: 456
};
Object.keys(obj) // ["p1", "p2"]
Object.getOwnPropertyNames(obj) // ["p1", "p2"]

// 示例2： 数组的length属性是不可枚举的属性
var a = ['Hello', 'World'];
Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]

// 示例3：
Object.keys(obj).length // 2
```
## 4.2 Object.create()
+ `Object.create()`：接受一个对象作为参数，然后以参数对象为原型，返回一个新的实例对象
+ **注意点**：使用Object.create方法的时候，必须提供对象原型，即参数不能为空，或者不是对象，否则会报错
+ 如果想要生成一个不继承任何属性（比如没有toString和valueOf方法）的对象，可以将Object.create的参数设为null
```js
// 示例1：
// 原型对象
var A = {
  print: function () {
    console.log('hello');
  }
};

// 实例对象
var B = Object.create(A);

Object.getPrototypeOf(B) === A // true
B.print() // hello
B.print === A.print // true
```

```js
// 示例1：因为原型对象是null所有不具有 toString和valueOf 方法；因为这些方法都是在Object.prototype中的
var obj = Object.create(null);
obj.valueOf()
// TypeError: Object [object Object] has no method 'valueOf'
```

```js
// 示例1:
Object.create()
// TypeError: Object prototype may only be an Object or null
Object.create(123)
// TypeError: Object prototype may only be an Object or null
```

## 4.3 Object.getPrototypeOf() 和 Object.setPrototypeOf()
+ `Object.getPrototypeOf()`：接受一个参数对象，返回参数对象的原型
+ `Object.setPrototypeOf()`: 接受两个参数，第一个是现有对象，第二个是原型对象；设置参数对象的原型，并返回该参数对象
```js
// 示例1：
var F = function () {};
var f = new F();
Object.getPrototypeOf(f) === F.prototype // true
```
```js
// 示例1：特殊值
// 空对象的原型是 Object.prototype
Object.getPrototypeOf({}) === Object.prototype // true

// Object.prototype 的原型是 null
Object.getPrototypeOf(Object.prototype) === null // true

// 函数的原型是 Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype // true

```

```js
// 示例1：
var a = {};
var b = {x: 1};
Object.setPrototypeOf(a, b);

Object.getPrototypeOf(a) === b // true
a.x // 1
```

# 5 实例方法
+ 除了静态方法，还有不少方法定义在Object.prototype对象。它们称为实例方法，所有Object的实例对象都继承了这些方法
## 5.1 Object.prototype.valueOf()
## 5.2 Object.prototype.toString()
+ 定义：Object.prototype.toString方法返回对象的类型字符串
```js
var obj = {};
obj.toString() // "[object Object]"

// 示例2：不同数据类型的Object.prototype.toString方法返回值如下：

数值：            返回[object Number]。
字符串：          返回[object String]。
布尔值：          返回[object Boolean]。
undefined：      返回[object Undefined]。
null：           返回[object Null]。
数组：            返回[object Array]。
arguments 对象：  返回[object Arguments]。
函数：            返回[object Function]。
Error 对象：      返回[object Error]。
Date 对象：       返回[object Date]。
RegExp 对象：     返回[object RegExp]。
其他对象：         返回[object Object]。
```
+ 注意点：数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype。toString方法；为了解决这个问题，可以使用call指定对象调用的都是Object的toString方法
```js
// 示例1：
[1, 2, 3].toString() // "1,2,3"
'123'.toString() // "123"
```
+ 应用：判断数据类型`Object.prototype.toString.call(value)`; 利用这个特性可以实现typeof
```js
// 示例1：
var obj = {};
Object.prototype.toString.call(obj) // "[object Object]"
Object.prototype.toString.call(123) // "[object Number]"
```
## 5.3 Object.prototype.toLocaleString()

## 5.4 Object.prototype.hasOwnProperty()
+ `hasOwnProperty`: 返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上
+ **作用**：可用于遍历对象属性时只遍历自身属性
```js
// 示例1：
Date.hasOwnProperty('length') // true
Date.hasOwnProperty('toString') // false
```
## 5.5 Object.prototype.isPrototypeOf()
+ `Object.prototype.isPrototypeOf()`: 用来判断对象是否为参数对象的原型
+ 由于Object.prototype处于原型链的最顶端，所以对各种实例都返回true，只有直接继承自null的对象除外
```js
// 示例1：
var o1 = {};
var o2 = Object.create(o1);
o1.isPrototypeOf(o2) // true  o1是o2的原型
```
```js
// 示例1：
Object.prototype.isPrototypeOf({}) // true
Object.prototype.isPrototypeOf([]) // true
Object.prototype.isPrototypeOf(/xyz/) // true
Object.prototype.isPrototypeOf(Object.create(null)) // false
```
## 5.6 Object.prototype.__proto__
+ `__proto__`: 指向当前对象的原型对象，即构造函数的prototype属性。
+ __proto__属性只有浏览器才需要部署，其他环境可以不部署
```js
// 示例1：
ar obj = new Object();
obj.__proto__ === Object.prototype  // true
obj.__proto__ === obj.constructor.prototype // true
```
## 5.7 Object.prototype.propertyIsEnumerable()

# 6 in 运算符和 for...in 循环
+ `in操作符`：返回一个布尔值，表示一个对象是否具有某个属性。`in`操作符和Object.keys()的区别是Object.keys()只返回对象自身属性，`in`不区分该属性是对象自身的属性，还是继承的属性。
+ **作用**：`in`运算符常用于检查一个属性是否存在
+ `for...in`: 获得对象的`所有可遍历属性`（不管是自身的还是继承的）
+ 备注： 一般情况判断某个属性在不在对象中，尽量使用`in`操作符；
```js
// 示例1：避免使用obj.age的方式判断是否包含age属性
var obj = {
  age: 0
}
if (obj.age){
  // 此时obj.age == 0，包含age属性，但是if的结果确是false；所以尽量使用in操作符
}
```