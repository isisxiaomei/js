let a = {
    age: 10,
    say: function(arr){
        console.log(this.age);
        console.log(arr.toString());
    }
}

let b = {
    age: 20
}
Function.prototype.myApply = function(thisArg){
    if (typeof thisArg !== 'object'){
        throw new Error('error')
    }
    thisArg.fn = this;
    let result = thisArg.fn(arguments[1]);
    delete thisArg.fn;
    return result;
}
a.say.myApply(b, [1,2,3]);      // 20  1,2,3


