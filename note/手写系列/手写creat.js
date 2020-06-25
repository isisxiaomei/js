/**
 * 备注：返回以obj为原型的对象oo
 * var oo = Object.create(obj);
 * 
 */




let A = {
    say() {
        console.log('hello')
    }
}

Object.myCreate = function (obj) {
    function F() { };
    F.prototype = obj;
    return new F();
}

let b = Object.myCreate(A);
// 实例对象b的__proto__指向原型对象A
console.log(b.__proto__ == A);
b.say();

