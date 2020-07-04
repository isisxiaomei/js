# 1. 实现(5).add(3).minus(2),使得结果为6
```js

```

# 2. 箭头函数和普通函数的区别
```js
1. 箭头函数没有自己的this，箭头函数内部this取决于外层函数，使用call等无法改变箭头函数的内部this指向
2. 箭头函数内部没有类数组 arguments 对象，但可以采用`...arg`的方式获取获取参数集合
3. 箭头函数不能使用new(因为箭头函数没有prototype属性和this，构造函数中一般都是给prototype添加实例公共的方法和属性)
```

# 3. 对象的属性名不能是一个对象
+ 遇到对象属性名会默认转换为字符串,默认调用该对象的toString();备注只有Object的toString()返回的是类型，其他都是转成字符串了。

```js
// 示例1：
var a = {}, b = {key: '123'}, c= {key: '456'}
a[b] = 'b'
a[c] = 'c'
console.log(a[b]) // => c   因为a[b]的b是对象，所以调用Object.prototype.toString(),返回的是"[object ,Object]"


// 示例2：
var a = {}, b = '123', c= 123
a[b] = 'b'
a[c] = 'c'
console.log(a[b]) // c  因为a[b]中b的toString是 '123'  c的toString也是 '123'
```

# 4 验证用户输入网址
```js
let url = 'https://www.bilibili.com/video/BV1E64y1u7Jz?p=7'
console.log(url.match(/^((http|https|ftp):\/\/)?www\.\w+\.(com|cn)/i))
```

# 5 实现图片懒加载


# 6 实现属性选择器
