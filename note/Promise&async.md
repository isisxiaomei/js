> 待解决问题：eval 一般不使用，因为会造成注入漏洞；一般用于解析 json

# 1. Promise（es6）

- **_背景_**：帮忙解决回调地狱问题

## 1.1 Promise 函数基本用法

```js
// 示例1：
function f1() {
  return new Promise(resolve => {
    console.log("第一步");
    // resolve() 必须告诉外界当前的异步逻辑已经执行完了；告诉then可以进行then的回调操作了
    resolve();
  });
}

function f2() {
  return new Promise(resolve => {
    console.log("第二步");
    resolve();
  });
}

// then方法用于确认上一步异步逻辑操作执行完后接下来的操作
f1()
  .then(res => {
    // 返回Promise对象
    return f2();
  })
  .then(res => {
    return f1();
  })
  .then(res => {
    return f2();
  })
  .then(res => {
    console.log("完成");
  });
```

## 1.2 Promise 函数传参

```js
function getUser() {
  return new Promise(resolve => {
    $.get("/getUser", res => {
      // res是服务器传来的数据
      // 告诉外界本次异步操作执行完毕，并将数据res带给外界
      resolve(res);
    });
  });
}
getUser().then(res => {
  // then的参数res表示上一个异步操作传出来的参数数据；这里是resolve(res)中的res数据
});
```

## 1.3 Promise 函数错误处理

- 方式 1：通过 then 接受失败回调操作
- 方式 2：通过 catch（推荐 catch 错误处理方式）
  - catch 不仅仅可以捕获到 reject 传递的参数；还可以捕获到成功的回调中发生的错误

```js
// 示例1：通过then接受失败回调操作
function getBooks() {
  // 执行resolve()表示异步操作是成功的
  // 执行reject()表示异步操作是失败的
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/getBooks",
      success(res) {
        resolve(res);
      },
      error(resError) {
        reject(resError);
      }
    });
  });
}
// then接受两个参数，一个是上一步成功的回调，另一个是上一步操作失败的回调
getBooks().then(
  res => {
    //res表示上一步操作成功时传递出来的数据
  },
  resError => {
    // resError表示上一步操作失败时传递出来的数据
    console.log(resError);
  }
);

// 示例2：通过catch
getBooks()
  .then(res => {
    //res表示上一步操作成功时传递出来的数据
  })
  .catch(resError => {
    // 这里也可以获取到错误处理信息；resError表示上一步操作失败时传递出来的数据
  });
```

```js
// 示例1：
new Promise((resolve, reject) => {
  setTimeout(res => {
    console.log("第一步");
    resolve("第一步完成");
  }, 2000);
})
  .then(res => {
    console.log(res); // 第一步完成
    return new Promise((resolve, reject) => {
      setTimeout(res => {
        console.log("第二步");
        reject("第二步失败");
      }, 2000);
    });
  })
  .then(res => {
    // 不会执行到这里
    console.log("第二步成功");
  })
  .catch(resError => {
    console.log(resError);
  });
```

## 1.4 Promise 函数返回值

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

# 2. async
+ async是Promise的语法糖
```js

```
