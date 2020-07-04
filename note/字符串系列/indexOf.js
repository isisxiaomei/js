// 在字符串s中查找字符串t，存在返回所在位置，不存在返回-1

// 方法1：
function search(str, t){
    let res = str.match(t);
    return  res == null ? -1 : res.index;
}

console.log(search('hello', 'll'))

// 方法2：
