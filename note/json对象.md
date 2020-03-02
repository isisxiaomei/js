# 1. json语法
+ 合法json规定
```js
// 规定1：复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
// 规定2：原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
// 规定3：字符串必须使用双引号表示，不能使用单引号。
// 规定4：对象的键名必须放在双引号里面。
// 规定5：数组或对象最后一个成员的后面，不能加逗号。
```
+ 注意：null、空数组和空对象都是合法的 JSON 值。
```json
// 示例1：合法
["one", "two", "three"]
{ "one": 1, "two": 2, "three": 3 }
{"names": ["张三", "李四"] }
[ { "name": "张三"}, {"name": "李四"} ]

// 示例2：不合法
{ "name": "张三", "age": undefined } // 不能使用 undefined
```
# 2. json和js对象区别
+ 1. json数据没有变量
+ 2. json数据结尾没有分号
+ 3. json数据的key必须使用双引号包起来
```json
// 示例1：合法json
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

# 3. JSON 对象静态方法JSON.stringify()
+ 定义：用于将一个值转为 JSON 字符串并且该字符串符合 JSON 格式，并且可以被JSON.parse方法还原
# 4. JSON 对象静态方法JSON.parse()





## 3.1 JSON.stringify()
## 3.2 
# 3. json和对象互转
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