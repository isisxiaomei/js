function Parent(age){
    this.age = age
}
function Son(age){
    
    this.age = age
    this.show.call(Son.prototype)
    this.show = function(){
        this.age = age
    }
}

Son.prototype = new Parent();

var son = new Son(18);


var arr = [{id: 1234}, {id: 1234},{id: 34}]

arr.sort((a,b) => {
    return a.id-b.id;
})

var brr = new Array()
arr.reduce((a, b) => {
    if(a.id == b.id){
        brr.push(a);
    }
    return b;
})

arr.forEach((item,index) => {
    for(let i =0; i< brr.length-1; ++i){
        if(item.id = brr[i].id){
            arr[index] = 0;
        }
    }
})


