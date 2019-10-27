# 1. 问题：
+ 如何解决bind的浏览器兼容性问题，因为bind是es5中开始存在的
+ bind实现传参
# 2. bind实现
```js
Function.prototype._bind = function (target){
    // 这里的this指向fn
    
    // 方式1:(因为箭头函数的this由外部函数this决定)
    return ()=>{
        this.call(taget);
    };

    // 方式2：
    var that = this;
    return function(){
        that.call(target);
    };
}

function fn(){
    console.log(this)
}
fn._bind({ age: 18 };
```