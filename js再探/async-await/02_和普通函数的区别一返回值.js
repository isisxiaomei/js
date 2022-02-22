async function fun(){
    console.log(111);
    console.log(222);
}

const promise = fun()

promise.then(res => {
    console.log(res); // undefined
})

console.log(333);

// async函数返回值一定是promise

// 如果是promise则会有then，那么then的执行时机?
// promise的then触发条件是async函数return时，会将return的值作为then的参数；如果没有显示return，相当于默认return的undefined

// 



