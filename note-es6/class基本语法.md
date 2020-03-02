# 1 简介
## 1.1 基本理解
+ 类可以看做构造函数，类的所有方法都定义在类的prototype属性上面；
```js
// 示例1：类原型对象的方法
class A {
    say(){}
}
// 相当于
class A {
    A.prototype.say = function(){}
}

// 示例2：类原型属性
A.prototype.age = 18;
```
+ 所有不是直接定义在对象本身上的属性都定义在原型上
+ 在js中对象不能调用静态属性或者说类属性
```js
// 示例1：ES5定义属性
function Point(x, y) {
    // ES5 定义对象属性
    this.x = x;
    this.y = y;
}

// ES5：定义对象方法(也是在原型的方法)
Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
// ES5 定义对象属性
p.z = "z";
// ES5 定义静态属性
Point.z = "z";
// ES5 定义静态方法
Point.say = function(){
    console.log("Es5静态方法")
}
console.log(Point.prototype.constructor === Point); // true
```

```js
// 示例1：ES6定义属性
class Bar {
    age = 18;               // ES6定义 对象属性2【类的最顶端】
    static grade = 18;      // ES6定义 静态属性
    constructor() {
        this.i = 10;        // ES6定义 对象属性1
    }
    // ES6 定义对象原型方法
    doStuff() {
        console.log('stuff');
    }
    static say(){}          // ES6 定义静态方法
}
var b = new Bar();
console.log(b.doStuff ===  Bar.prototype.doStuff); // true
Bar.grade = 18;             // ES6定义 静态属性
Bar.foo = function(){};     // ES6定义 静态方法
console.dir(b);
```

## 1.2 注意点【es5和es6类的简单区别】:
+ 1. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
+ 2. 类必须使用new调用，否则会报错; 普通构造函数可以不用new
+ 3. 类和模块的内部，默认就是严格模式
+ 4. 类不存在变量提升（hoist）
+ 5. 【name】属性总是返回紧跟在class关键字后面的类名 `class Point {} Point.name // "Point"`
+ 6. 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数
+ 7. this指向：类方法中的this默认指向实例；如果将类方法在其他环境作用域中调用默认指向undefined(ES5指向window)
    - 方法1：在构造方法中绑定this，这样就不会找不到print方法了
    - 方法2：箭头函数（箭头函数内部的this指向箭头函数定义所在的作用域）
```js
// 示例1：
class Point {
  constructor(x, y) {}

  toString() {}
}
Object.keys(Point.prototype)    // []
Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]

// 示例2：
var Point = function (x, y) {};

Point.prototype.toString = function() {};
Object.keys(Point.prototype)    // ["toString"]   ES5 的写法，toString方法就是可枚举的
Object.getOwnPropertyNames(Point.prototype) // ["constructor","toString"]
```
```js
// 示例1：this指向
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}
const logger = new Logger();
let printName = logger.printName;
printName();

// 解决this指向方法1：
constructor() {
    this.printName = this.printName.bind(this);
}

// 解决this指向方法2：
constructor() {
    this.getThis = () => this;
}

```
## 1.3 constructor()：
    - 1. constructor方法是类的默认方法，通过new命令生成对象时自动调用。一个类必须有constructor方法，如果没有显式定义，默认添加空constructor()
    - 2. constructor()返回值：默认返回实例对象（即this）；也可以指定返回其他对象，那么此时返回的其他对象就不是类的实例
```js
// 示例1：
class Foo {
  constructor() {
    return Object.create(null);
  }
}
new Foo() instanceof Foo    // false
```
## 1.4 属性表达式
+ 类的属性名，可以采用表达式
```js
// 示例1：
let methodName = 'getArea';
class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```
## 1.5 Class 表达式
+ 与函数一样，类也可以使用表达式的形式定义
+ 类表达式内部类名不使用的话，可以省略
```js
// 示例1：Me只能在内部使用，在外部只能用MyClass引用
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined


// 示例2：
const MyClass = class { /* ... */ };
```
+ 采用 Class 表达式，可以写出立即执行的 Class
```js
// 示例1：
let person = new class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}('张三');
person.sayName(); // "张三"
```
# 2 静态方法
+ 类方法前加static关键字，表示该方法不会被实例继承，直接通过类来调用（对象调用静态方法报错）
+ **注意点**：
    - 1. 静态方法包含this关键字，这个this指的是类，而不是实例
    - 2. 静态方法可以与非静态方法重名
    - 3. 父类的静态方法，可以被子类继承
```js
// 示例1：
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'
```
```js
// 示例1：
class Foo {
  static classMethod() {
    return 'hello';
  }
}
class Bar extends Foo {
}
Bar.classMethod() // 'hello'
```
# 3. 实例属性
+ 实例属性除了定义在`constructor()`方法里面的`this`上面，`也可以定义在类的最顶层`
```js
// 示例1：
class foo {
    // 实例属性定义在类的最顶层
  bar = 'hello';
  baz = 'world';
  constructor() {}
}
```
# 4. 静态属性
# 5. 私有方法和私有属性(目前还不支持)
+ 在变量或者方法前加`#`
+ 私有属性和私有方法前面，也可以加上static关键字，表示这是一个静态的私有属性或私有方法【静态私有只能在类的内部调用】
```js
// 示例1：
class Foo {
  #a;           // 私有属性
  static #b = 10;       // 静态私有属性
  constructor(a) {
    this.#a = a;
  }
  #sum() {      // 私有方法
    return this.#a+1;
  }
  static #add(){    // 静态私有方法
      return Foo.#b+2;
  }
  printSum() {
    console.log(this.#sum());
    console.log(Foo.#add());
  }
}

var foo = new Foo(20);
foo.printSum();
```
# 6 new.target 属性
+ `new.target`: 一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的
```js
// 示例1：
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}
var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```
+ 注意点：
    - 1. Class 内部调用new.target，返回当前 Class
    - 2. 子类继承父类时，new.target会返回子类【利用这个特点，可以写出不能独立使用、必须继承后才能使用的类】
```js
// 示例1：
class Rectangle {
  constructor() {
    //   new.target === Square
    console.log(new.target === Rectangle);
  }
}
class Square extends Rectangle {
  constructor() {
    super();
  }
}
var obj = new Square(); // 输出 false
```

```js
// 示例1：
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}
class Rectangle extends Shape {
  constructor(length, width) {
    super();
  }
}
var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```
