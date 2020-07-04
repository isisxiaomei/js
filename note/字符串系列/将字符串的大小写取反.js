// 将"AbC"  返回"aBc"

// 示例1：
function fun(str){
    let arr = [];
    for(let i=0; i<str.length; ++i){
        let temp = str.charCodeAt(i);
        if(temp >= 97 && temp <= 122){
            arr.push(String.fromCharCode(temp-32));
        }
        if (temp >= 65 && temp<= 90){
            arr.push(String.fromCharCode(temp+32));
        }
    }
    return arr.join("");
}

console.log(fun("Ab!!!哈哈C"))


// 示例2：
function ff(str){
    return str.replace(/[A-Za-z]/g, content=>{
        return content.toUpperCase() === content ? content.toLowerCase() : content.toUpperCase()
    })
}
console.log(ff("Ab!!!哈哈C"))