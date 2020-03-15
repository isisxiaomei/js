<!-- TOC -->

- [1 简介](#1-%e7%ae%80%e4%bb%8b)
- [2 Object.getPrototypeOf()](#2-objectgetprototypeof)
- [3 super 关键字](#3-super-%e5%85%b3%e9%94%ae%e5%ad%97)
  - [3.1 super用法：](#31-super%e7%94%a8%e6%b3%95)
    - [3.1.1 super当做函数](#311-super%e5%bd%93%e5%81%9a%e5%87%bd%e6%95%b0)
    - [3.1.2 super当做对象](#312-super%e5%bd%93%e5%81%9a%e5%af%b9%e8%b1%a1)
- [4 类的 prototype 属性和__proto__属性](#4-%e7%b1%bb%e7%9a%84-prototype-%e5%b1%9e%e6%80%a7%e5%92%8cproto%e5%b1%9e%e6%80%a7)
- [5 原生构造函数的继承](#5-%e5%8e%9f%e7%94%9f%e6%9e%84%e9%80%a0%e5%87%bd%e6%95%b0%e7%9a%84%e7%bb%a7%e6%89%bf)

<!-- /TOC -->
# 1 简介
+ `extends`:
    - 1. Class 可以通过extends关键字实现继承；
    - 2. 会继承父类所有属性（包括静态属性方法）
```js
// 示例1：
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
    // 默认添加
  constructor(...args) {
    super(...args);
  }
}
```

```js
// 示例1：继承静态方法
class A {
  static hello() {
    console.log('hello world');
  }
}
class B extends A {
}

B.hello()  // hello world
```
# 2 Object.getPrototypeOf()
+ `Object.getPrototypeOf()`: 可以用来从子类上获取父类; 也可以判断对象的原型对象是谁
```js
Object.getPrototypeOf(B) === A  // true
```
# 3 super 关键字
+ 注意点：没有调用super之前不能使用子类的this
+ super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)
## 3.1 super用法：
+ 注意点：使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错
### 3.1.1 super当做函数
+ 当做函数代表调用父类的构造函数【super()只能用在子类的构造函数之中，用在其他地方就会报错】
```js
// 示例1：super在普通方法之中，指向A.prototype，所以super.p()就相当于A.prototype.p()
class A {
  p() {
    return 2;
  }
}
A.prototype.age = 18;

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
    console.log(super.age); // 18
  }
}

let b = new B();
```
### 3.1.2 super当做对象
+ 1. 在普通方法中，指向父类本身原型对象（而不是类中的this实例对象）
```js
// 示例1：因为属性p是A原型对象中的构造函数构造出来的实例对象this，而不是A原型对象
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m // undefined
```
+ 2. super作为对象在静态方法中，指向父类而不是父类的原型对象【备注：在子类的静态方法中通过super调用父类的方法时，父类被调用的方法内部的this指向当前的子类，而不是子类的实例】
```js
// 示例1：
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}
class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}
Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
```
```js
// 示例1：
class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    //   默认这里的this指向A；super.print()调用时  这里的this指向子类B，而不是子类的实例
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  static m() {
    super.print();
  }
}

B.x = 3;
B.m() // 3
```

+ 3. 在子类普通方法中通过super调用父类的方法时(方法还是父类的方法只是此时父类方法内部的this是子类实例)，方法内部的this指向当前的子类实例; 并且在子类普通方法中如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性

```js
// 示例1：在子类普通方法中如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;    // 相当于this.x = 3
    console.log(super.x); // undefined  因为log是普通函数不是B的函数
    console.log(this.x); // 3
  }
}
let b = new B();
```
```js
// 示例1：super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象
class Parent {
    static myMethod(msg) {
        console.log('static', msg);
    }

    myMethod(msg) {
        console.log(this.constructor.name); // Child
        console.log('instance', msg);
    }
}

class Child extends Parent {
    static myMethod(msg) {
        // 相当于Parent.myMethod(msg)
        super.myMethod(msg);
    }

    myMethod(msg) {
        // 此时调用父类myMethod方法，并且父类myMethod方法中的this是子类实例
        super.myMethod(msg);
    }
}
Child.myMethod(1); // static 1
var child = new Child();
child.myMethod(2); // instance 2
```

# 4 类的 prototype 属性和__proto__属性
+ class继承有两条继承链：类构造函数继承（静态属性继承）；实例原型对象继承（实例属性继承）
```js
// 示例1：
class A {
}
class B extends A {
}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```
+ 类继承的本质：
```js
// 示例1：
class A {
}

class B {
}
Object.setPrototypeOf(B.prototype, A.prototype);    // B 的实例继承 A 的实例
Object.setPrototypeOf(B, A);    // B 继承 A 的静态属性

const b = new B();
```
+ 两种情况对比
```js
// 示例1：继承Object
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true

// 示例2：不存在任何继承
class A {
}
A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```
+ 实例的__proto__属性
```js
// 示例1：
class A {}
class B extend A{}
var b = new B();
b.__proto__.__proto__ = A.prototype
```
# 5 原生构造函数的继承
+ 注意点: 继承Object的子类,无法通过super方法向父类Object传参,这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数
```js
// 示例1：
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false
```

Mixin 模式的实现