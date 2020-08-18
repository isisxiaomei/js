# 继承
+ **概念**：如果你能通过***某种方式***，可以让某个对象访问到其他对象中的属性、方法，那么我们就把这种方式称之为继承。
+ **背景**：有些对象会有方法，而这些方法都是函数（函数也是对象），如果把这些方法都放在构造函数中声明，则会产生内存浪费

# 继承的几种方式
+ 思想：两个对象之间实现了继承，而这种继承方式是通过创建SuperType的实例并将该实例赋给subType.prototype实现的。实现的本质就是重写了原型对象。
## 1. 原型链继承
```js
function SuperType(){
 this.property=true;                // 缺点2. 子类没办法给父类传参
 this.color = ["red", "yellow"]     // 缺点1. 实例共享了应用类型
}
 
SuperType.prototype.getSuperValue=function(){
  return this.property;
}
 
function SubType(){
  this.subproperty=false;
}

SubType.prototype=new SuperType();
// 注意这里需要手动改变constructor的指向
SubType.prototype.constructor = SubType

SubType.prototype.getSubValue=function(){
     return this.property;
};

var instance=new SubType();
console.log(instance.getSuperValue()); //true;
```
```js
// 优点：


// 缺点：
1. 有引用类型的时候，各个实例对该引用的操作会影响其他实例。
2. 没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数。
```

## 2. 借用构造函数

```js
function SuperType(){
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.say = function () {
   console.log(this.colors)
}
function SubType(){
   //继承了SuperType
  SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green"
instance2.say();        // 会报错

```
```js
// 优点：解决了原型链的缺点
1. 提供了引用类型的共享
2. 子类可以通过call传递参数到父类

// 缺点：
1. 不能继承父类的方法，父类的原型对象方法不能被使用
```

## 3. 组合继承
+ 思想：结合原型链继承+构造函数继承的优点
```js
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
   alert(this.name);
};
function SubType(name, age){
//继承属性
  SuperType.call(this, name);   // 第一次调用父类构造函数
  this.age = age;
}
//继承方法
SubType.prototype = new SuperType();    // 第二次调用父类构造函数
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```
```js
// 优点：
1. 引用类型可以共享
2. 可子类可以向父类传参
3. 子类可以继承父类的方法

// 缺点：
1. 调用了两次父类的构造函数
```


## 4. 原型式继承
```js
// 方式1：

// 方式2：
var person = {
    name: "Bob",
    friends: ["a", "b"]     // 引用类型被共享
}
var p1 = Object.create(person);
p1.name     // Bob
```
```js
// 优点：

// 缺点：
1. 引用类型的值还是被共享
```
## 5. 寄生式继承
```js
```
```js
// 优点：

// 缺点：
```

## 6. 寄生组合式继承
```js
```
```js
// 优点：

// 缺点：
```