# 1 async介绍
+ async其实是promise的语法糖，是包装了promise
## 1.1 async和promise
```js
// 示例1：
// promise方案
function f1(){
  return new Promise((resolve, reject)=>{
    console.log('第一步');
    resolve();
  });
}
// async实现方案: await表示这行代码是一个异步操作，await之后的代码必须在这个异步操作之后执行，这里的异步操作执行完毕其实就是resolved
(async function f(){
  await f1();
  console.log('第一步完成');
})();
console.log('第2步')

// 第一步 第2步 第一步完成

// 示例2：
async function f(){
  await f1();
  console.log('第一步完成');
  await f1();
  console.log('2');
  console.log('3');
})();
// 第一步 第一步完成 第一步 2 3
```
# 2 await
+ await可以执行异步操作，但是必须放在async函数内部
```js
// 示例1：
(async function f(){
  await f1();
})();
// 或者
async function f(){
  await f1();
}
f();


// 示例2：
var obj= {
    say: async function(){
        await f1();
    }
}

// 示例3：
var obj= {
    say: async ()=>{
        await f1();
    }
}
```
+ await可以有返回值，这个返回值表示Promise操作成功的返回值
```js
// 示例1：
async function get(){
    console.log('开始执行');
    var res = await timer();    // 只能接受resolve的返回值
    console.log('结束执行:', res);
}
function timer(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('hello')
        }, 1000);
    });
}
get();

// 开始执行 结束执行:hello
```
+ 如果await里面执行的异步操作发生了reject，或者发生了错误，那么只能用try...catch捕获
```js
// 示例1：try...catch
async function get(){
    try{
        console.log('开始执行');
        var res = await timer();
        console.log('结束执行:', res);
    }catch(e){
        console.log("捕获错误：",e)
    }
}
function timer(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            reject('hello')
        }, 1000);
    });
}
get();

// 开始执行  捕获错误：hello
```