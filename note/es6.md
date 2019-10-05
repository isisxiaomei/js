> es浏览器兼容性不好，可以使用babel：https://www.babeljs.cn/
# 1. 模板字符串
+ ${}替换变量
+ 自带换行
```js
var a = "hello";
var b = "world";
var es5 = "china "+a+b;
var es6 = `china ${a}${b}`;
```
# 2. let&const


# 3. 解构赋值
+ 解构赋值意义：节省字符（见示例2节省了每次使用option访问）
```js
// 示例1：基本用法
var obj = { name: "john", age: "20" };
var { name } = obj;              //表示创建一个变量name，值为obj.name
var { name: objName } = obj;     //表示创建一个变量objName，值为obj.name

// 表示创建一个变量name，值为obj.name
// 表示创建一个变量age，值为obj.age
var {name, age} = obj;


// 表示创建一个变量objName，值为obj.name
// 表示创建一个变量objAge，值为obj.age
// 说明这里跟顺序没有关系
var { age: objAge, name: objName  } = obj;
```
```js
// 示例2: 高级用法
//————>未使用解构赋值前
function fun(option){
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
function fun({name, age, grade}){
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
var b = {a, c};
// var b = {a:a, c:c}; 左边的a和c表示属性a和c，右边的a和c表示变量a和c；可以简写为var b = {a, c};
```
# 4. 函数扩展
## 4.1 rest参数
+ 使用背景：es6
+ rest参数是真数组，arguments是伪数组
+ arguments是函数的局部变量，arguments.length表示传入的实参个数
+ es6的箭头函数内部不能使用arguments；这样箭头函数就无法访问参数个数，所有rest参数应运而生
```js
// 示例1：
// ...args：表示rest参数
// 产生一个函数局部变量args,这个变量是一个数组，数组里面包含了这个函数调用时传递的所有实参(注意是实参)
function fun(...args){
    console.log(args);
    //实参数组长度
    console.log(args.length);
    // 验证args是否是数组
    console.log(args instanceof Array);
    // 判断args是什么类型
    console.log(Object.prototype.toString.call(args));      //"[object Array]"
    // 判断是数组es5的方法
    console.log(Array.isArray(args));
}
fun(1, 2, 3);
```
## 4.2 箭头函数
+ 箭头函数应用场景：就是用来替换匿名函数的；简化匿名函数写法
+ 箭头函数基本用法
```js
// 示例1：无参匿名函数
div.onclick = function() {
  
}
/ 相当于
div.onclick = ()=>{
    
}

// 示例2：有一个参数(箭头函数的括号可以省略)
div.onclick = function(name) {
  console.log(name);
}
/ 相当于
div.onclick = (name)=>{
    console.log(name);
}
div.onclick = name=>{
    console.log(name);
}

// 示例3：有多个参数
div.onclick = function(name, age) {
  console.log(name);
}
/ 相当于
div.onclick = (name, age)=>{
    console.log(name);
}
```
### 4.2.1 匿名函数和箭头函数的区别：
+ 函数体内的this对象， 就是定义时所在的对象，而不是使用时所在的对象
+ 不可以当做构造函数，不能使用new命令，否则会抛出错误
+ 不可以使用arguments对象，该对象在函数体内不存在，可以使用rest参数代替
+ 不可以使用yield命令，因此箭头函数不能作为Generator函数
    - 这种方式不常用；Generator用的不多，现在经常使用的是async替代
```js
1. 由于匿名函数有独立作用域，而箭头函数没有独立作用域，所以箭头函数内部this是其外层函数决定的
```
```js
// 示例1：
var p = {
    age: 20,
    run: function(){
        setTimeout(function(){
            // this指向window
            console.log(this);
        
        },1000)},
        
    tave:()=>{
        setTimeout(()=>{
            //this指向window
            //由于箭头函数不具有独立作用域，所以需要向上查找，发现还是一个箭头函数，箭头函数再上面没有其他函数作用域，所以是window作用域
            console.log(this); 
        },1000)
    },
    
   travel:function(){
        //这里匿名函数的this指向p对象
        setTimeout(()=>{
            //this指向p对象
            //由于箭头函数不具有独立作用域，所以需要向上查找，发现还是一个匿名函数，匿名函数指向p对象
            console.log(this); 
        },1000)
   },
   
   //es6对象函数的简写：推荐使用的方式
   say(){
        console.log("say方法的this：",this);//指向p
        setTimeout(()=>{
            console.log(this);            //向上查找发现say函数的this指向p，所以箭头函数的this也指向p              
        },1000)
    },
    
};
```














## global和window的区别
+ global是es中全局作用域的根对象
    - 但是node中，global是全局变量的载体，没有window
    - 浏览器端的js中，全局对象是window，浏览器中不存在global
    - window这个对象不仅存在全局变量，还存在BOM对象



