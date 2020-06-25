let user = {
    age: 18,
    habby: {
        ball: '篮球',
        sing: '唱歌'
    },
    arr:[1,2,{ sex: '女'}]
}

// function copy(obj) {
//     var oo = {};
//     for (let k in obj) {
            // 也可以采用这种判断 obj[k] instanceof Object
//         if (Object.prototype.isPrototypeOf(obj[k])){
//             oo[k] = copy(obj[k]);
//         }
//         else{
//             oo[k] = obj[k];
//         }
//     }
//     return oo;
// }


// 示例2： 适合对象和数组
function copy(obj) {
    var oo = obj instanceof Array ? [] : {};

    for (let [k, v] of Object.entries(obj)) {
        oo[k] = typeof v == "object" ? copy(v) : v;
    }
    return oo;
}
let oo = copy(user);
user.habby.ball = '足球';
user.arr[2].sex = '男';
console.log(oo);