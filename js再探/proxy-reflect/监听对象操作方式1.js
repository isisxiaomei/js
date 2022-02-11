/**
 * 缺点：无法监听到新增属性和移除属性等
 */



let obj = {
    name: 'hh',
    age: 20
}

Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
        set: function(newVal){
            value = newVal  // 切记不要写 obj[key]  key属性又被设置循环触发set导致栈溢出
            console.log(`${key}--被设置了`);
        },
        get: function(){
            console.log(`${key}--被访问了`);
            return value
        },
    })
});

obj.name= 'ooo'
obj.age = 10

console.log(obj.name);
console.log(obj.age);

// name--被设置了
// VM249:11 age--被设置了
// VM249:14 name--被访问了
// VM249:23 ooo
// VM249:14 age--被访问了
// VM249:24 10

