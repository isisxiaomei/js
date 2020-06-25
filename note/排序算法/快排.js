function findMid(nums, l, r){
    let i = l;
    let temp = nums[i];
    let j = r;
    while (i<j){
        while(i<j){
            if (temp <= nums[j]) {
                --j;
            }
        }
        if (i<j){
            nums[i] = nums[j];
        }
        while(i<j){
            if (temp >= nums[i]) {
                ++i;
            }
        }
        if(i<j){
            nums[j] = nums[i]
        }
    }
    nums[i] = temp;
    return i;

}


function quickSort(nums, l, r){
    if(nums){
        let position = findMid(nums, l, r);
        quickSort(nums, l, position-1);
        quickSort(nums, position+1, r);
    }
}

var arr = [6,3,7,2,9,10,1];
quickSort(arr, 0, arr.length-1);

console.log(arr);