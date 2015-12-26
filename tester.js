/**
 * Created by brian on 12/25/15.
 */

var libs = require("./libs.js");

var tests = [
    Test(libs.splitAt,
        ["aaaaaaaaaa)aaaaa",
            function (x) {
                return x === ")";
            }],
        function (output) {
            return output[0] === "aaaaaaaaaa" && output[1] === ")aaaaa";
        })
];

function Test(test_function, parameters, match_function) {
    return function () {
        var output = test_function.apply(this, parameters);
        var result = match_function(output);
        console.log("test: " + result ? "passed." : "failed.");
    }
}

function run_tests(tests) {
    libs.map(tests, function (x) {
        x();
    });
};

run_tests(tests);