# 1. Object构造方法

```js
// 方式1: new Object()
var person = new Object();

// 方式2：通过对象字面量
var person = {
    age: 18
};
// 方式3：通过Object.create()

// 方式4： 通过Object()
```

## 1.1 Object() && new Object()
+ 备注：虽然用法相似，但是Object(value)与new Object(value)两者的语义是不同的，Object(value)表示将value转成一个对象，new Object(value)则表示新生成一个对象，它的值是value
+ Object(): 将任意值转为对象
+ Object()工具方法转换法则：
+ **转换法则**：
    - 参数是原始类型值，则返回原始类型值对应的包装对象
    - 参数是一个对象，它总是返回该对象，不用转换
    - 参数为空（或者为undefined和null），Object()返回一个空对象

```js
// 示例1：
var obj = Object(1);
obj instanceof Object // true

// 示例2：
var obj = new Object();
```

# 2. Object静态方法
## 2.1 Object.create()
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

## 2.2 Object.keys()，Object.values()，Object.entries()
+ `Object.keys(参数对象)`: ES5 引入，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名
+ `Object.values(参数对象)`: 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值
    - 参数是数组，则返回每个字符组成的数组
    - 如果参数不是对象，Object.values会先将其转为对象。
        - 【字符串会先转成一个类似数组的对象】
        - 由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组
+ `Object.entries()`: 返回一个entry键值对数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组
    - 用途：可以将对象转为map结构

```js
// 示例1：
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)    // ["foo", "baz"]

// 示例2：
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)  // ["bar", 42]

// 示例3：
Object.values('foo')    // ['f', 'o', 'o']

// 示例4：
Object.values(42) // []
Object.values(true) // []
```

```js
// 示例1：
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj) // [ ["foo", "bar"], ["baz", 42] ]

// 示例2：
let obj = { one: 1, two: 2 };
for (let [k, v] of Object.entries(obj)) {
  console.log(
    `${JSON.stringify(k)}: ${JSON.stringify(v)}`
  );
}
// "one": 1
// "two": 2

// 示例3：
const obj = { foo: 'bar', baz: 42 };
const map = new Map(Object.entries(obj));
map // Map { foo: "bar", baz: 42 }
```


```js
// for-in 和 for-of的区别：in获取的是元素的下标， of获取的是元素

let aa = [11,22]

for(let i in aa){
    console.log(i) // 0, 1
}

for(let i of aa){
    console.log(i) // 11, 12
}
```

## 2.3 Object.fromEntries()
+ `Object.fromEntries()`: 是Object.entries()的逆操作，用于将一个entry键值对数组转为对象

```js
// 示例1：
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);
Object.fromEntries(entries)     // { foo: "bar", baz: 42 }
```

## 2.4 Object.getOwnPropertyNames()
+ **定义**: 参数是一个对象；返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名;包含不可枚举的属性名

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

## 2.5 Object.getPrototypeOf() && Object.setPrototypeOf()
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

## 2.7 Object.is()
+ 相等运算符（==）: 会自动转换数据类型
+ 严格相等运算符（===）: 缺点是 NaN不等于自身，以及+0等于-0
+ Object.is跟`===`基本一样；不同之处只有两个：一是+0不等于-0，二是NaN等于自身

```js
// 示例1：
Object.is('foo', 'foo') // true
Object.is({}, {})   // false

// 示例2：
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

## 2.8 Object.assign()
+ `Object.assign(target, src1, src2...)`: 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
+ Object.assign方法实行的是浅拷贝，而不是深拷贝
+ **限制点**：
    - Object.assign只拷贝源对象的自身属性（不拷贝继承属性）
    - 不拷贝不可枚举的属性（enumerable: false
+ **注意点**: 
    - 同名属性后面的属性会覆盖前面的属性。
    - 只有一个参数，Object.assign会直接返回该参数
    - 目标参数：如果目标参数不是对象，则会先转成对象，然后返回；（目标位置不能出现undefined和null，由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。源位置可以）
    - 源参数：对象都可以，非对象中除了字符串会以`数组形式`，拷贝入目标对象，其他值都不会产生效果

```js
// 示例1：
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
```js
// 示例2：
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

+ 对数组的处理

```js
// 示例1：同名下标的值替换
Object.assign([1, 2, 3], [4, 5])    // [4, 5, 3]
```
## 2.9 Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
## 2.10 Object.defineProperty()：通过描述对象，定义某个属性。
## 2.11 Object.defineProperties()：通过描述对象，定义多个属性。
## 2.12 Object.getOwnPropertyDescriptors()



# 3. Object实例方法
## 3.1 Object.prototype.valueOf()
## 3.2 Object.prototype.toString()
## 3.3 Object.prototype.toLocaleString()
## 3.4 Object.prototype.isPrototypeOf()
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

## 3.5 Object.prototype.hasOwnProperty()
+ `hasOwnProperty`: 返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上
+ **作用**：可用于遍历对象属性时只遍历自身属性
```js
// 示例1：
Date.hasOwnProperty('length') // true
Date.hasOwnProperty('toString') // false
```

# 4. Object实例属性
## 4.1 Object.prototype.__proto__
+ __proto__调用的是Object.prototype.__proto__
+ `__proto__`: 指向当前对象的原型对象，即构造函数的prototype属性。
+ __proto__属性只有浏览器才需要部署，其他环境可以不部署
```js
// 示例1：
ar obj = new Object();
obj.__proto__ === Object.prototype  // true
obj.__proto__ === obj.constructor.prototype // true
```
