# 1 Promise
## 1.1 Promise基本介绍
+ 对象异步操作状态：Promise对象代表一个异步操作，有三种状态：`pending（进行中）、fulfilled（已成功）和rejected（已失败）`
+ **缺点**：
    - 1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消
    - 2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
    - 3. 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）
## 1.2 背景
+ **背景**: 帮忙解决回调地狱问题
```js
// 示例1：回调地狱
function f1(){
  return new Promise((resolve, reject)=>{
    console.log('第一步');
    resolve();
  });
}
function f2(){
  return new Promise((resolve, reject)=>{
    console.log('第二步');
    resolve();
  });
}
f1().then(res => {
  f2().then(res => {

  })
});

// 示例2：解决回调地狱
function f1(){
  return new Promise((resolve, reject)=>{
    console.log('第一步');
    resolve();
  });
}
function f2(){
  return new Promise((resolve, reject)=>{
    console.log('第二步');
    resolve();
  });
}
f1().then(res => {
  // 直接返回Promise对象
  return f2();
}).then( res => {
  console.log('完成')
});

```

# 2 使用
## 2.1 基本使用
+ `Promise`: Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署.
+ `resolve函数`: 作用是将Promise对象的状态从“未完成”变为“成功”，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
+ `reject函数`: 作用是将Promise对象的状态从“未完成”变为“失败”，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去; 注意reject相当于抛出错误
```js
// 示例1：
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
+ `then方法`: Promise实例生成以后，then方法接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用(可选)。这两个函数都接受Promise对象传出的值作为参数
```js
// 示例1：
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
## 2.2 Promise执行顺序
+ 执行顺序问题，Promise 新建后就会立即执行，然后then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出
+ 调用resolve或reject并不会终结 Promise 的参数函数的执行
```js
// 示例1：
// 解析：Promise 新建后就会立即执行
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved

// 示例2：
new Promise((resolve, reject) => {
    setTimeout( ()=>{
        console.log("setTimeout")
    } , 1000);
    resolve(1);
    console.log("2")
})
.then(res => {
    console.log(res); // 1
})；
// 2 1 setTimeout

// 示例3：
new Promise((resolve, reject) => {
    setTimeout( ()=>{
        resolve(1);
        console.log("setTimeout")
    } , 5000);
    console.log("2")
})
.then(res => {
    console.log(res); //1
})；
// 2  setTimeout 1

// 示例4：
new Promise((resolve, reject) => {
    console.log("aa");
    setTimeout( ()=>{
        console.log("setTimeout0")
        resolve(1);
        console.log("setTimeout1")
    } , 5000);
    resolve(8);
    console.log("2")
})
.then(res => {
    console.log(res); // 8
});
// aa 2 8 setTimeout0 setTimeout1

// 示例5
new Promise((resolve, reject) => {
    resolve(1);
    console.log("xxx");
})
.then(res => {
    console.log(res);
    return 100;
})
.then(res => {
    console.log(res);
    return 2;
})
.then(res => {
    console.log(res);
    return 888;
})
.catch(resError => {
    console.log(resError);
});
// xxx 1 100 2

// 示例6：如果 Promise 状态已经变成resolved，再抛出错误是无效的
new Promise((resolve, reject) => {
    resolve(1);
    throw new Error("errorTest");
    console.log("xxx");   // 不执行
})
.then(res => {
    console.log(res);
    return 100;
})
.then(res => {
    console.log(res);
    return 2;
}).catch(resError => {
    console.log(resError); "errorTest"
});

//  1 100


// 示例7：
new Promise((resolve, reject) => {
    resolve(1);
    console.log("xxx");
    return 111;
})
.then(res => {
    console.log(res);
    return 100;
})
.then(res => {
    console.log(res);
    return 2;
});
//  xxx 1 100

// 示例8：then可以返回任意类型
new Promise((resolve, reject) => {
    resolve(1);
    console.log("xxx");
})
.then(res => {
    console.log(res);
    return {age: 10};
})
.then(res => {
    console.log(res);
});
// xxx 1 {age: 10}
```


```html
<!-- 示例1： -->
<script>
    console.log(0);
    function fun(){
        console.log(1);
        return new Promise(function(resolve, reject){
            console.log(2);
            resolve(3);
            reject(4);
        });
    }
    fun().then(function(rst){
        console.log("rst"+ rst)
    }, function(err){
        console.log("err"+ err)
    });
    var tt = function(){
        console.log(5);
    }
    tt();
</script>
<!--0   1   2   5   rst3  -->
```
```js
// 示例1：
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```
```js
// 示例1：reject(4);和resolve(3);的执行需要人为代码逻辑控制，如果不控制，则按调用顺序执行；并且只会执行两者的其中一个。
function fun(){
    console.log(1);
    return new Promise(function(resolve, reject){
        reject(4);
        resolve(3);
        console.log(2);
    });
}
fun().then(function(rst){
    console.log("rst"+ rst)
}, function(err){
    console.log("err"+ err)
});
// 1 2 err4
```
# 3 Promise返回值
- 一般如果需要继续调用会在 then 里面返回 Promise 对象
- 在 Promise 对象中不能直接返回其他类型只能写`resolve或者reject`
- 但是在 then 里面除了可以返回 Promise 对象还可以直接`return 其他类型`

```js
// 示例1：
new Promise((resolve, reject) => {
  setTimeout(res => {
    console.log(res); //undefine
    return 100;
  }, 1000);
})
  .then(res => {
    console.log(res);
  })
  .catch(resError => {
    console.log(resError);
  });
// 结果：
// undefine和报错
```

```js
// 示例1：
new Promise((resolve, reject) => {
  setTimeout(res => {
    console.log(res); //undefine
    resolve(1);
  }, 1000);
})
  .then(res => {
    console.log(res); // 1
    return 100;
  })
  .then(res => {
    console.log(res); // 100
  })
  .catch(resError => {
    console.log(resError); // 不执行
  });
```


# 4 Promise.prototype.then()
+ **作用**: 是为 Promise 实例添加状态改变时的回调函数
+ `then(resolvedCallBack, rejectCallBack)`: 参数1是resolvedCallBack， 参数2是rejectCallBack【参数2可选】
+ **then返回值**：
    - 默认返回一个新的Promise实例【因此可以采用链式写法】
    - then的参数回调函数完成以后，会将返回结果作为参数，传入紧接着then的下一个then的回调函数
```js
// 示例1：
// 解析：因为then默认返回的Promise，所以then的回调函数resolved返回的会传递给下一个then的resolved回调
new Promise((resolve, reject) => {
    setTimeout(res => {
        console.log(res); //undefine
        resolve(1);
    }, 1000);
})
.then(res => {
    console.log(res); // 1
    return 100;
})
.then(res => {
    console.log(res); // 100
})
.catch(resError => {
    console.log(resError); // 不执行
});
```
# 4 Promise.prototype.catch()
+ **区别**：catch 不仅仅可以捕获到 reject 传递的参数；还可以捕获到成功的回调中发生的错误
```js
// 示例1：
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数(then的回调函数)运行时发生的错误
  console.log('发生错误！', error);
});
```
+ **注意点**：
    - 1. 如果 Promise 状态已经变成resolved，再抛出错误是无效的
    - 2. Promise 对象的错误具有“冒泡”性质，会一直向后传递，中间遇到then不执行，直到被捕获为止。
    - 3. 每个catch只对上面的代码负责，如果catch中再抛出错误，可接着用catch捕获
```js
// 示例1：Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise 的状态一旦改变，就永久保持该状态，不会再变了
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');
});
promise
  .then(function(value) { console.log(value) })
  .catch(function(error) { console.log(error) });
// ok
```
```js
// 示例1：
new Promise((resolve, reject) => {
    resolve(1);
})
.then(res => {
    console.log(res); // 1
    throw new Error("errorTest")
    return 100;
})
.then(res => {
    console.log(res); // 这个then不执行
})
.catch(resError => {
    console.log(resError); "errorTest"
});
```
+ **参数**：`Promise.prototype.catch(回调函数)`
    - 跟传统的try/catch代码块不同的是，如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，外层照样执行
```js
// 示例1：
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```
+ **返回值**：catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法
```js
// 示例1：
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on
```
# 5 Promise.prototype.finally()
+ `finally()`: 用于指定不管 Promise 对象最后状态如何，都会执行的操作.
+ `finally(回调函数)`： 回调函数不接受参数
```js
// 示例1：
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

# 6 Promise.resolve()
+ 作用：`Promise.resolve(现有对象)`将现有对象转为新 Promise 对象
+ 本质：
```js
// 本质
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```
+ Promise.resolve()参数问题
    - 1. 参数是一个 Promise 实例；直接返回该实例
    - 2. 参数是一个具有`then方法`的对象,；返回转成的promise对象，立即自动调用之前参数对象的then方法
    - 3. 参数不是具有then方法的对象，或根本就不是对象；则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved
    - 4. 不带有任何参数；直接返回一个resolved状态的 Promise 对象
```js
// 示例1：解析： 返回P1对象，因为此时Promise.resolve(thenable)返回的已经是resolved状态的promise对象了，这是如果有同步代码先执行同步代码，同步代码执行完毕后自动调用thenable的then方法，resolve(42)，再人为p1.then接收到42
let thenable = {
    then: function(resolve, reject) {
        console.log("1");
        resolve(42);
    }
};

let p1 = Promise.resolve(thenable);
console.log("2")
p1.then(function(value) {
    console.log(value);  // 42
});
console.log("3")
// 2 3 1 42
```
+ 注意点：
    - 1. 立即resolve()的 Promise 对象，是在本轮“事件循环”的结束时执行，不是在下一轮“事件循环”的开始时
```js
// 示例1：解析setTimeout(fn, 0)在下一轮“事件循环”开始时执行；Promise.resolve()在本轮“事件循环”结束时执行
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});
console.log('one');

// one
// two
// three
```
# 7 Promise.reject()
+ `Promise.reject(reason)`: 也会返回一个新的 Promise 实例，该实例的状态为rejected
+ 本质：
```js
// 示例1：
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```
+ 参数问题：Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数; 这一点与Promise.resolve方法不一致.
```js
// 示例1：
const thenable = {
  then(resolve, reject) {
    console.log("then1")
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
    console.log("catch1")
    console.log(e === thenable)
})
// catch1 true
```

# 8. Promise.all()
+ 参数：Promise.all()的参数是一个可迭代的对象，并且可迭代对象里面的每一项都是promise实例，如果不是则会自动调用Promise.resolve()将其转成promise实例
+ 返回值：`const p = Promise.all([p1, p2, p3]);` all的返回值依然是promise实例，只是all的参数p1，p2，p3返回出来的结果会组成一个数组直接传递到`p`的回调函数then中

```js
// p的状态改变分两种情况
const p = Promise.all([p1, p2, p3]);
1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数

2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数
```
```js
// 示例1：
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
    .then(result => result)
    .catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
    .then(result => result)
    .catch(e => e); //会执行，返回一个promise，并且状态是成功状态

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));

// 输出结果：["hello", Error: 报错了]
// all的then回调的参数result就是p1和p2的执行结果组成的数组 ["hello", Error: 报错了]
```

```js
// 示例2：p2失败，所以p直接处于失败状态，此时p2没有catch，所以会直接到all的catch
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
})
    .then(result => result);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
})
    .then(result => result);

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(e => console.log(e));
// Error: 报错了
```
# 9. Promise.allSettled()
+ 参数：接受一组promise实例，返回一个新的promise实例；只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才算结束；这也是和all的区别


# 10. Promise.race()


# 11. Promise.try()


# 12. Promise.any()


promise构造函数中的是同步代码，then里面的回调才是微任务，
promise状态不可逆和状态中转
promise的then默认返回的是promise对象，并且返回的promise对象的状态是resolved的状态，这就是为什么我们在then中不写resolve，但是下一个then的resolve回调可以执行的原因；如果上一个then中手动new 返回一个promise对象，那么下一个then就必须等待new 返回的promise的状态变为resolved才可以，换句话说此时的then就是pedding状态
一个then对离自己最近的promise负责


then方法的参数回调函数中可以返回任意类型，并不是then方法可以返回，then方法的返回是promise对象，所以相当于then里面返回的是Promise.resolve()创出来的promise实例

then中返回的封装对象（类或者是对象）中有then（这个then可以是普通方法也可以是静态方法）方法，则会直接调该对象的then方法执行，并将执行结果再传递给外面的then
```js
// 示例1：
new Promise((resolve, reject) => {
    resolve("fulfilled");
}).then(
    value => {
        return {
            name: 'helloworld'
        }
    },
    reason => console.log(reason)
).then(
    value => console.log(value), //{ name : 'helloworld' }
    reason => console.log(reason)
);

// 示例2：then里面如果封装的返回对象里面包含then方法，那么then的返回值promise会直接调用封装的对象的then方法，处理的结果再交给后面的then
new Promise((resolve, reject) => {
    resolve("fulfilled");
}).then(
    value => {
        return {
            then(resolve){
                resolve('success');
            }
        }
    },
    reason => console.log(reason)
).then(
    value => console.log(value),    // success
    reason => console.log(reason)
);


// 示例3：
new Promise((resolve, reject) => {
    resolve("fulfilled");
}).then(
    value => {
        return {
            say(resolve){
                resolve('success');
            }
        }
    },
    reason => console.log(reason)
).then(
    value => console.log(value),    // { say(){} }
    reason => console.log(reason)
);


// 示例4：静态then也算
new Promise((resolve, reject) => {
    resolve("fulfilled");
}).then(
    value => {
        return class {
            static then(resolve, reject){
                return reject('失败')
            }
        }
    },
    reason => console.log(reason)
).then(
    value => console.log(value),
    reason => console.log(reason)
);
```

Promise.resolve可以生产一个promise对象，当resolve的参数是一个含有then方法的包装对象时，则resolve生成的promise对象会先自动调用内部的包装对象的then方法，将执行结果再返回到外面
```js
let promise = {
    then(resolve, reject){
        // return 100;
        resolve('hello');
    }
}
Promise.resolve(promise).then(
    value => console.log(value)
);
// 输出hello   then方法中return 100时，不显示100. 因为then的返回值是promise，
```

执行顺序
```js
setTimeout(() => {
    console.log('5')
    new Promise((resolve, reject) => {
        resolve("6");
    }).then(
        value => console.log(value)
    );
}, 2000);

setTimeout(() => {
    console.log('7')
    new Promise((resolve, reject) => {
        resolve("8");
    }).then(
        value => console.log(value)
    );
}, 4000);

new Promise((resolve, reject) => {
    console.log('1')
    resolve("3");
}).then(
    value => console.log(value)
);

new Promise((resolve, reject) => {
    resolve("4");
}).then(
    value => console.log(value)
);

console.log("2");
```


注意主线程的内存共享问题

try catch捕获不了事件回调函数。try catch 仅仅在单一执行环境中奏效, try  catch捕获的是同步代码, 异步任务捕获不了;可以在promise的then的回调函数中使用

promise封装定时器


promise错误处理：
- 可以借用then的resolve回调函数
- 可以直接throw new Error
- 也可以使用promise.prototype.catch
- 还可以在出现错误时使用 return Promise.reject('错误')，直接改变promise的状态
```js
// 示例1：只要then捕获到错误，catch就不会执行
Promise.resolve('success').then(value => {
    if (value != 'hello') {
      // 备注这里必须加上return， 不然就是函数调用，而不是返回promise实例；不能只写 reject('失败')；因为这是then的resolve回调，不识别reject
        return Promise.reject('失败');
    }
}).then(null, error => console.log("reject error", error))
  .catch(e => console.log('catch error', e));

```


