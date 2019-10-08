# 1. js分类
>w3c组织定义了一套标准；比如针对不同浏览器提供相同的api等
+ ECMASrcipt: 由ECMA组织定义js语法
+ BOM: 浏览器对象模型(比如：弹出新浏览器窗口、关闭移动浏览器以及调整浏览器窗口大小)
+ DOM: 文档对象模型`Document Object Model`(（一个html文本相当于一个文档;因为是对象模型；所以操作的都是对象；那么都是存储在内存中的;将整个页面划分成节点层级构成的文档

# 1.1 节点分类
> HTML 文档中的所有内容都是节点
+ 整个文档是一个文档节点
+ 每个 HTML 元素是元素节点
+ HTML 元素内的文本是文本节点
+ 每个 HTML 属性是属性节点
+ 注释是注释节点
![](image/../../image/dom.png)
```js
// 示例1：
<html>
   <head>
     <title>DOM Tutorial</title>
   </head>
   <body>
     <h1>DOM Lesson one</h1>
     <p>Hello world!</p>
   </body>
</html>
// 解析：
//1. <html> 节点没有父节点；它是根节点
//2. <head> 和 <body> 的父节点是 <html> 节点
//3. 文本节点 "Hello world!" 的父节点是 <p> 节点

//4. <html> 节点拥有两个子节点：<head> 和 <body>
//5. <head> 节点拥有一个子节点：<title> 节点
//6. <title> 节点也拥有一个子节点：文本节点 "DOM 教程"
//7. <h1> 和 <p> 节点是同胞节点，同时也是 <body> 的子节点

//8. <head> 元素是 <html> 元素的首个子节点
//9. <body> 元素是 <html> 元素的最后一个子节点
//10. <h1> 元素是 <body> 元素的首个子节点
//11. <p> 元素是 <body> 元素的最后一个子节点
```
# 2. dom获取元素
## 2.1 写在前面
+ 浏览器解析的顺序是从上往下；所以在script中访问元素时；元素必须已经声明过；否则返回根据获取元素的函数的不同，返回不同；一般我们会把script放在最后一个body之前。
```js
// 示例1
<body>
    <script>
        var main = document.getElementById("main");
        console.log(main);      //null
    </script>
    <div id="main">hello</div>
</body>
```
## 2.2 根据id获取
+ getElementById只能通过document调用，返回一个对象
+ 对象的类型保存在属性`__proto__:HTMLDivElement`
```js
// 示例1：main的类型是HTMLDivElement
<body>
    <div id="main">hello</div>
    <script>
        var main = document.getElementById("main");
        console.log(main);      //main是一个对象
        console.dir(main);      //dir是打印对象
        //这里main对象
    </script>
</body>
```
## 2.3 根据标签组获取
+ getElementsByTagName可以容器对象调用
+ 注意getElementsByTagName获取到的集合是****动态集合：可以在执行的过程中动态添加****

```js
// 示例1：
<body>
    <div>hello</div>
    <div id="a">aaa</div>
    <div>hhhh</div>
    <script>
        var divs = document.getElementsByTagName("div");
        console.log(divs);          //HTMLCollection集合
        for (var i=0; i<divs.length; ++i){
            console.log(divs[i])    //打印出每个元素都是div对象；注意查看div对象的类型
        }
    </script>
</body>
```
![](image/../../image/Snipaste_2019-10-07_12-02-49.png)

```js
// 示例1
//动态集合
//script中都可以访问，因为都是全局作用域
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
        var divs = document.getElementsByTagName("div");
        console.log(divs.length);  //0
    </script>
</head>
<body>
    <div>hello</div>
    <div id="a">aaa</div>
    <div>hhhh</div>
    <script>
        console.log(divs.length);  //3
    </script>
</body>
```
```js
//案例 :只获取container中的div标签
<body>
    <div id="container">
        <div id="a">aaa</div>
        <div>hhhh</div>
        <p>ppppp</p>
    </div>
    <script>
        var container = document.getElementById('container');
        var divs = container.getElementsByTagName('div');
        console.log(divs);
    </script>
</body>
```

## 2.4 通过name属性获取
+ getElementsByName
+ 不推荐使用；在不同浏览器下工作方式不同；比如在IE和Opera中获取name属性的为xxx的同时会把 id为xxx的也获取到

## 2.5 通过class获取元素
+ getElementsByClassName
+ getElementsByClassName 可以在任何元素上调用，不仅仅是document;调用这个方法的元素将作为本次查找的根元素.
+ 浏览器兼容问题；IE9以后才可以用


## 2.6 根据选择器获取
+ querySelector：只返回一个
+ 当class属性相同的时候；querySelector匹配到第一个class为a的返回
+ querySelector和querySelectorAll的区别就是querySelectorAll返回查找到的集合（可以返回多个）
+ pc浏览器从IE8开始才可以用；但是移动端可以用
```js
<body>
    <div id="container">
        <div id="a">aaa</div>
        <div class="a">hhhh</div>
        <div class="a">eeee</div>
        <p>ppppp</p>
    </div>
    <script>
        var element = document.querySelector('#a');
        var ele = document.querySelector('.a');
        console.log(ele);
    </script>
</body>
```
# 3. dom修改
+ 可以修改css样式
+ 可以修改元素内容/属性
+ 可以新增/删除元素
+ 可以修改事件
```js
// 示例1：
// 修改内容和样式
<body>
    <p id="p1">Hello World!</p>
    <script>
        // 修改p元素的内容为New text!
        document.getElementById("p1").innerHTML="New text!";
        // 修改p元素的样式颜色
        document.getElementById("p1").style.color="blue";
    </script>

</body>
```
```js
// 示例2: 新增新元素节点
// 解析：给div新增子节点p元素，并设置新p元素的id属性值为p3，内容节点的内容为“新内容”
<div id="d1">
<p id="p1">This is a paragraph.</p>
<p id="p2">This is another paragraph.</p>
</div>
<script>
    var pnode = document.createElement("p");
    var tnode = document.createTextNode("新内容");
    pnode.id = "p3";
    pnode.appendChild(tnode);
    var divNode = document.getElementById("d1");
    divNode.appendChild(pnode);
    var ps = divNode.getElementsByTagName("p");
    for (var i=0; i<ps.length; ++i){
        console.log(ps[i]);
    }
</script>
```
```js
// 示例3：改变body的背景颜色
<body>

    <input type="button" onclick="document.body.style.backgroundColor='blue';"
    value="Change background color" />

</body>

// 示例4：等同于示例3，只进行了函数封装
<body>

    <script>
    function ChangeBackground()
    {
    document.body.style.backgroundColor="blue";
    }
    </script>

    <input type="button" onclick="ChangeBackground()"
    value="Change background color" />

</body>
```
# 4. dom操作元素
+ createElement()：创建新元素
+ appendChild()：为父节点添加已存在的子节点
+ insertBefore()：appendChild方法会在父节点的末尾添加节点，而insertBefore方法可以在指定节点前添加已存在节点
+ removeChild()：删除子节点（删除的前提必须知道待删除节点的父节点）
+ replaceChild()：替换子节点
```js
<div id="div1">
<p id="p1">This is a paragraph.</p>
<p id="p2">This is another paragraph.</p>
</div>

// 示例1：
// 步骤：先创建新元素节点、再添加到父节点

<script>
    var p3 = document.createElement("p");
    var text3 = document.createTextNode("这是p3的内容");
    p3.id = "p3";
    p3.appendChild(text3);

    var divs = document.getElementById("div1);
    divs.appendChild(p3);
</script>

// 示例2：
// parent.insertBefore(para,child)，将para元素插入到child元素之前
<script>
    var para=document.createElement("p");
    var node=document.createTextNode("This is new.");
    para.appendChild(node);

    var element=document.getElementById("div1");
    var child=document.getElementById("p2");
    element.insertBefore(para,child);
</script>

// 示例3：
// removeChild：必须知道父节点
<script>
    var element=document.getElementById("div1");
    var child=document.getElementById("p2");
    element.removeChild(child);
</script>

// 示例4：
// parent.replaceChild(para,child);  使用para替换child元素
<script>
var parent=document.getElementById("div1");
var child=document.getElementById("p1");
var para=document.createElement("input");
para.value  = "new";
parent.replaceChild(para,child);
</script>
```
# 5. DOM操作属性
## 5.1 dom操作非标单元素属性
+ 通过dom获取到的标签都是对象；标签的属性则是对象的属性；可以使用对象.属性的方式访问
+ 注意class属性不能通过对象.class的形式访问（因为class是类关键字），以***对象.className***访问
```js
//示例1：点击按钮div显示隐藏(隐藏样式通过display)
    <style>
        #box {
            background-color: red;
            width: 200px;
            height: 200px;
        }
        .show {
            display: block;
        }
        .hidden {
            display: none;
        }
    </style>
<body>
    <input type="button" id="btn" value="显示" >
    <div id="box"></div>
    <script>
        var btn = document.getElementById('btn');
        var box = document.getElementById('box');

        btn.onclick = function () {
            btn.value = "隐藏";
            //注意这句box.className 不能采用box.class；因为class关键字
            box.className = "hidden";
        }
    </script>
</body>
```

## 5.2 dom操作表单元素属性
+ 当html元素的属性只有一个值的时候，在dom中这个属性的值就会只有true或者false：`disable、checked`
## 5.3 dom操作元素自定义属性
+ 自定义属性不能直接通过对象.属性名的方式操作;需要对象调用getAttribute方法和setAttribute方法
+ getAttribute和setAttribute：自定义属性和非自定义属性都可以用
```html
<!-- 示例1： -->
<body>
    <!--//这里的age属性和personId是自定义属性-->
    <div id="divObj" age="18" personId="1">张三</div>

    <script>
        var divObj = document.getElementById('divObj');
        console.log(divObj.id);
        //自定义属性不能直接对象.属性的形式访问
        // console.log(divObj.age);
        // console.log(divObj.personId);

        //自定义属性获取：
        console.log(divObj.getAttribute('age'));
        console.log(divObj.getAttribute('personId'));

        //属性设置（自定义属性和非自定义属性都可以用）
        divObj.setAttribute("age", "19");
        divObj.setAttribute("class", "divname");

        //属性移除（自定义属性和非自定义属性都可以用）
        divObj.removeAttribute("age");
    </script>
</body>
```

# 6. 事件
+ `onclick=JavaScript`
```js
// 示例1：
<h1 onclick="this.innerHTML='Ooops!'">Click on this text!</h1>

// 示例2：
<head>
    <script>
        function changetext(id){
            id.innerHTML="Ooops!";
        }
    </script>
</head>
<body>
    <h1 onclick="changetext(this)">Click on this text!</h1>
    <h1 onclick="changetext(document.getElementsByTagName('h1')[0])">点击文本!</h1>
</body>


// 示例3：
<button id="myBtn">Try it</button>
<p id="demo"></p>
<script>
    document.getElementById("myBtn").onclick=function(){displayDate()};

    function displayDate()
    {
        document.getElementById("demo").innerHTML=Date();
    }
</script>
```

# 7. 导航
+ 导航节点关系：parentNode、firstChild 以及 lastChild
+ 文本节点在前，元素节点在后
+ 除了 innerHTML 属性，您还可以使用 childNodes 和 nodeValue 属性来获取元素的内容
+ nodeValue和innerHTML的区别：innerHTML表示元素的文本，nodeValue表示文本节点的值;因为文本节点没有innerHTML属性
+ document.documentElement - 全部文档
+ document.body - 文档的主体
```html
<html>
 <body>
    <p id="p1">p1 text</p>
    <div id="div1">
        <p id="p2">p2 text</p>
        <p id="p3">p3 text</p>
    </div>
    <script>
        var x=document.getElementById("p1");
        document.write(x.firstChild.nodeValue); //p1 text
        var txt=document.getElementById("p2").childNodes[0].nodeValue;
        document.write(txt);

        var divs = document.getElementById("div1");
        console.log(divs.childNodes[1].innerHTML);  //p2 text
        console.log(divs.lastChild);
        console.log(divs.parentNode);
    </script>
 </body>
 </html>
```
