# es11

## 1. 


# es12系列

## 1. FinalizationRegistry

- 作用： 在对象销毁前执行传入的回调
- 注意有些node版本不支持，可以在浏览器运行试试

```js
// 示例1：基本使用

const finalRegistry = new FinalizationRegistry(() => {
    console.log("我是对象回收前回调")
})

let obj = {name: "小明"}
finalRegistry.register(obj) // 注册监听销毁的对象
obj = null

// 备注： 当obj置空之后 回调并不会立即执行  因为GC是不停的过一段时间查看的



// 示例2：销毁多个对象
const finalRegistry = new FinalizationRegistry((value) => {
    console.log(`我是对象回收前回调--${value}`)
})

let obj = {name: "小明"}
let info = {name: "小红"}
finalRegistry.register(obj, 'obj标识') // 注册监听销毁的对象, 第二个参数标识区分
finalRegistry.register(info, 'info标识')
obj = null
info = null

// 输出（看gc不定期回收，所以顺序也不保证）
我是对象回收前回调--info标识
我是对象回收前回调--obj标识
```
