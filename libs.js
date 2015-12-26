/**
 * Created by brian on 12/25/15.
 */

module.exports = {
    splitAt: splitAt,
    areArraysEqual: areArraysEqual,
    map: map
};

function areArraysEqual(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
    } else if(arr1.length === 0 && arr2.length === 0){
        return true;
    } else {
        return isArrEqual(arr1.slice(1), arr2.slice(1));
    }
}

function map(arr, func){
    if(arr.length === 0){
        return [];
    } else {
        return [func(arr[0])].concat(map(arr.slice(1), func));
    }
}

function splitAt(input_arr, matcher_func){
    function splitter(input_arr, acc) {
        var head = input_arr[0];
        var tail = input_arr.slice(1);
        if (input_arr.length <= 0) {
            return acc;
        } else if (matcher_func(head)) {
            return [acc[0], input_arr];
        } else {
            return splitter(tail, [acc[0] + head]);
        }
    }
    return splitter(input_arr, [""]);
}