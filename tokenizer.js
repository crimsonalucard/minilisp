
module.exports = {
    tokenizer: tokenizer
};

function tokenizer(input_string){
    var character = input_string[0];
    if(!input_string || input_string.length === 0){
        return [];
    } else if (character === "(" || character === ")"){
        return [character].concat(tokenizer(input_string.slice(1)));
    } else if(character === " "){
        return [].concat(tokenizer(input_string.slice(1)));
    } else {
        var newInput = breakOffHeadAtom(input_string, [""]);
        var head = newInput[0];
        var tail = newInput[1];
        return [head].concat(tokenizer(tail, 0));
    }
}

function breakOffHeadAtom(input_string, acc){
    if(input_string.length <= 0){
        return acc;
    } else if(input_string[0] === " " || input_string[0] === "(" || input_string[0] === ")"){
        return [acc[0],input_string];
    } else {
        return breakOffHeadAtom(input_string.slice(1), [acc[0]+input_string[0]]);
    }
}


