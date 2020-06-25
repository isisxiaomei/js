# 1. for-in
+ 要点1：遍历对象和其原型上的所有可遍历属性
+ 要点2：对数组遍历时返回的数组的下标；for-in遍历返回的键名；
+ 注意点：不要使用for-in遍历数组，尽量使用for-of遍历数组；for-in更适合遍历对象
```js
// 示例1：for-in遍历数组返回的是数组的下标；并且for-in遍历对象和其原型上的所有可遍历属性
Array.prototype.sayHello = function(){
    console.log("Hello")
}
Array.prototype.str = 'world';
var myArray = [1,2,10,30,100];
myArray.name='数组';

for(let index in myArray){
    console.log(index);
}
//输出结果如下
0,1,2,3,4,name,str,sayHello
```
```js
// 示例2：for-in遍历对象
Object.prototype.sayHello = function(){
    console.log('Hello');
}
Obeject.prototype.str = 'World';
var myObject = {name:'zhangsan',age:100};

for(let index in myObject){
    console.log(index);
}
//输出结果
name,age,str,sayHello
//首先输出的是对象的属性名，再是对象原型中的属性和方法，
//如果不想让其输出原型中的属性和方法，可以使用hasOwnProperty方法进行过滤
for(let index in myObject){
    if(myObject.hasOwnProperty(index)){
        console.log(index)
    }
}
//输出结果为
name,age

//你也可以用Object.keys()方法获取所有的自身可枚举属性组成的数组。
Object.keys(myObject)
```
# 2. for-of
+ 要点1：只能遍历可迭代结构，不能遍历对象; 如果想遍历对象，可以使用Object.keys和values等方法返回对象的可遍历结构
+ 要点2：for-of遍历的是键值而不是索引
+ 要点3：or...of遍历数组的遍历器接口只返回具有数字索引的属性
```js
// 示例1：sayHello不可迭代所以没有输出
Array.prototype.sayHello = function(){
    console.log("Hello");
}
var myArray = [1,200,3,400,100];
for(let key of myArray){
    console.log(key);
}
//输出结果
1,200,3,400,100
```
# 3. in操作符
+ `in操作符`：返回一个布尔值，表示一个对象是否具有某个属性。`in`操作符和Object.keys()的区别是Object.keys()只返回对象自身属性，`in`不区分该属性是对象自身的属性，还是继承的属性。
+ 备注： 一般情况判断某个属性在不在对象中，尽量使用`in`操作符；
```js
// 示例1：避免使用obj.age的方式判断是否包含age属性
var obj = {
  age: 0
}
if (obj.age){
  // 此时obj.age == 0，包含age属性，但是if的结果确是false；所以尽量使用in操作符
}
```
