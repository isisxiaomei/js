# 1 概述
+ 背景：ES5 的对象属性名都是字符串，这容易造成属性名的冲突；ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值
+ 参数：
    - `Symbol(参数是字符串);`： 表示对 Symbol 实例的描述
    - `Symbol(参数是对象);`： 就会调用该对象的toString方法，然后才生成一个 Symbol 值
```js
// 示例1：
let s = Symbol();
typeof s    // "symbol"

// 示例2：
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```
+ 注意点：
    - Symbol 值不能与其他类型的值进行运算，会报错
    - Symbol 值可以显式转为字符串；Symbol 值也可以转为布尔值，但是不能转为数值
```js
// 示例1：
let sym = Symbol('My symbol');
"your symbol is " + sym     // TypeError: can't convert symbol to string

// 示例2：
let sym = Symbol('My symbol');
String(sym)                 // 'Symbol(My symbol)'
sym.toString()              // 'Symbol(My symbol)'
```
# 2 Symbol.prototype.description
+ `Symbol.prototype.description`： 获取描述符
```js
// 示例1：
const sym = Symbol('foo');
sym.description     // "foo"
```

# 3 作为属性名的 Symbol
+ 注意点：
    - Symbol 值作为对象属性名时，不能用点运算符。【因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值】
    - 在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中
    - Symbol 类型还可以用于定义一组常量
```js
// 示例1：
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```
```js
// 示例1：
const mySymbol = Symbol();
const a = {};
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"

// 示例2：
let s = Symbol();
let obj = {
  [s]: function (arg) { ... }
};
obj[s](123);
```
```js
// 示例1：
const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');
```

# 4 属性名遍历
+ `Symbol 作为属性名`: 遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回
+ `Object.getOwnPropertySymbols()`: 获取指定对象的所有 Symbol 属性名。该方法返回一个数组.【不包含继承的】
```js
// 示例1：
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols       // [Symbol(a), Symbol(b)]
```

# 5 Symbol.for()，Symbol.keyFor()
+ `Symbol.for()`: 可以实现重新使用同一个Symbol值; 接受一个字符串作为参数，在全局环境中搜索有无以该参数作为名称的 Symbol值。有则返回这个 Symbol 值，否则新建一个以该字符串为名称的 Symbol 值，并将`其注册到全局`
+ `Symbol.keyFor()`: Symbol.keyFor()方法返回一个`已登记的` Symbol 类型值的key; 找不到返回undefined

+ `Symbol.for()与Symbol()区别`：都会生成新的 Symbol；Symbol.for()会被登记在全局环境中供搜索，Symbol()不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值；由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值
```js
// 示例1：
Symbol.for("bar") === Symbol.for("bar") // true
Symbol("bar") === Symbol("bar") // false

// 示例2：
var cc = Symbol('ff');
var bb = Symbol.for('ff');
bb === cc;  // false
```
# 6 内置Symbol值
+ 除了自定义Symbol 值以外，ES6还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法
## 6.1 Symbol.hasInstance
## 6.2 Symbol.isConcatSpreadable
## 6.3 Symbol.species

## 6.4 Symbol.match

## 6.5 Symbol.replace

## 6.6 Symbol.search

## 6.7 Symbol.split

## 6.8 Symbol.iterator
+ 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。
+ 对象进行for...of循环时，会调用Symbol.iterator方法，返回该对象的默认遍历器
```js
// 示例1：
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]
```