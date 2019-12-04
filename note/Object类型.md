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
## 4.2 其他方法
+ `Object.create()`：该方法可以指定原型对象和属性，返回一个新的对象。
+ `Object.getPrototypeOf()`：获取对象的原型对象。
# 5 实例方法
+ 除了静态方法，还有不少方法定义在Object.prototype对象。它们称为实例方法，所有Object的实例对象都继承了这些方法
## 5.1 Object.prototype.valueOf()


## 5.2 Object.prototype.toString()


## 5.3 Object.prototype.toLocaleString()

## 5.4 Object.prototype.hasOwnProperty()

## 5.5 Object.prototype.isPrototypeOf()

## 5.6 Object.prototype.propertyIsEnumerable()
