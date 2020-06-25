let test = {
    age: 20,
    say(){
        console.log(this.age);
    }
}

let obj = {
    age: 10
}

//  1. 为Function原型增加myCall方法
Function.prototype.myCall = function (){
    // 2. 获取参数对象obj
    var thisObj = arguments[0];
    // 3. this此时指代的是say这个函数对象，因为是say.myCall
    thisObj.fun = this;

    // 4. 获取其他参数
    var args = [...arguments].slice(1)

    // 5. 调用say方法
    let res = thisObj.fun(args);

    // 6. 删除fun
    delete thisObj.fun;

    // 7. 将函数执行结果返回
    return res;
}

test.say.myCall(obj);
