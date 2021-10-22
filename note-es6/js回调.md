# js回调欣赏

```js
function returnCallBack() {
    // do something
    return function () {
        console.log('我是返回的回调')
    }
}

function callbackWay(callBack) {
    // do something
    callBack('success')
}
function promiseWay() {
    return new Promise((resolved, rejected) => {
        // do something
        resolved('success')
    })
}

function outer() {
    // 方式1： 返回回调
    let returnFun = returnCallBack()
    returnFun()

    // 方式2： 回调函数回调
    callbackWay(res => {
        console.log('我是callbackWay函数执行的回调', res)
    })

    // 方式3：promise回调
    promiseWay().then(res => {
        // 成功之后在这里做回调
        console.log(res)
    })
}

```
