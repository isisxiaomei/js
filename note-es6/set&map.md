<!-- TOC -->

- [1 Set](#1-set)
  - [1.1 基本用法](#11-%e5%9f%ba%e6%9c%ac%e7%94%a8%e6%b3%95)
  - [1.2 Set实例属性](#12-set%e5%ae%9e%e4%be%8b%e5%b1%9e%e6%80%a7)
  - [1.3 set实例操作方法](#13-set%e5%ae%9e%e4%be%8b%e6%93%8d%e4%bd%9c%e6%96%b9%e6%b3%95)
  - [1.4 set实例遍历方法](#14-set%e5%ae%9e%e4%be%8b%e9%81%8d%e5%8e%86%e6%96%b9%e6%b3%95)
- [2 WeakSet](#2-weakset)
- [3 Map](#3-map)
  - [3.1 基本用法](#31-%e5%9f%ba%e6%9c%ac%e7%94%a8%e6%b3%95)
  - [3.2 map实例属性](#32-map%e5%ae%9e%e4%be%8b%e5%b1%9e%e6%80%a7)
  - [3.3 map实例操作方法](#33-map%e5%ae%9e%e4%be%8b%e6%93%8d%e4%bd%9c%e6%96%b9%e6%b3%95)
  - [3.4 map遍历方法](#34-map%e9%81%8d%e5%8e%86%e6%96%b9%e6%b3%95)
  - [3.5 map应用](#35-map%e5%ba%94%e7%94%a8)
- [4 WeakMap](#4-weakmap)

<!-- /TOC -->
# 1 Set
+ ES6 提供了新的数据结构 Set。类似于数组，但成员没有重复的值
+ `Set本身是一个构造函数`，用来生成 Set 数据结构
## 1.1 基本用法
+ **用法**：Set函数可以接受一个`具有 iterable 接口的数据结构作为参数` 用来初始化。
```js
// 示例1：
const s = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);   // 2 3 5 4
}

// 示例2：
const set = new Set([1, 2, 3, 4, 4]);
[...set]    // [1, 2, 3, 4]

// 示例3：
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 示例3： 去除数组的重复成员
[...new Set(array)]

// 示例4：去除字符串里面的重复字符
[...new Set('ababbc')].join('') // "abc"
```
+ **注意点**：
    - 向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值
    - Set 内部判断两个值是否不同，类似于精确相等运算符`===`
    - 两个对象总是不相等的；两个`NaN` 总是相等的
```js
// 示例1：两个对象总是不相等的
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2
```
## 1.2 Set实例属性
+ `Set.prototype.constructor`：构造函数，默认就是Set函数。
+ `Set.prototype.size`：返回Set实例的成员总数

## 1.3 set实例操作方法
+ Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
+ Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
+ Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
+ Set.prototype.clear()：清除所有成员，没有返回值
```js
// 示例1：Array.from()将set转成数组
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```
## 1.4 set实例遍历方法
> 特别注意：Set的遍历顺序就是插入顺序
+ Set.prototype.keys()：返回键名的遍历器
+ Set.prototype.values()：返回键值的遍历器
+ Set.prototype.entries()：返回键值对的遍历器
+ Set.prototype.forEach()：使用回调函数遍历每个成员；回调函数参数依次为`键值、键名、【集合本身 可选】`；没有返回值。【和数组的此方法类似】
+ 注意点：
  - 1. 由于 Set 没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。
  - 2. Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法`Set.prototype[Symbol.iterator] === Set.prototype.values`
```js
// 示例1：
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

```js
// 示例1：
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```
```js
// 示例1：
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

```js
// 示例1：set实现交并差集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```
# 2 WeakSet
+ WeakSet 结构与 Set 类似，也是不重复的值的集合。
+ WeakSet和Set的两个区别：
  - WeakSet 的成员只能是对象，而不能是其他类型的值。（WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。））
  - WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
```js
// 示例1：
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set


// 示例2：
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
```

```js
// 示例1：
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

// 示例2：
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```
+ 注意点：WeakSet 没有size属性，WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失



# 3 Map
## 3.1 基本用法
+ 背景：由于对象只接受字符串作为键名；为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
+ 本质：Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应
+ map构造函数参数：
  - 1. Map可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组
  - 2. 任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。这就是说，数组、Set和Map都可以用来生成新的 Map
```js
// 示例1：使用数组生成map
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

// 示例2：使用set生成map
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

// 示例3：使用map生成map
const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```

+ map注意点：
  - 1. 如果读取一个未知的键，则返回undefined
  - 2. 只有对同一个对象的引用，Map 结构才将其视为同一个键
  - 3. 不能使用对象生成map，因为对象不是可迭代的
  - 4. Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键
  - 5. undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键
  - 6. Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
## 3.2 map实例属性
+ `size属性`: 返回 Map 结构的成员总数
## 3.3 map实例操作方法
+ Map.prototype.set(key, value): set方法返回的是当前的Map对象，因此可以采用链式写法
+ Map.prototype.get(key): get方法读取key对应的键值，如果找不到key，返回undefined
+ Map.prototype.has(key): has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
+ Map.prototype.delete(key): delete方法删除某个键，返回true。如果删除失败，返回false
+ Map.prototype.clear(): clear方法清除所有成员，没有返回值。
```js
// 示例1：
const m = new Map();
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

// 示例2：
m.set(undefined, 'nah');
m.has(undefined)     // true
m.delete(undefined)
m.has(undefined)       // false

map.size // 2
map.clear()
map.size // 0
```

## 3.4 map遍历方法
> Map 的遍历顺序就是插入顺序
+ Map.prototype.keys()：返回键名的遍历器。
+ Map.prototype.values()：返回键值的遍历器。
+ Map.prototype.entries()：返回所有成员的遍历器。
+ Map.prototype.forEach()：遍历 Map 的所有成员
+ map遍历注意点：
  - 1. Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法 `map[Symbol.iterator] === map.entries`
```js
// 示例1：
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```
## 3.5 map应用
+ map和数组互转
```js
// 示例1：map转数组
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]   // [1, 2, 3]
[...map.values()]   // ['one', 'two', 'three']
[...map.entries()]  // [[1,'one'], [2, 'two'], [3, 'three']]
[...map]            // [[1,'one'], [2, 'two'], [3, 'three']]

// 示例2：数组转map
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
```
+ map和对象互转
```js
// 示例1：map转成对象
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)    // { yes: true, no: false }

// 示例2：对象转map
function toMap(obj){
  let map = new Map();
  for(let key of Object.keys(obj)){
    map.set(key, obj[key]);
  }
  return map;
}
toMap({yes: true, no: false})
```

+ map和json互转
```js
// 示例1：map转成json
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'


// 示例2：
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

```js
// 示例1：json转成map
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}


// 示例2：
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```
+ map借用数组filter()和map()
```js
// 示例1：
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
```
# 4 WeakMap
+ WeakMap结构与Map结构类似，也是用于生成键值对的集合。
+ WeakMap与Map的区别有两点：
  - WeakMap只接受对象作为键名（null除外）
  - WeakMap的键名所指向的对象（注意：WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用）
+ 以下阮老师的解析可以更好理解弱引用理解WeakMap
```js
// 示例1：
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];

// 上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。

// 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。

// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;

// 上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露
// WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用
```

+ 语法区别：
  -  一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性
  -  二是无法清空，即不支持clear方法
+ WeakMap只有四个方法可用：`get()、set()、has()、delete()`。