# 1. BOM

- 浏览器对象模型
- 其中代表浏览器窗口的 window 对象是 BOM 的顶级对象
- B 浏览器的前进后退键、刷新键、地址栏、可视区窗口等都可以通过 BOM 对象的方式进行操作

# 2. window

- window 表示的是 BOM 整个窗口，不只是可视区域
- window 对象是 BOM 的顶级对象
- 调用 window 的属性和方法时可以省略 window
- 定义全局变量的时都是`window`的属性
- 字符串：黑色字体
- 数字：蓝色字体
- window 的常用属性：
  - `window.name=""`
  - document 也是 window 属性：`window.document`
  - `window.top`：只能获取不能赋值
  - `window.alert()`
  - `window.console`

# 3. 对话框

- 以下 3 种对话框目前基本不使用；原因如下：
  - 因为样式不好看
  - 每次需要用户点击确定；目前的做法是直接弹出提示浮层，几秒后浮层消失
  - 在不同的浏览器中 3 种对话框长得样式不一样
  - 还有就是在 IE 中这 3 中对话框出来之后如果不进行操作，浏览器是无法关闭的

## 3.1 alert()

```js
// 示例1：
var btn1 = document.getElementById("btn1");

btn1.onclick = e => {
  alert("hello");
};
```

## 3.2 prompt()

- **_定义_**：提示用户输入相应的内容；点击确定可以获取到用户的输入

```js
// 示例1：
var btn2 = document.getElementById("btn2");
btn2.addEventListener("click", e => {
  // 用户点击确定；返回用户输入值；第一个参数是提示数据；第二个参数是默认输入
  var userName = prompt("请输入姓名", "张三");
  console.log(userName);
});
```

## 3.3 confirm()

- **_定义_**：让用户决定时候要做一件事情，点击确定做事情，点击取消什么都不做

```js
// 示例1
var btn3 = document.getElementById("btn3");
btn3.onclick = function() {
  // 返回boolean；确定为true；取消false
  var flag = confirm("是否要删除？");
  console.log(flag);
};
```

# 4. 页面加载事件

- **_背景_**：页面加载时是代码是从上往下执行，所以需要等页面元素加载完毕之后 js 的代码才可以执行获取
  - 所以一般 script 标签会写在最后一个 body 元素之前
- `window.onload`：onload 事件表示页面加载完成之后执行
  - 页面加载完成指：页面上所有的元素创建完毕；并且引用的外部资源下载完毕（图片、js、css）
  - 基本每个标签都是有`onload`事件
  - 此处 window 可省略
- `window.onunload`：onunload 事件表示页面卸载时执行
  - onunload 页面卸载时 window 对象会被终止；此时 window 对象的属性是不可以使用的
  - 对话框等都不可以使用
  - 一般用来清除购物车等

```js
// 示例1：
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script>
      // onload表示页面元素全部加载完毕并且外部资源下载完毕才会执行；
      onload = function() {
        btn1.onclick = e => {
          alert("hello");
        };
      };
    </script>
  </head>
  <body>
    <input id="btn1" type="button" value="alert" />
    <script>
      // 当页面上元素创建完毕就可以执行
      var btn1 = document.getElementById("btn1");
      btn1.onclick = e => {
        alert("hello");
      };
    </script>
  </body>
```

# 5. 定时器

## 5.1 setTimeout()

- **定义**：相当于定时炸弹；在指定多长时间后执行；并且只执行一次
- **参数**：window.setTimeout(回调函数, 毫秒)
- **返回值**：setTimeout 的全局 timerId 标识，当取消定时器时需要获取
- **取消定时器执行**：`clearTimeout(定时器的返回值标识);`

```js
<body>
    <input id="btn1" type="button" value="确定" />
    <input id="btn2" type="button" value="取消" />

    <script>
      var timerId;

      var btn1 = document.getElementById("btn1");
      btn1.onclick = function() {
        timerId = setTimeout(function() {
          console.log("爆炸了");
        }, 3000);
      };

      var btn2 = document.getElementById("btn2");
      btn2.onclick = function() {
        // 取消定时器执行
        clearTimeout(timerId);
      };
    </script>
</body>
```

## 5.2 setInterval()

- **定义**：相当于闹钟，隔一段时间执行，重复执行
- **参数**：和 setTimeout 一样，只是会隔设置的时间段重复执行
- 返回值和取消定时器执行也一样

```js
<body>
    <input id="btn1" type="button" value="确定" />
    <input id="btn2" type="button" value="取消" />

    <script>
      var timerId;
      var btn1 = document.getElementById("btn1");
      btn1.onclick = function() {
        // 每间隔3秒  执行一次
        timerId = setInterval(function() {
          console.log("爆炸了");
        }, 3000);
      };

      var btn2 = document.getElementById("btn2");
      btn2.onclick = function() {
        // 取消定时器执行
        clearTimeout(timerId);
      };
    </script>
</body>
```

# 6.location 对象

- location 是 window 对象的属性对象;
- 作用是可以获取或者设置浏览器地址栏的 URL
- 常用属性和方法(可以直接在控制台查看)
  - href：可以设置或者获取浏览器的整个网址 URL(设置的新网址在当前页面并且有后退键记录历史)
  - pathname：浏览器的路径 URI
  - assign()：委派的意思；和 href 作用一样可以让页面跳转至指定网址(设置的新网址在当前页面并且有后退键记录历史)
  - replace()：将当前网址替换成指定网址；但没有后退键记录历史
  - reload()：不加参数时功能跟页面的饿刷新按钮的功能一样
    - 有一个参数是 true/false；
    - true：相当于刷新强制从服务器获取页面（ctrl+f5）
    - false：从本地浏览器缓存重新加载页面（f5）
- URL 解析：`https://www.baidu.com:80/a/b/index.html?user=123&passwd=456#bottom`
  - href：`https://www.baidu.com:80/a/b/index.html?user=123&passwd=456#bottom`
  - protocol：通信协议`https`
  - host：`www.baidu.com`
  - port：`80`
  - pathname：`/a/b/index.html`
  - search：`?user=123&passwd=456`
  - hash：锚点`#bottom`

```js
// 示例1：
location.href = "http://www.baidu.com";
location.assign("http://www.baidu.com");
location.replace("http://www.baidu.com");
location.reload();
location.reload(true);
location.reload(false);
```

# 7. history 对象

- history.back()：浏览器上后退键的功能
- history.go(-1)：后退第一层页面
- history.go(-2)：后退到第二层页面
- history.forward()：浏览器前进键功能
- history.go(1)：前进到第一层页面

# 8. navigator 对象

- `navigator.userAgent`
  - 这个属性记录的是系统和浏览器版本信息
  - 一般我们需要将这个信息发送到服务器端，服务器通过判断这个属性来决定是 pc 端的访问还是移动端的访问

```js
// 示例1：移动端
navigator.userAgent;
("Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1");

// 示例2：pc端
navigator.userAgent;
("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36");
```

# 9. 作业：

- 倒计时
- 动画
