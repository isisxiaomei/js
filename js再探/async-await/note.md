# 1. async

## async函数和普通函数区别

1. 返回值有区别
2. 异常处理有区别

## async返回值

async函数返回值一定是promise

如果是promise则会有then，那么then的执行时机?

promise的then触发条件是async函数return时，会将return的值作为then的参数；如果没有显示return，相当于默认return的undefined

```js
// 示例1：返回一个值
async function fun(){
    console.log(111);
    console.log(222);
    // 默认return的undefined
}

const promise = fun()

promise.then(res => {
    console.log(res); // undefined
})


// 示例1：返回一个值
async function fun(){
    console.log(111);
    console.log(222);
    return 33
}

const promise = fun()

promise.then(res => {
    console.log(res); // 33
})
```

```js
// 示例2：返回thenable
async function fun(){
    console.log(111);
    console.log(222);
    return {
        then: function(resolve, reject){
            resolve("hello")
        }
    }
}

const promise = fun()

// 返回的promise会先执行return的对象中的then，然后将对象的then中的resolve的值作为promise的then的参数
promise.then(res => {
    console.log(res); // hello
})
```


```js
// 示例2：返回一个promise
async function fun(){
    console.log(111);
    console.log(222);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello")
        }, 2000)
       
    })
}

const promise = fun()

// 执行return的promise将resolve的值作为then的参数
promise.then(res => {
    console.log(res); // hello
})
```

## async异常处理



普通函数如果throw没有处理throw程序会直接崩溃

async异步函数出错后续代码还会执行；因为抛出的错误命中返回的promise的异步catch，所以后续同步代码还是会执行

```js
// 示例1：
async function fun(){
    console.log(111);
    throw new Error("出错了~")
    console.log(222);
}

const promise = fun()

promise.then(err => {
    console.log(err);
})
console.log("后续代码~");

// 输出：（注意222没有打印）
111
后续代码~
Uncaught (in promise) Error:
```


```js
// 示例2：catch处理
async function fun(){
    console.log(111);
    throw new Error("出错了~")
    console.log(222);
}

const promise = fun()

promise.catch(err => {
    console.log(err.message);
})
console.log("后续代码~");

// 输出：（注意222没有打印）
111
后续代码~
出错了~
```

# 2. await

## await表达式返回promise
一般`await + 表达式(表达式返回一个promise)`

value获取await返回值的时机：当await表达式的promise执行resolve后，会将resolved的值作为await的返回值给value；相当于value获取值以及await模块内后续代码都是promise的then

```js
// 示例1：
function fun(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello")
        }, 0)
    })
}

async function test(){
    const value = await fun()
    console.log(value);
    console.log(222);
}

test()
console.log(111);

// 输出：111 hello 222
```

## await返回普通值
