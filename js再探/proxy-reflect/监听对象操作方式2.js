/**
 * proxy类代理对象：将源对象的操作代理到代理对象，进而代理对象再传递到源对象，代理对象中可以进行13种捕获器操作
 */


 let obj = {
    name: 'bob',
    age: 20
}

const proxyObj = new Proxy(obj, {
    // get和set相当于捕获器  targetObj就是obj key是属性  receiver指proxyObj对象（并且receiver只存在get和set捕获器中）
    get: function(targetObj, key, receiver){
        console.log(`${key}--被访问了`, targetObj);
        return targetObj[key]
    },
    set: function(targetObj, key, newVal, receiver){
        targetObj[key] = newVal
        console.log(`${key}--被设置了`, targetObj);
    }
})


console.log(proxyObj.name); // name--被访问了 {name: 'bob', age: 20} bob
console.log(proxyObj.age); // age--被访问了 {name: 'bob', age: 20}  20

proxyObj.name = 'john'  // name--被设置了 {name: 'john', age: 20}
proxyObj.age = 10  // age--被设置了 {name: 'john', age: 10}

console.log(obj);  // {name: 'john', age: 10}
console.log(proxyObj);   // Proxy {name: 'john', age: 10}





