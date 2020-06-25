function myTypeOf(o){
    var s = Object.prototype.toString.call(o);
    var str = s.split(' ')[1]
    // 注意substr(开始位置，截取子串的个数)
    return str.substr(0, str.length-1).toLowerCase();
}

console.log(myTypeOf(123));
console.log(myTypeOf('hello'));
console.log(myTypeOf(true));
console.log(myTypeOf({}));
console.log(myTypeOf(function(){}));
console.log(myTypeOf(null));
console.log(myTypeOf(undefined));
console.log(myTypeOf([]));
console.log(myTypeOf(new Date()));
