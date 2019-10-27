# 1. css样式表
## 1.1 行内样式表
+ 直接在标签内写内部样式
```html
<div style="color: red; font-size: 12px;">
通过标签的style属性设置元素的样式</div>
```
 
 ## 1.2 内部样式表
 + 内部样式表可以放在任何位置包括在html标签外，通常习惯放head中
```css
<style type="text/css">
    .g {
        color: #007FFF;
        font-size: 30px;
        font-family: "Microsoft yahei";
    }
</style>
```
## 1.3 外部样式表
+ 实现结构和样式分离
```html
<link href="css路径/文件名.css" type="text/css" rel="stylesheet" >
```