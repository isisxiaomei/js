// 实例 instanceof 对象
// 示例： a instanceof B
// 检测a的原型链（proto）上是否有B.prototype，若有返回true，否则false

function B(){
    
}
let a = {}
Object.setPrototypeOf(a, B.prototype);

function myInstanceOf(l, r) {    // L 表示左表达式，R 表示右表达式
    l = l.__proto__;             // 取 L 的隐式原型
    var obj = r.prototype;       // 取 R 的显示原型

    while (true) {
        if (l === null) {
            return false;
        }
        if (l === obj) {         // 当 O 显式原型 严格等于  L隐式原型 时，返回true
            return true;
        }
        l = l.__proto__;
    }
}

console.log(myInstanceOf(a, B))
