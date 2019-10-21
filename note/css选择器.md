# 1. 基本选择器

## 1.1 标签选择器

```css
/* 示例1： */
h1 {
  font-size: 10px;
  color: chocolate;
}
```

## 1.2 类选择器

```css
/* 示例1： */
.classname {
  font-size: 10px;
  color: chocolate;
}
```

## 1.3 通配符选择器

- \*指所有的标签

```css
/* 示例1 */
* {
  font-size: 10px;
}
```

## 1.4 id 选择器

- id 选择器名不能全局元素只能出现一个
- 类选择器名可以出现多个

```css
/* 示例1： */
#id {
  font-size: 10px;
}
```

```html
<!-- 示例2： -->
<span class="font20">亚瑟</span>
<span id="hreo">刘备</span>
<span class="font10">安其拉</span>
<span id="hreo">后裔</span>
<!--id名唯一，不能重复-->
```

## 1.5 选择器列表

- 可以将各种选择器放在一起组合用逗号隔开

```css
/* 示例1： */
h1 {
  color: blue;
}
.special {
  color: blue;
}

/* 示例1：改进版列表  下面两种方式都可以*/
h1,
.special {
  color: blue;
}
/* 或者 */
h1,
.special {
  color: blue;
}
```

# 2. 属性选择器

- 默认区分大小写
- 使用`i`可以不区分大小写：`li[class^="a" i]` 匹配 a 或者 A 开头

| 选择器          | 描述                                                                                                    | 举例                          |
| --------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------- |
| E[attr]         | 匹配元素为 E 且属性为 attr 的元素                                                                       | a[title]                      |
| E[attr=val]     | 匹配元素为 E 且属性为 attr 且值是 value                                                                 | a[href="https://example.com"] |
| [attr~=value]   | 匹配元素为 E 且属性为 attr 且值是 value；或者 class 匹配属性包含一个或多个类名时，至少一个与 value 匹配 | p[class~="special"]           |
| E[attr\|=value] | 匹配元素为 E 且属性为 attr，其值可以完全是 value 或可以以 value 开头                                    | div[lang\|="zh"]              |
| E[attr*=val]    | 匹配元素为 E 且属性值包含 val 字符，并且在任意位置                                                      |
| E[attr^=val]    | 匹配元素为 E 且属性值以 val 字符开头                                                                    |
| E[attr$=val]    | 匹配元素为 E 且属性值以 val 字符结尾                                                                    |

```html
<!-- 示例1： -->
<!-- 匹配到有class属性的li -->
li[class] { font-size: 200%; }

<!-- 匹配 Item 2 -->
li[class="a"] { background-color: yellow; }
<!-- 匹配 Item 2 和 Item 3-->
li[class~="a"] { color: red; }

<ul>
  <li>Item 1</li>
  <li class="a">Item 2</li>
  <li class="a b">Item 3</li>
  <li class="ab">Item 4</li>
</ul>
```

```html
<!-- 示例2 -->
<!-- 匹配到  Item 1 和 Item 2-->
li[class^="a"] { font-size: 200%; }
<!-- 匹配到 Item 1 和 Item 3-->
li[class$="a"] { background-color: yellow; }
<!-- Item 1 和 Item 2 和 Item 3 和 Item 4 -->
li[class*="a"] { color: red; }

<ul>
  <li class="a">Item 1</li>
  <li class="ab">Item 2</li>
  <li class="bca">Item 3</li>
  <li class="bcabc">Item 4</li>
</ul>
```

# 3. 伪类选择器

- 伪类选择器为元素的所处的`位置或者状态`设置样式

## 3.1 结构伪类选择器(css3 特有的，注意兼容性)

- `:first-child`: 表示在一组兄弟元素中的第一个元素
- `:last-child`: 表示在一组兄弟元素中的最后一个元素
- `:nth-child(an+b)`: 找到所有当前元素的兄弟元素，然后按照位置先后顺序从 1 开始排序（n=0，1，2...）
  - `li:nth-child(even)`: 表示一组元素的偶数行且元素为`li`
  - `li:nth-child(2n)`: 表示一组元素的偶数行且元素为`li`
  - `li:nth-child(odd)`：表示一组元素的奇数行且元素为`li`
  - `li:nth-child(2n+1)`：表示一组元素的奇数行且元素为`li`
  - `li:nth-child(n)`：表示一组元素的所有行且元素为`li`
  - `li:nth-child(3)`：表示选中一组元素的第 3 行且元素为`li`
  - `span:nth-child(0n+1)`:表示子元素中第一个且为 span 的元素，与 :first-child 选择器作用相同。
  - `span:nth-child(-n+3)`：匹配前三个子元素中的 span 元素。

```html
<!-- 示例1： -->
<style>
  p:first-child {
    color: lime;
    background-color: black;
    padding: 5px;
  }
</style>

<div>
  <p>第一个被选中</p>
  <p>不被选中</p>
</div>

<div>
  <p>第一个被选中</p>
  <h2>不被选中</h2>
  <p>不被选中</p>
</div>
```

```html
<!-- 示例2： -->
<style>
  li:first-child {
    /*选择第一个*/
    color: red;
  }
  li:last-child {
    /*选择最后一个*/
    color: blue;
  }
  li:nth-child(3) {
    /*选择其中某一个，这里选择的是第三个*/
    color: skyblue;
  }
  li:nth-child(even) {
    /*even选择的是偶数项*/
    color: deeppink;
  }
  li:nth-child(odd) {
    /*odd选择的是奇数项*/
    color: green;
  }
  li:nth-child(n) {
    /*n选择的是所有项*/
    color: red;
  }
  li:nth-child(2n) {
    /* 2n选择的是所有偶数项 2n+1所有奇数项*/
    color: red;
  }
  li:nth-last-child(n) {
    /*nth-last-child是从最后一项开始往前数的*/
  }
</style>

<!-- 兄弟元素位置从1开始 -->
<ul>
  <li>第1个</li>
  <li>第2个</li>
  <li>第3个</li>
  <li>第4个</li>
  <li>第5个</li>
</ul>
```

```html
<!-- 示例1： -->
<style>
  /* 表示 second这个div下的 所有span标签奇数项*/
  .second span:nth-child(2n + 1) {
    background-color: red;
  }
</style>

<div class="first">
  <span>Span 1!</span>
  <span>Span 2</span>
  <span>Span 3!</span>
  <span>Span 4</span>
  <span>Span 5!</span>
</div>

<div class="second">
  <span>Span1</span>
  <span>Span2</span>
  <em>em 3</em> //这行是奇数行，但不是span元素所以不被选中
  <span>Span4</span>
  <span>Span5</span>
</div>
```

## 3.2 链接伪类选择器

> 备注：写的时候顺序不要颠倒

- `:link`: 未访问过得链接
- `:visited`: 已访问过得链接
- `:hover`: 鼠标移动到链接上
- `:active`: 选定的链接（鼠标放上去别松开，显示的状态）

```css
/* 示例1： */
<style>
/* 注意冒号前的写法；可以是元素也可以是选择器 */
        #a:link {
            color: red;
        }
        a:visited {
            color: green;
        }
        a:hover {
            color: yellow;
        }
        a:active {
            color: blue;
        }
</style>
<a href="#" id="a">秒杀</a>
```

## 3.3 目标伪类选择器

- 为定位到锚点目标后，锚点目标的状态设置属性，这里定位到的锚点设置成红色

```css
/* 示例1：点击链接跳到指定锚点位置锚点的样式 */
<style>
    p:target {
        background-color: red;
    }
</style>
<ol>
 <li><a href="#p1">Jump to the first paragraph!</a></li>
</ol>
<p id="p1">Click on the link above to try out!</p>
```

# 4. 伪元素选择器（CSS3 新增）

- **本质**：伪元素选择器主要选择元素的某个部分而不是元素本身

## 4.1 基本伪元素选择器

- `::first-line`：选择元素的第一行(不管单词量的增加减少会自动调整始终选择第一行)
- `::first-letter` : 匹配元素的第一个字母（都是采用双冒号 CSS3 新增）
- `::after`：创建一个伪元素，该元素是所选元素的最后一个子元素。它通常用于将装饰性内容添加到具有该 content 属性的元素中。默认情况下是内联的
- `::before`：创建一个伪元素，该元素是所选元素的第一个子元素。它通常用于将装饰性内容添加到具有该 content 属性的元素中。默认情况下是内联的
- `::selection`：表示如点击或者选中文本时的样式

```css
/* 示例1 */
div::before {
    content: "俺";
    color: red;
    background-color: blue;
}
div::after {
    content: "18";
}

<div>今年</div>
```

```css
/* 示例1： */
<style type="text/css">
        p::first-letter {  //第一个字
            color: red;
        }
        p::first-line {     //设置第一行
            color: green;
        }
        p::selection {      //设置鼠标选中的文本背景色
            color: skyblue;
        }
    </style>

<p>新闻：如果您不希望选择任意的后代元素，而是希望缩小范围，只选择某个元素的子元素，请使用子元素选择器（Child selector）。
例如，如果您希望选择只作为 h1 元素子元素的 strong 元素，可以这样写：</p>
```

```css
/* 示例1： */
<style type="text/css">
      ::selection {
        color: gold;
        background-color: red;
      }

      p::selection {
        color: white;
        background-color: blue;
      }
</style>

This text has special styles when you highlight it.
 <p>Also try selecting text in this paragraph.</p>
```

## 4.2 伪类和伪元素的结合

```html
<!-- 示例1：主要查看选择器之间的连用 -->
<style>
  article p:first-child::first-line {
    font-size: 120%;
    font-weight: bold;
  }
</style>

<article>
  <p>
    Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
    daikon amaranth tatsoi tomatillo melon azuki bean garlic.
  </p>

  <p>
    Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette
    tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.
    Dandelion cucumber earthnut pea peanut soko zucchini.
  </p>
</article>
```

# 5. 组合选择器

- 由两个或者多个基础选择器组合而成的，为了选择更准确更精细的元素标签

## 5.1 后代选择器

- 后代选择器：用空格隔开的表示在父元素的大前提下在选择指定的元素；并且用空格隔开

```css
/* 示例1：*/
.box p {
    color: red;
}

<div class="box"><p>Text in .box</p></div>
<p>Text not in .box</p>
```

```css
/* 示例1： */
<style>
       div ul li {
           color: red;
       }
       .IT ul li {
           color: blue;
       }
    </style>
    <div class="IT">
        <ul>
            <li>百度</li>
            <li>新浪</li>
            <li>网易</li>
        </ul>
    </div>
```

## 5.2 并集选择器

- 如果样式各标签样式一样，可以采用逗号隔开的方式

```css
/* 示例1： */
<style>
       div,
       em,
       .girl {
           color: red;
       }
</style>

<div>刘德华</div>
<em>韩红</em>

<p>我不变色</p>
<p class="girl">王菲</p>
```

## 5.3 子元素选择器

- 子组合器是一个大于号（>），仅当选择器选择直接子元素时才匹配。层次结构后面的子孙不匹配

```css
/* 示例1： */
ul > li {
    border-top: 5px solid red;
}

<ul>
    <li>Unordered item</li>
    <li>Unordered item
        <ol>
            <li>Item 1</li>
            <li>Item 2</li>
        </ol>
    </li>
</ul>
```

## 5.4 相邻同级选择器
+ `h1 + p`：表示选择 h1 元素之后紧挨着第一个同级 p 元素
```css
/* 示例1： */
h1 + p {
        font-weight: bold;
        background-color: #333;
        color: #fff;
        padding: 0.5em;
}

<article>
          <p>I am a paragraph.</p>
          <h1>A heading</h1>
          <p>I am a paragraph.</p>      /* 被选中 */
          <p>I am another paragraph.</p>
          <div>I am a div</div>
          <p>I am another paragraph.</p>
</article>
```

## 5.5 一般同级选择器
+ `h1 ~ p`：表示选择 h1 元素之后的所有同级 p 元素
```css
/* 示例1： */
h1 ~ p {
        font-weight: bold;
        background-color: #333;
        color: #fff;
        padding: 0.5em;
      }
<article>
          <p>I am a paragraph.</p>
          <h1>A heading</h1>
          <p>I am a paragraph.</p>          /*被选中*/
          <p>I am another paragraph.</p>    /*被选中*/
          <div>I am a div</div>
          <p>I am another paragraph.</p>    /*被选中*/
</article>
```
