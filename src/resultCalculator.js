'use strict';

function ResultCalculator() {
    /**
     *  eg. The result from [2, +, 4, -, 1] is 1
     */
    var addAndSubtractResult = function (equation) {
        var result = Number(equation[0]);
        for (var i = 1; i < equation.length; i += 2) {
            if (equation[i] === "+") {
                result += Number(equation[i + 1]);
            } else if (equation[i] === "-") {
                result -= Number(equation[i + 1]);
            } else {
                // TODO: throw error
            }
        }
        return result;
    };

    this.calculateResult = function (history) {
        // add "|" either side of each number
        var equationString = history.replace(new RegExp(/(\d+)/g), "|$1|");

        // convert equationStr to array
        var equation = equationString.split("|");

        // remove first entry because it is empty
        equation.shift();

        return addAndSubtractResult(equation).toString();
    };



}

