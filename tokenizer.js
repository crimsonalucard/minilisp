var constants = require('./constants.js');

var TokenStream = function (text) {
    this.text = text;
    this.index = 0;
    this.done = false;
}

TokenStream.prototype.advance = function () {
    this.index++;
    if (this.index === this.text.length) {
        this.done = true;
    }
}

TokenStream.prototype.currentToken = function () {
    return this.text[this.index];
}

TokenStream.prototype.isDone = function () {
    return this.done;
}

TokenStream.prototype.nextToken = function () {
    return this.text[this.index + 1];
}

function tokenizer(text) {
    var result = [];
    var tokenStream = new TokenStream(text);

    while (!tokenStream.isDone()) {
        var token = tokenStream.currentToken();

        if (constants.isAToken(token)) {
            result.push({type: 'operator', token: token});
        } else if (constants.isALetter(token)) {
            while (constants.isALetter(tokenStream.nextToken())) {
                tokenStream.advance();
                token += tokenStream.currentToken();
            }
            result.push({type: 'keyword', token: token});
        } else if (constants.isANumber(token)) {
            while (constants.isANumber(tokenStream.nextToken())) {
                tokenStream.advance();
                token += tokenStream.currentToken();
            }

            result.push({type: 'number', token: token});
        } else if (token === constants.quote) {
            while (constants.isALetter(tokenStream.nextToken())
            || constants.isANumber(tokenStream.nextToken())
                ) {
                tokenStream.advance();
                token += tokenStream.currentToken();
            }
            tokenStream.advance();
            token += tokenStream.currentToken();
            result.push({type: 'string', token: token});
        }
        tokenStream.advance();
    }
    return result;
}

console.log(tokenizer('(+ 1 3)(func (+ 2 3))("hello")'));
