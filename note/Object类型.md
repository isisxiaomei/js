# 1 Object
+ 大多数引用类型都是Object类型的实例

## 1.1 创建object实例2种方式
+ 备注：通过对象字面量创建对象不会调用Object构造函数
```js
// 方式1: 通过new操作符后跟Object构造函数
var person = new Object();

// 方式2：通过对象字面量
var person = {
    age: 18
};
```