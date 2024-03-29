# 函数的4种调用方式
+ `在es6箭头函数之前的时代`，函数内部的this是由函数的调用方式决定的
+ 函数内部的this跟函数名大小写和书写位置(写在全局的还是局部)无关

## 1. 函数调用

```js
// 示例1：
var age = 20;
var p = {
    age: 15,
    say: function(){
        console.log(this.age);
    }
};
var fun = p.say;
fun();      // 20——>函数调用
```

```js
// 示例2：
function fn(callback){
    var age = 18;
    callback();         // 这种调用方式指向window
}
fn(function(){          //这里的匿名函数作用域是window
    console.log(age);   //undefined
    var age = 15;
});
```

## 2. 方法调用

```js
// 示例1：
var age = 20;
var p = {
    age: 15,
    say: function(){
        console.log(this.age);
    }
};
p.say();    // 15 ——>方法调用
```

```js
// 示例2：
var age = 20;
var p = {
    age: 15,
    say: function(){
        console.log(this.age);
    }
};
p.say();    // 15 ——>方法调用
var tom = { tsay: p.say, age: 10 };
tom.tsay(); //10 ——>指向tom还是方法调用
```

```js
// 示例3：
var age = 20;
function Person(){
    this.age = 15;
}
Person.prototype.run = function(){
    console.log(this.age);
}
var p = new Person();
p.run();    // 15 ——>方法调用
```

## 3. new调用(构造函数)
+ 下面有个知识点：变量声明未赋值，结果是undefined；属性不存在也是undefined

```js
// 示例1：
function Person(age){
    this.age = age;
}
//通过new的方式调用，返回的是this就是实例p对象
var p = new Person(10);
console.log(p.age);

// 此时内部的this指向window，age是全局的属性
Person(20);
```

```js
// 经典示例2(好好体会)：
function jQuuery(){
    var _init = jQuuery.prototype.init;
    return new _init();
}
jQuuery.prototype = {
    construct: jQuuery,
    length: 100,
    //注意通过new _init()调用之后，this可以访问到实例本身的属性也可以访问到实例对应的原型对象init.prototype中的属性（这里注意每个函数都有一个原型对象）;但是这里new调用返回的实例里面并没有定义length属性，原型init.prototype中也没有length属性；所以打印出undefined
    init: function(){
        //因为通过new调用的，所以此处是方法中的this指向new _init()出来的构造函数实例
        //1、先在构造函数对象实例自己的属性中找length
        //2、接着再在对象实例的原型对象_init.prototype中查找
        //3、接着在_init.prototype.prototype中查找，一直往上最终到根对象
        //4、都没有找到，说明该对象没有length属性，返回undefined
        console.log(this.length);   //undefined
    }
}

// 示例3
function jQuuery(){
    var _init = jQuuery.prototype.init;
    return new init();
}
jQuuery.prototype = {
    construct: jQuuery,
    length: 100,
    init: function(){
        //此处的this指向new _init()出来的构造函数实例
        console.log(this.length);   //100
    }
}
// 这里将_init.prototype的原型对象指向jQuuery.prototype原型对象，所以输出100
jQuuery.prototype._init.prototype = jQuuery.prototype;
jQuuery();
```

## 4. 上下文方式（call&apply&bind）
+ 见下面的`all&apply&bind`

### 4.0 写在前面
+ 每个函数都包含两个非继承而来的方法：`call()和apply()`
+ **`call()和apply()`用途**：设置函数体内的this对象值
+ **apply()和call()区别**：在接受参数的方式不同，对于call而言第一个参数都是this，变化的是其余参数传递时需要逐个列举展开
+ apply和call都是绑定this值并`立即执行`；`bind并没有立即执行函数而是创建一个新函数`，将this绑定到新函数的this上

```js
function sum(a, b, c){
    console.log(a+b+c);
}
sum.call(null, 1, 3, 5);
sum.apply(null, [1,3,5]);
```

+ 使用apply和call的好处：扩充作用域，对象不需要与方法有任何耦合

```js
//示例1：
window.color = "red";
var obj = { color: "blue" };
function sayColor(){
    console.log(this.color);
}
sayColor();             //red
obj.sayColor = sayColor;
obj.sayColor();         //blue 因为上一步函数和obj对象关联起来

// call改进版
window.color = "red";
var obj = { color: "blue" };
function sayColor(){
    console.log(this.color);
}
sayColor();             //red
sayColor.call(window);  //red
sayColor.call(this);    //red  这里传递的this就是window
sayColor.call(o);       //blue  对象和函数进行了解耦
```

### 4.1 apply
+ apply方法接受两个参数：第一个参数决定函数内部的this执行谁(也就是this)、另一个是参数数组(Array实例或者arguments对象)

```js
// 示例1：
function f(x, y){
  console.log(x + y);
}
f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2

// 示例2：应用找出数组最大值
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a) // 15
```

### 4.2 call
+ call方法接受参数：第一个参数决定函数内部的this执行谁、其余参数传递时需要逐个列举展开
+ 语法：`method.call(obj, arg1, arg2, ...)` 相当于`obj.method(arg1,arg2, ...)` 

```js
// 示例1：
function f1(){
    console.log(this);
}
f1.call([1,2,3]);       //f1函数中的this指向Array数组[1,2,3]
f1.call(1);             //f1函数中的this指向new Number(1)实例
f1.call("abc");         //f1函数中的this指向new String("abc")实例
f1.call(true);          //f1函数中的this指向new Boolean
f1.call(undefined);     //f1函数中的this指向window
f1.call(null);          //f1函数中的this指向window
// 总结如下：
//1.call如果传入引用类型，则this指向引用类型
//2.call传入undefined或者null，则this指向window
//3.call传入数组、字符串、布尔分别指向各自的构造函数实例
```

### 4.3 bind
+ es5中出现了bind(IE9+)
+ 执行bind方法会产生一个新函数实例，这个新函数里面的逻辑代码和原来的一样，唯一不同的是新函数中的this指向bind传入的参数对象
+ 语法：`newFunc = func.bind(obj, arg1, arg2...)` 相当于 `obj.func(arg1, arg2...)` 此处func和newFunc的代码一样

```js
// 示例1：基本用法
function sayColor(){
    console.log(this.color);
}
var objSayColor = sayColor.bind({ color: "blue" });
objSayColor();      //blue

// 示例1改进版：基本用法
(function sayColor(){
    console.log(this.color);
}).bind({ color: "blue" })()
```

```js
// 示例2：
var obj5 = {
    age: 18,
    run: function(){
        console.log(this);
        setTimeout(function(){
            console.log(this.age)   //undefined 因为是全局
        }, 50);
    }
};
obj5.run();
// 示例2改进版bind未出现之前通过保存this的值
var obj5 = {
    age: 18,
    run: function(){
        console.log(this);
        var that = this;
        setTimeout(function(){
            console.log(this.age)   //undefined 因为是全局
            console.log(that.age)   //18
        }, 50);
    }
};
obj5.run();

// 示例2bind改进：将setTimeout的匿名函数的中的this指向run的函数this；这样就可以访问age18
var obj5 = {
    age: 18;
    run: function(){
        console.log(this);
        setTimeout((function(){
            console.log(this.age)   //18 此时this指向obj5
        }).bind(this), 50);         //这里this指代obj5
    }
};
obj5.run();
```



# this指向问题
> 主要取决于方法.之前的对象；如果是直接调用方法则是全局对象
>> 影响this的几个点：call、apply、bind、箭头函数
+ ***理解1***：在全局函数中this等于window；而当函数被作为某个对象的方法调用时，this等于那个对象；匿名函数的执行环境具有全局性，因此其this通常指向window
+ ***理解2***：每个函数在被调用时都会自动取的两个特殊变量：this和arguments，内部函数在搜索这两个变量时，只会搜索到其活动对象位置，因此永远不可能直接访问外部函数中的这两个变量。（不过可以将外部作用于中的this保存到闭包函数可以访问中的外部变量中）

# 写在后面（好好体会下）
+ 总结：对象的属性和局部变量是不一样的，变量按作用域链关系向上查找，对象属性是按照原型链关系向上查找
+ 变量声明未赋值则为undefined；对象属性不存在则为undefined

```js
// 下面f2的作用域都是window
// 示例1：
var v = 1;
function f1(){
  var v = 2;
  function f2(){
      console.log(v);  //2
  }
  f2();
}
console.log(v);
f1();

// 示例2：
var v = 1;
function f1(){
  var v = 2;
  function f2(){
      console.log(this.v);  //1
  }
  f2();
}
console.log(v);
f1();
```

```js
// 示例3
var obj5 = {
    age: 18,
    run: function(){
        console.log(this);
        var that = this;
        setTimeout(function(){
            console.log(this.age)   //undefined 因为是全局
            console.log(that.age)   //18
        }, 50);
    }
};
obj5.run();
```

# 匿名函数和箭头函数的区别：
+ 函数体内的 this 对象， 就是定义时所在的对象，而不是调用时所在的对象
+ 不可以当做构造函数，不能使用 new 命令，否则会抛出错误
+ 不可以使用 arguments 对象，该对象在函数体内不存在，可以使用 rest 参数代替
+ 不可以使用 yield 命令，因此箭头函数不能作为 Generator 函数
    - 这种方式不常用；Generator 用的不多，现在经常使用的是 async 替代
`1. 由于匿名函数有独立作用域，而箭头函数没有独立作用域，所以箭头函数内部this是其外层函数决定的`

```js
// 示例1：
var p = {
  age: 20,
  run: function() {
    setTimeout(function() {
      // this指向window
      console.log(this);
    }, 1000);
  },

  tave: () => {
    setTimeout(() => {
      //this指向window
      //由于箭头函数不具有独立作用域，所以需要向上查找，发现还是一个箭头函数，箭头函数再上面没有其他函数作用域，所以是window作用域
      console.log(this);
    }, 1000);
  },

  travel: function() {
    //这里匿名函数的this指向p对象
    setTimeout(() => {
      //this指向p对象
      //由于箭头函数不具有独立作用域，所以需要向上查找，发现还是一个匿名函数，匿名函数指向p对象
      console.log(this);
    }, 1000);
  },

  //es6对象函数的简写：推荐使用的方式
  say() {
    console.log("say方法的this：", this); //指向p
    setTimeout(() => {
      console.log(this); //向上查找发现say函数的this指向p，所以箭头函数的this也指向p
    }, 1000);
  }
};
```