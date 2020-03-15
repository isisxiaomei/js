> es 浏览器兼容性不好，可以使用 babel：https://www.babeljs.cn/

# 1. 模板字符串

- ${}替换变量
- 自带换行

```js
var a = "hello";
var b = "world";
var es5 = "china " + a + b;
var es6 = `china ${a}${b}`;
```

# 2. let&const

# 3. 解构赋值

- 解构赋值意义：节省字符（见示例 2 节省了每次使用 option 访问）

```js
// 示例1：基本用法
var obj = { name: "john", age: "20" };
var { name } = obj; //表示创建一个变量name，值为obj.name
var { name: objName } = obj; //表示创建一个变量objName，值为obj.name

// 表示创建一个变量name，值为obj.name
// 表示创建一个变量age，值为obj.age
var { name, age } = obj;

// 表示创建一个变量objName，值为obj.name
// 表示创建一个变量objAge，值为obj.age
// 说明这里跟顺序没有关系
var { age: objAge, name: objName } = obj;
```

```js
// 示例2: 高级用法
//————>未使用解构赋值前
function fun(option) {
  console.log(option.name);
  console.log(option.age);
  console.log(option.grade);
}
fun({
  name: "john",
  age: 20,
  grade: 1
});
//————>使用解构赋值后
function fun({ name, age, grade }) {
  //这里创建了3个局部变量name, age, grade
  console.log(name);
  console.log(age);
  console.log(grade);
}
fun({
  name: "john",
  age: 20,
  grade: 1
});
```

```js
// 补充对象属性的简写
var a = 10;
var c = 20;
//————>表示b对象有a和c属性，a属性的值是a变量，c属性的值是c变量
var b = { a, c };
// var b = {a:a, c:c}; 左边的a和c表示属性a和c，右边的a和c表示变量a和c；可以简写为var b = {a, c};
```


# 5. 对象的扩展

- Object.assign：实现浅拷贝
- 对象扩展运算符
- 问题：查下两个是否都是浅拷贝；顺便自己写下深拷贝

```js
```



## global 和 window 的区别

- global 是 es 中全局作用域的根对象
  - 但是 node 中，global 是全局变量的载体，没有 window
  - 浏览器端的 js 中，全局对象是 window，浏览器中不存在 global
  - window 这个对象不仅存在全局变量，还存在 BOM 对象
