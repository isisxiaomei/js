# 1 模拟jquery封装
```js
// 示例1：
(function JQuery(win){
    win.$ = JqueryFun;
    function JqueryFun(selector){
        return new F(selector);
    }
    function F(selector){
        const elements = document.querySelectorAll(selector);
        for (let i = 0; i < elements.length; ++i){
            this[i] = elements[i];
        }
        this.length = elements.length;
    }
    F.prototype = {
        constructor: F,
        css(key, value){
            for(let i = 0; i < this.length; ++i){
                this[i].style[key] = value;
            }
        }
    }
    // F.prototype.css = function(key, value){
    //     for(let i = 0; i < this.length; ++i){
    //         this[i].style[key] = value;
    //     }
    // }
})(window);

$("div").css("color", "red");

```