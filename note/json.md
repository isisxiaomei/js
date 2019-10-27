# 1. json和js对象区别
+ 1. json数据没有变量
+ 2. json数据结尾没有分号
+ 3. json数据的key必须使用双引号包起来
```json
// 示例1
{
  "name": "zhangsan",
  "age": 20,
  "lover": ["apple", "pen", "eat"],
  "friends": {
    "height": "180cm",
    "weight": "100kg"
  }
}
```
# 2. json和对象互转
+ `var obj = JSON.parse(json数据)`：将json转成js对象；JSON是es5出现的。
+ `var str = JSON.stringify(js对象)`：将js对象转成json
+ `eval`
  - 作用：把字符串解析为js代码并执行
  - 语法：`eval( "(" +data+ ")" )`
  - 不安全：因为如果eval中解析和执行的参数是一段复杂js代码，复杂代码可能获取本地私密信息等
```js
// 示例1：eval将json数据解析为js对象
var obj = eval("(" +json数据+ ")");
```