// 可以利用这个方法进行判断
// Object.prototype.toString.call([]); // "[object Array]"
// Object.prototype.toString.call(function(){}); // "[object Function]"


function myIsArray(arg){
    if (Object.prototype.toString.call(arg) == "[object Array]"){
        return true;
    }
    return false;
}

console.log(myIsArray([]));