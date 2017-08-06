'use strict';

var spliceAroundIndex = function (array, index) {
    array.splice(index + 1, 1);
    array.splice(index - 1, 1);
};


function ResultCalculator() {
    /**
     * eg. Replaces [2, *, 3, +, 4] with [6, +, 4]
     */
    var squashMultiplicationsAndDivisions = function (equation) {
        for (var i = 0; i < equation.length; i++) {
            if (equation[i] === "*") {
                equation[i] = Number(equation[i - 1]) * Number(equation[i + 1]);
                spliceAroundIndex(equation, i);
            } else if (equation[i] === "/") {
                equation[i] = Number(equation[i - 1]) / Number(equation[i + 1]);
                spliceAroundIndex(equation, i);
            }
        }
        return equation;
    };

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

        if (result % 1 === 0) {
            return result;
        } else {
            return result.toPrecision(9) / 1;
        }
    };

    this.calculateResult = function (history) {
        // add "|" either side of each number
        var equationStr = history.replace(new RegExp(/((\d+(\.?\d+)?))/g), "|$1|");

        // convert equationStr to array
        var equation = equationStr.split("|");

        // remove first entry because it is empty
        equation.shift();

        equation = squashMultiplicationsAndDivisions(equation);

        return addAndSubtractResult(equation).toString();
    };



}

