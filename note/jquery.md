# 1. jquery 介绍

## 1.0 jquery 语法

- 基本语法\$(selector).action()
  - 美元符号定义 jQuery
  - 选择符（selector）"查询"和"查找" HTML 元素
  - jQuery 的 action() 执行对元素的操作

## 1.1 jquery 顶级对象

- DOM 中的顶级对象：`document`页面的顶级对象
- BOM 中的顶级对象：`window`浏览器的顶级对象
- jQuery 的顶级对象：`jQuery（可以使用 $ 代替）`;因为`$`更简单

## 1.2 页面加载事件对比

```js
// 示例1：DOM中页面加载事件
window.onload = function() {
  console.log("window.onload加载事件1");
};
window.onload = function() {
  console.log("window.onload加载事件2");
};

// 示例2：jquery中window页面加载，
// 这种形式和DOM的load加载完全相同——需要等待页面的所有标签和外部资源css、js、图片等下载完毕

$(window).load(function() {
  console.log("$(window).load(function(){})——1");
});
$(window).load(function() {
  console.log("$(window).load(function(){})——2");
});
// 示例3：页面中的基本标签加载后执行
$(document).ready(function() {
  console.log("$(document).ready(function (){})");
});
// 示例4：等同于示例3 页面中的基本标签加载后执行
jQuery(function() {
  console.log("jQuery(function(){})");
});
// 示例5：等同于示例3和4 页面中的基本标签加载后执行
$(function() {
  console.log("jQuery(function(){})");
});
```

# 2. jquery 和 dom 对象互转

- 有时候需要 dom 和 jquery 对象互转(有些兼容性 jquery 没有封装)
- dom 转 jquery：只需要把 dom 对象放在 `$(dom对象)` 中就变成了 jquery 对象
- jquery 转 dom：有两种方式
  - \$(btn).get(0) ——> 转成 dom 对象了
  - \$(btn)[0] ——> 转成 dom 对象了

```js
// 示例1：dom转jquery
    <input type="button" id="btn" value="点我">
    <script>
        // dom 方式修改按钮背景颜色
        var btn = document.getElementById('btn');
        btn.onclick = function (){
            this.style.backgroundColor = "red";
        }
        // jquery方式 修改按钮背景颜色
        $(btn).click(function(){
            $(this).css('backgroundColor','pink');
        })

    </script>
```

```js
// 示例2：jquery转dom对象
// 方法1：btnObj1 = $(btn).get(0)
var btnObj1 = $(btn).get(0);
btnObj1.onclick = function() {
  this.style.backgroundColor = "red";
};

// 方法2：btnObj2 = $(btn)[0]
var btnObj2 = $(btn)[0];
btnObj2.onclick = function() {
  this.style.backgroundColor = "red";
};
```

# 3. jquery 选择器

- `$("#id")`：根据 id 选择器获取元素
- `$(".class")`：根据类选择器获取元素
- `$("标签名字")`：根据标签名获取元素；返回多个
- `$("*")`：获取所有的元素
- \$("li.cls")：元素+类选择器
- `$(span,p,div)`：多条件选择器

# 4. 样式常用方法(基本都是类比 DOM)

## 4.1 获取内容：

- html()：设置标签中间显示其他标签或者内容；相当于 innerHTML
- text("设置内容")：设置标签中间显示的文本内容；相当于 dom 中的 innerText 或者 textContent
- val()：获取或者设置标签内的 value 值（无参数为获取，有参数为设置）

## 4.2 获取属性：

- attr()用于获取或者设置属性值
- `attr("href")`比如这里获取 href 的值
- `attr("href", "www.baidu.com")`比如这里设置 href 的值
- `attr({ "href" : "//www.w3cschool.cn/jquery", "title" : "jQuery 教程" })`

## 4.3 添加元素：

- append() - 在被选元素内部的结尾插入指定内容
- prepend() - 在被选元素内部的开头插入指定内容（见示例 1）
  - 如果只是单一元素则是在元素的内容前继续插入内容，还是保持一个元素
  - 如果父子元素，则是在第一个子元素前插入一个子元素；
- after() - 在被选元素之后插入内容
- before() - 在被选元素之前插入内容

```js
// 示例1：添加元素prepend()
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <script src="https://libs.baidu.com/jquery/1.11.3/jquery.min.js"></script>
    <script>
      $(document).ready(function() {
        $("#btn1").click(function() {
          $("p").prepend("<b>在开头追加文本</b>。 ");
        });
        $("#btn2").click(function() {
          $("ol").prepend("<li>在开头添加列表项</li>");
        });
      });
    </script>
  </head>
  <body>
    <p>这是一个段落。</p>
    <p>这是另外一个段落。</p>
    <ol>
      <li>List item 1</li>
      <li>List item 2</li>
      <li>List item 3</li>
    </ol>
    <button id="btn1">添加文本</button>
    <button id="btn2">添加列表项</button>
  </body>
```

## 4.4 删除元素：

- \$("#div1").remove()：删除被选元素及其子元素
- \$("p").remove(".italic")：只删除 class=italic 的 p 元素
- \$("#div1").empty()：删除被选元素的子元素

## 4.5 css()：设置样式

    - 获取css属性值(传入一个参数)：`$("p").css("background-color");`
    - 设置css样式值：`$("p").css({"background-color":"yellow","font-size":"200%"});`

## 4.6 尺寸

- width()
- height()
- innerWidth()
- innerHeight()
- outerWidth()
- outerHeight()
  ![](image/../../image/Snipaste_2019-10-16_00-54-49.png)

```js
// 示例1：设置尺寸
<script>
$(document).ready(function(){
  $("button").click(function(){
    var txt="";
    txt+="Width of div: " + $("#div1").width() + "</br>";
    txt+="Height of div: " + $("#div1").height();
    $("#div1").html(txt);
  });
});
</script>
</head>
<body>

<div id="div1" style="height:100px;width:300px;padding:10px;margin:3px;border:1px solid blue;background-color:lightblue;"></div>
<br>
<button>显示 div 元素的尺寸</button>
<p>width() - 返回元素的宽度</p>
<p>height() - 返回元素的高度</p>
```

## 4.7 jquery-Css 类

> 具体见示例 4.7

- addClass():
  - 向被选元素添加一个或多个类
  - 在 addClass 方法中类样式名字前面没有(.)
- removeClass():
  - 从被选元素删除一个或多个类
  - `$("div").removeClass('blue')`：移除指定样式
  - 没有参数默认移除指定元素的全部样式
- toggleClass():
  - 切换类样式
- hasClass()
  - 判断当前元素是否应用了某个类样式；返回 true/false
  - \$('div').hasClass('blue')：div 是否应用了 blue 样式

```js
// 示例1：addClass()添加样式 && removeClass()移除样式
<head>
<meta charset="utf-8">
<script src="//libs.baidu.com/jquery/1.10.2/jquery.min.js">
</script>
<style type="text/css">
  .important
  {
    font-weight:bold;
    font-size:xx-large;
  }
  .blue
  {
    color:blue;
  }
</style>
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("h2,p").addClass("blue"); // 在addClass方法中类样式名字前面没有(.)

    // 添加样式写法1：
    $("div").addClass("important");
    // 添加样式写法2：添加多个样式
    $("div").addClass("important").addClass("blue");
    // 添加样式写法3：添加多个样式; 多个样式之间空格隔开
    $("div").addClass("important blue");

    // 移除一个元素的类样式：
    $("div").removeClass('blue');
    // 移除一个元素的所有类样式：没有参数默认移除指定元素的全部样式
    $("div").removeClass();
  });
});
</script>

</head>
<body>
  <h2>标题 2</h2>
  <p>这是一个段落。</p>
  <div>这是一些重要的文本!</div>
  <button>为元素添加 class</button>
</body>
```

```js
// 示例1：toggleClass 切换类样式(开关灯))
$("btn").cilck(function() {
  $("body").toggleClass("blue");
});
```

# 5. 动画

## 5.1 隐藏和显示

- hide()：隐藏元素
  - `$(selector).hide(speed,callback);`：
    - 可选的 speed 参数规定隐藏/显示的速度,取值："slow"、"fast"、"normal"或毫秒
    - selector 选中的元素的个数为 n 个，则 callback 函数会执行 n 次
- show()：显示元素
  - `$(selector).show(speed,callback);`
- toggle()：切换隐藏和显示
  - `$(selector).toggle(speed,callback);`

```js
// 示例1：
<script>
      $(function(){
        $('#hide').click(function (){
          $("p").hide("normal");
          $("p").hide(1000);    // 隐藏动作放慢
          $("p").toggle("slow");    //切换隐藏和显示
        });

        $('#show').click(function (){
          $("p").show();
        })
      })
    </script>
 <body>
    <p>这是一个段落。</p>
    <button id="hide">隐藏</button>
    <button id="show">显示</button>
  </body>
```

## 5.2 淡入和淡出

- fadeIn()：
  - `$(selector).fadeIn(speed,callback);`
  - speed 参数取值："slow"、"fast"、"normal"或毫秒
  - 参数都是回调都是可选的
  - 用于慢慢淡入已隐藏元素（隐藏元素慢慢出现）
- fadeOut()
  - `$(selector).fadeOut(speed,callback);`
  - 用于慢慢淡出已显示元素
- fadeToggle()
  - `$(selector).fadeToggle(speed,callback);`
  - 可以在 fadeIn() 与 fadeOut() 方法之间进行切换
    - 如果元素已淡出，则 fadeToggle() 会向元素添加淡入效果。
    - 如果元素已淡入，则 fadeToggle() 会向元素添加淡出效果。
- fadeTo()
  - `$(selector).fadeTo(speed,opacity,callback);`
  - opacity 参数将淡入淡出效果设置为给定的不透明度（值介于 0 与 1 之间）

```js
// 示例1：
<script>
$(document).ready(function(){
  $("button").click(function(){
    // 淡入淡出切换
    $("#div1").fadeToggle();
    $("#div2").fadeToggle("slow");
    $("#div3").fadeToggle(3000);

    // 1秒钟  透明度达到0.3
    $("#div1").fadeTo(1000,0.3);

  });
});
</script>

<button>点击淡入/淡出</button>
<div id="div1" style="width:80px;height:80px;background-color:red;"></div>
<br>
<div id="div2" style="width:80px;height:80px;background-color:green;"></div>
<br>
<div id="div3" style="width:80px;height:80px;background-color:blue;"></div>
```

## 5.3 滑动

- slideDown()
  - `$(selector).slideDown(speed,callback);`
  - 向下滑动
- slideUp()
  - `$(selector).slideUp(speed,callback);`
  - 向上滑动
- slideToggle()
  - `$(selector).slideToggle(speed,callback);`
  - slideToggle() 方法可以在 slideDown() 与 slideUp() 方法之间进行切换
  - 如果元素向下滑动，则 slideToggle() 可向上滑动它们。
  - 如果元素向上滑动，则 slideToggle() 可向下滑动它们。

```js
// 示例1：
<script>
  $(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideDown("fast");    //向上滑动
      $("#panel").slideToggle("slow");  // 上下滑动之间切换
    });
  });
</script>

<style type="text/css">
  #panel,#flip
  {
    padding:5px;
    text-align:center;
    background-color:#e5eecc;
    border:solid 1px #c3c3c3;
  }
  #panel
  {
    padding:50px;
    display:none;
  }
</style>
<div id="flip">点我滑下面板</div>
<div id="panel">Hello world!</div>
```

## 5.3 动画

- animate()
  - 用于创建自定义的动画
  - `$(selector).animate({params},speed,callback);`
  - 必需的params参数定义形成动画的 CSS 属性
  - 当使用animate()时，必须使用Camel标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left
  - 必写参数样式可以使用相对值

```js
// 示例1：
<script>
      $(function (){
        $('button').click(function(){
          $('div').animate({left:'250px',opacity:'0.5'}, 3000);
          // height:'+=150px' 相对值
          $('div').animate({left:'250px',height:'+=150px',}, 3000);
        })
      });
</script>
<button>开始动画</button>
<div style="background:#98bf21;height:100px;width:100px;position:absolute;">
</div>
```

# 6. 链式编程

- 要求返回明白每个函数的返回；只有返回元素对象才可以进行链式编程

# 7. 元素节点关系

## 7.1 兄弟关系

- siblings()
  - 被选元素的所有同胞元素（自己除外）：`$("h2").siblings()`
  - 使用可选参数来过滤对同胞元素的搜索：`$("h2").siblings("p")`选取 h2 元素的同胞元素中的 p 元素
- next()
  - 返回被选元素的下一个同胞元素(都是自己除外)
- nextAll()
  - 返回被选元素之后的所有跟随的同胞元素
- nextUntil()
  - 返回介于两个给定参数之间的所有跟随的同胞元素：`$("h2").nextUntil("h6")` 此时只有`h3 h4 h5`元素被选中
- prev()
  - 返回被选元素的上一个同胞元素
- prevAll()
- prevUntil()

## 7.2 祖先关系

- parent()
  - 返回被选元素的直接父元素
    - `$("span").parent()`：此处可能返回多个
- parents()
  - 被选元素的所有祖先元素，它一路向上直到文档的根元素 (<html>)
- parentsUntil()
  - 返回介于两个给定元素之间的所有祖先元素
    - `$("span").parentsUntil("div")`：返回 span 和距离 span 最近的 div 之间的 span 的父元素

## 7.3 后代关系

- children()
  - 默认返回被选元素的所有**_直接子元素_**
  - 通过指定参数进行直接子元素筛选：`$("div").children(".2")`返回 class=2 的子元素
- find()
  - 返回被选元素的后代元素，一路向下直到最后一个后代
    - `$("div").find("*");`：返回 div 所有后代
  - 指定参数选择器筛选：
    - `$("div").find("span");`：选取 div 后代中 span 元素

## 7.4 过滤关系

- first()：返回被选元素的首个元素
- last()：返回被选元素的最后一个元素
- eq()：返回被选元素中带有指定索引下标的元素
- filter()：返回匹配指定规则的元素
- not()：not() 方法与 filter() 相反;返回不匹配规则的元素

```js
// 示例1：first()和last()
<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8">
  <script src="//libs.baidu.com/jquery/1.10.2/jquery.min.js">
  </script>
  <script>
  $(document).ready(function(){
    $("div p").first().css("background-color","yellow");
  });
  </script>
  </head>
<body>
  <h1>欢迎访问我的主页</h1>

  // first() 会选中的这个div和p元素
  <div>
    <p>这是 div 中的一个段落。</p>
  </div>

  // last() 会选中的这个div和p元素
  <div>
    <p>这是另外一个 div 中的一个段落。</p>
  </div>

  <p>这是一个段落。</p>
</body>
</html>
```

```js
// 示例1：eq()
<p>W3Cschool教程 (index 0).</p>
// index 1被选中
<p>http://www.w3cschool.cn (index 1)。</p>
<p>google (index 2).</p>
<p>http://www.google.com (index 3)。</p>
<script>
$(document).ready(function(){
  $("p").eq(1).css("background-color","yellow");
});
</script>
```

```js
// 示例1：filter：返回匹配到 .url  的元素
<p>W3Cschool教程 (index 0).</p>
<p class="url">http://www.w3cschool.cn (index 1)。</p>

$(document).ready(function(){
   $("p").filter(".url").css("background-color","yellow");
});
```

# 动画作业图片回调函数递归
