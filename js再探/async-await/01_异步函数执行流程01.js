async function fun(){
    console.log(111);
    console.log(222);
}

fun()
console.log(333);


// 输出：111 222 333

// 因为async函数内部没有await相当于是promise的同步代码