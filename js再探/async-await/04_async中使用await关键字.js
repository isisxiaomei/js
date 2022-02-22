function fun(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello")
        }, 0)
    })
}

async function test(){
    const value = await fun()
    console.log(value);
    console.log(222);
}

test()
console.log(111);

