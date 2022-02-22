async function fun(){
    console.log(111);
    throw new Error("出错了~")
    console.log(222);
}

const promise = fun()

promise.catch(err => {
    console.log(err.message);
})
console.log("后续代码~");