# 1. 概念
+ Math对象不是构造函数，不能生成实例，所有的属性和方法都必须在Math对象上调用
# 2. 静态属性
+ Math对象的静态属性，提供以下一些数学常数；都是`只读属性`
```js
// 数学常数
Math.E：常数e。
Math.LN2：2 的自然对数。
Math.LN10：10 的自然对数。
Math.LOG2E：以 2 为底的e的对数。
Math.LOG10E：以 10 为底的e的对数。
Math.PI：常数π。
Math.SQRT1_2：0.5 的平方根。
Math.SQRT2：2 的平方根。
```
# 3. 静态方法
```js
// 常用方法
Math.abs()：绝对值
Math.ceil()：向上取整
Math.floor()：向下取整
Math.max()：最大值
Math.min()：最小值
Math.pow()：指数运算
Math.sqrt()：平方根
Math.log()：自然对数
Math.exp()：e的指数
Math.round()：四舍五入
Math.random()：随机数
```
## 3.1 Math.abs()
+ 返回参数值的绝对值
```js
// 示例1：
Math.abs(1) // 1
Math.abs(-1) // 1
```
## 3.2 Math.max()和Math.min() 
+ 返回参数中的最大最小值
+ 如果参数为空, Math.min返回Infinity, Math.max返回-Infinity
```js
// 示例1：
Math.max(2, -1, 5) // 5
Math.min(2, -1, 5) // -1
Math.min() // Infinity
Math.max() // -Infinity
```

## 3.3 Math.floor()和Math.ceil()
+ `Math.floor`: 返回小于参数值的最大整数（地板值）
+ `Math.ceil`: 返回大于参数值的最小整数（天花板值）
+ 作用：可以实现一个总是返回数值的整数部分的函数
```js
// 示例1:
Math.floor(3.2) // 3
Math.floor(-3.2) // -4

// 示例2:
Math.ceil(3.2) // 4
Math.ceil(-3.2) // -3

// 示例3：不管正数或负数，ToInteger函数总是返回一个数值的整数部分
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
ToInteger(-3.5) // -3
```

## 3.4 Math.round() 
+ `Math.round()`: 用于四舍五入
```js
// 示例1：
Math.round(0.5) // 1
Math.round(-1.5) // -1  注意这句
Math.round(-1.6) // -2
```

## 3.5 Math.pow()
+ `Math.pow`: 返回以第一个参数为底数、第二个参数为幂的指数值
```js
// 示例1：
Math.pow(2, 3) // 8
```

## 3.6 Math.sqrt()
+ `Math.sqrt`: 返回参数值的平方根。如果参数是一个负值，则返回NaN
```js
// 示例1：
Math.sqrt(4) // 2
Math.sqrt(-4) // NaN
```

## 3.7 Math.log()
+ `Math.log`: 返回以`e`为底的自然对数值

```js
// 示例1：
Math.log(Math.E) // 1
Math.log(10) // 2.302585092994046
```

## 3.8 Math.exp() 
+ `Math.exp`: 返回常数`e`的参数次方

## 3.9 Math.random()
+ `Math.random()`: 返回0到1之间的一个伪随机数，[0, 1)
+ 某个范围之间的随机数：`Math.random() * (max - min) + min;`
```js
// 示例1:
Math.random() // 0.7151307314634323
```
## 3.10 三角函数
```js
// Math对象还提供一系列三角函数方法。
Math.sin()：返回参数的正弦（参数为弧度值）
Math.cos()：返回参数的余弦（参数为弧度值）
Math.tan()：返回参数的正切（参数为弧度值）
Math.asin()：返回参数的反正弦（返回值为弧度值）
Math.acos()：返回参数的反余弦（返回值为弧度值）
Math.atan()：返回参数的反正切（返回值为弧度值）
```

```js
// 示例1：
Math.sin(0) // 0
Math.cos(0) // 1
Math.tan(0) // 0
Math.sin(Math.PI / 2) // 1
```