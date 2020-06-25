function Fun(age){
    this.age = age;
}

function myNew(){
    // 判断传入的第一个参数是否为函数
    if (typeof arguments[0] !== 'function'){
        throw new Error('error')
    }
    // 1. 创建新对象obj
    let obj = Object.create(Object);

    // 2. 将obj的__proto__指向构造函数的prototype
    let thisFun = arguments[0];
    obj.__proto__ = thisFun.prototype;

    // 3. 获取构造函数参数并将构造函数设置为obj的方法
    let args = Array.prototype.slice.call(arguments, 1);
    obj.fun = thisFun;
    // 4. 执行代码
    let res = obj.fun(args);

    // 5. 如果构造函数返回引用类型，则直接返回，否则返回obj
    return typeof res == 'Object' ? res : obj;
}

var oo = myNew(Fun, 10);
console.log(oo.__proto__ == Fun.prototype);
console.log(oo.age);
