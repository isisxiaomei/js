// 示例：get-element-by-id 转换为 getElementById
function myChange(str){
    var arr = str.split('-');
    for(let i=1; i<arr.length; ++i){
        arr[i] = arr[i].charAt(0).toUpperCase().concat(arr[i].substr(1, arr[i].length-1));
    }
    return arr.join('');
}

console.log(myChange("get-element-by-id"));