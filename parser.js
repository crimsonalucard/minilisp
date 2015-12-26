/**
 * Created by brian on 12/25/15.
 */
var tokenizer = require("./tokenizer.js").tokenizer;
//this translated python code from norvig
//it is horrible in the sense
//that it relies on side effects to build the ast
//the tokens parameter can be thought as a global variable that is equivalent at all levels of recursion.
function build_ast_from_tokens(tokens){
    if(tokens.length === 0){
        throw Error("Unexpected EOF");
    }
    var L = [];
    var token = tokens.pop();

    if(token.token === '('){
        while(tokens[0] !== ')'){
            L.push(build_ast_from_tokens(tokens));
        }
        tokens.pop(); //pop off ')'
    } else if (token.token === ')'){
        throw Error("Unexpected ')'");
    } else { //atom found!
        return token;
    }
}

//below is functional style
//tokens remains immuteable and unchanged at all levels of recursion.
function build_ast_with_index(tokens, start_index){
    var token = tokens[start_index];
    if(start_index >= tokens.length || token.token === ")") {
        return [];
    } else if(token.token === "("){
        var close_parens_index = find_next_closing_parens_index(tokens, start_index);
        if (!close_parens_index){
            throw Error("mismatched parens");
        }
        return [build_ast_with_index(tokens, start_index+1)].concat(build_ast_with_index(tokens, close_parens_index+1));
    } else {
        return [token].concat(build_ast_with_index(tokens, start_index+1));
    }
}

function find_next_closing_parens_index(tokens, start){
    if(start >= tokens.length){
        return false;
    } else if(tokens[start].token === ")"){
        return start;
    } else {
        return find_next_closing_parens_index(tokens, start+1);
    }
}

var testString = "(+ (- 1 3) 2)";
var tokens = tokenizer(testString);
console.log(tokens);
//var ast = build_ast_with_index(tokens, 0);
//console.log(ast);

function eval(ast){

}