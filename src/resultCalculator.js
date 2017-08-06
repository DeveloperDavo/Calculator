'use strict';

var spliceAroundIndex = function (array, index) {
    array.splice(index + 1, 1);
    array.splice(index - 1, 1);
};


function ResultCalculator() {
    var NUMBER_REG_EX = /((\d+(\.?\d+)?))/g;

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
            return result.toPrecision(3) / 1;
        }
    };

    this.calculateResult = function (history) {
        // add "|" either side of each number
        var equationStr = history.replace(NUMBER_REG_EX, "|$1|");

        // convert equationStr to array
        var equation = equationStr.split("|");

        if (equation[0].length === 0) {
            // remove first entry
            equation.shift();
        } else {
            // prepend 0
            equation.unshift("0");
        }

        equation = squashMultiplicationsAndDivisions(equation);

        return addAndSubtractResult(equation);
    };



}

