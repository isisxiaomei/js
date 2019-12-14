# 1 总结点
+ 如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层
+ 对象的属性访问：按照原型链访问；并且this的执行看函数被谁调用
+ 变量的访问：按照作用域访问；并且作用域链的关键是看函数在哪里定义
```js
// 示例1：
// 解析：这里m是b对象的方法，所以m方法内部的this指向b对象，b对象并没有p属性；并且访问对象没有的属性时默认为undefined
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};
a.b.m() // undefined
```

# 2 this实质
+ JavaScript 语言之所以有 this 的设计，跟内存里面的数据结构有关系。
+ 由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行
```js
// 实例1：

var obj = { foo:  5 };
// 解析：obj保存的是对象的地址
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}
```

```js
// 示例2：
var obj = { foo: function () {} };
// 解析：引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性
{
  foo: {
    [[value]]: 函数的地址
    ...
  }
}
```

```js
// 示例3：理解  obj和obj.foo储存在两个内存地址
var obj ={
  foo: function () {
    console.log(this);
  }
};

obj.foo() // obj


// 情况一解析：(obj.foo)();其中obj.foo中保存的是函数地址，所以就变成 ——>  函数名()
(obj.foo = obj.foo)() // window
// 情况二解析：
(false || obj.foo)() // window
// 情况三
(1, obj.foo)() // window
```
