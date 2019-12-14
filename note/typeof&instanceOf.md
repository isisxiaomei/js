# 1. typeof
+ typeof
    - 只能判断：如数字、字符串、布尔值、undefined、函数
    - typeof不能判断null
    - typeof判断引用类型都是object
+ `Object.prototype.toString.call()`
    - 5 ——> '[object Number]'
    - "abc" ——> '[object String]'
    - true  ——>  '[object Boolean]'
    - null  ——>  '[object Null]'
    - undefined  ——>  '[object Undefined]'
    - [1, 3, 5]  ——>  '[object Array]'
    - function(){}  ——>  '[object Function]'
    - new Date()  ——>  '[object Date]'
    - /abc/  ——>  '[object RegExp]'
```js
// 示例1：
function fun(...args){
    // 判断args是什么类型；返回字符串"[object Array]"
    console.log(Object.prototype.toString.call(args));      //"[object Array]"
}
fun(1, 2, 3);
```
# 2. instanceof
+ ***概念***：instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例
    - `实例 instanceof 构造函数`
+ **深入理解**：`instanceof` 会检查右边构建函数的原型对象（prototype), 是否在左边对象的原型链上; 由于instanceof检查整个原型链，这样导致一个实例对象可能对多个构造函数返回true
+ **注意**：
    - 有一种特殊情况，就是左边对象的原型链上，只有null对象。这时，instanceof判断会失真
    - instanceof运算符只能用于对象，不适用原始类型的值
    - 对于undefined和null，instanceof运算符总是返回false
```js
// 示例1：
var v = new Vehicle();
v instanceof Vehicle // true
v instanceof Object // true

// 示例2：
v instanceof Vehicle    // 等同于
Vehicle.prototype.isPrototypeOf(v)

// 示例3：
null instanceof Object // false

// 示例4：
var obj = Object.create(null);
typeof obj // "object"
Object.create(null) instanceof Object // false

// 示例5：
var s = 'hello';
s instanceof String // false  字符串不是String对象的实例（因为字符串不是对象），所以返回false
```
+ ***作用***：
    - 作用1：instanceof运算符的一个用处，是判断值的类型
    - 作用2：可以巧妙地解决，调用构造函数时，忘了加new命令的问题。
```js
// 示例1：
function Fubar (foo, bar) {
  if (this instanceof Fubar) {
    this._foo = foo;
    this._bar = bar;
  } else {
    return new Fubar(foo, bar);
  }
}
```