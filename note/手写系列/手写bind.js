let test = {
    age: 20,
    say(){
        console.log(this.age);
    }
}

let obj = {
    age: 10
}


Function.prototype.myBind = function(){
    if( typeof this !== 'function'){
        throw new Error('error')
    }
    let thisObj = arguments[0];
    let args = [...arguments].slice(1);
    let that = this;

    // 返回一个函数，函数内部借用apply或者call实现
    return function(){
        return that.apply(thisObj, args)
    }
}

console.log((test.say.myBind(obj))());
