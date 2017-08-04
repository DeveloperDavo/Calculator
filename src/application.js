'use strict';

var removeLeadingZeroes = function (multipleDigitStr) {
    return Number(multipleDigitStr).toString();
};

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

var spliceAroundIndex = function (array, index) {
    array.splice(index + 1, 1);
    array.splice(index - 1, 1);
};

function Application() {
    var DECIMAL_POINT = ".";
    var EQUALS_SYMBOL = "=";
    var OPERATIONS = ["+", "-", "/", "*"];

    var multipleDigitStr = "";
    var equation = [];
    var clickedOnEquals = false;
    var history = "";

    var refreshDisplay = function (textToDisplay) {
        document.getElementById('display').innerHTML = textToDisplay;
        var historyInnerHtml = history;
        if (history.length === 0) {
            historyInnerHtml = "0";
        }
        document.getElementById('history').innerHTML = historyInnerHtml;
    };

    var clearAll = function () {
        equation = [];
        multipleDigitStr = "0";
        history = "";
    };

    var throwAndDisplayError = function () {
        var temp = equation;
        clearAll();
        refreshDisplay("Error");
        throw "equation array has been compromised: [" + temp + "]";
    };

    /**
     * eg. Replaces [2, *, 3, +, 4] with [6, +, 4]
     */
    var squashMultiplicationsAndDivisions = function () {
        for (var i = 0; i < equation.length; i++) {
            if (equation[i] === "*") {
                equation[i] = Number(equation[i - 1]) * Number(equation[i + 1]);
                spliceAroundIndex(equation, i);
            } else if (equation[i] === "/") {
                equation[i] = Number(equation[i - 1]) / Number(equation[i + 1]);
                spliceAroundIndex(equation, i);
            }
        }
    };

    /**
     *  eg. The result from [2, +, 4, -, 1] is 1
     */
    var addAndSubtractResultFromEquation = function () {
        var result = Number(equation[0]);
        for (var i = 1; i < equation.length; i += 2) {
            if (equation[i] === "+") {
                result += Number(equation[i + 1]);
            } else if (equation[i] === "-") {
                result -= Number(equation[i + 1]);
            } else {
                throwAndDisplayError();
            }
        }
        return result;
    };

    var calculateResultFromEquation = function () {
        squashMultiplicationsAndDivisions();
        return addAndSubtractResultFromEquation();
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayCurrentNumber = function (digitStr) {
        return function () {
            if (clickedOnEquals) {
                // Don't append to existing digit string as this should be the previous result
                multipleDigitStr = digitStr;
                clickedOnEquals = false;
            } else {
                // Append to existing digit string
                multipleDigitStr += digitStr;
            }
            history += digitStr;
            refreshDisplay(removeLeadingZeroes(multipleDigitStr));
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayOperation = function (operation) {
        return function () {
            if (clickedOnEquals) {
                history = multipleDigitStr;
            }

            // only push digits to equation if the equation is empty last part of the equation is an operation.
            if (equation.length === 0 || isOperation(equation[equation.length - 1])) {
                equation.push(multipleDigitStr);
            }

            multipleDigitStr = "0";

            if (history.length === 0) {
                history += multipleDigitStr;
            }

            history += operation;
            equation.push(operation);
            refreshDisplay(operation);
        }
    };

    var displayCurrentNumberOnClick = function (numberElement) {
        numberElement.onclick = displayCurrentNumber(numberElement.innerHTML);
    };

    var displayCurrentOperationOnClick = function (numberElement) {
        numberElement.onclick = displayOperation(numberElement.innerHTML);
    };

    var displayEachNumberOnClick = function () {
        var numberElementsArray = convertNodeListToArray(document.getElementsByClassName('number'));
        numberElementsArray.forEach(displayCurrentNumberOnClick);
    };

    var displayEachOperationOnClick = function () {
        var operationElementsArray = convertNodeListToArray(document.getElementsByClassName('operation'));
        operationElementsArray.forEach(displayCurrentOperationOnClick);
    };

    var displayDecimalPointOnClick = function () {
        document.getElementById('decimal-point').onclick = function () {
            if (clickedOnEquals) {
                // Don't append to existing digit string as this should be the previous result
                multipleDigitStr = "0" + DECIMAL_POINT;
                history = "0" + DECIMAL_POINT;
                clickedOnEquals = false;
            } else {
                // Append to existing digit string
                multipleDigitStr = removeLeadingZeroes(multipleDigitStr);
                multipleDigitStr += DECIMAL_POINT;
                history += DECIMAL_POINT;
            }
            refreshDisplay(multipleDigitStr);
        };

    };

    var displayResultOnClick = function () {
        var equalsElement = document.getElementById('equals');
        equalsElement.onclick = function () {
            equation.push(multipleDigitStr);

            multipleDigitStr = calculateResultFromEquation().toString();

            history += EQUALS_SYMBOL;
            history += multipleDigitStr;

            refreshDisplay(removeLeadingZeroes(multipleDigitStr));

            history = "";
            equation = [];
            clickedOnEquals = true;
        };
    };

    var clearAllOnClick = function () {
        document.getElementById('all-clear').onclick = function () {
            clearAll();
            clickedOnEquals = false;
            refreshDisplay(removeLeadingZeroes(multipleDigitStr));
        };
    };

    var isOperation = function (text) {
        return OPERATIONS.indexOf(text) !== -1;
    };

    var clearEntryOnClick = function () {
        document.getElementById('clear-entry').onclick = function () {
            if (isOperation(history[history.length - 1])) {
                equation = equation.slice(0, -1);
                history = history.slice(0, -1);
            } else {
                history = history.slice(0, -1 * removeLeadingZeroes(multipleDigitStr).length);
                multipleDigitStr = "0";
            }
            refreshDisplay(multipleDigitStr);
            clickedOnEquals = false;
        };
    };


    this.init = function () {
        refreshDisplay("0");
        displayEachNumberOnClick();
        displayEachOperationOnClick();
        displayDecimalPointOnClick();
        displayResultOnClick();
        clearAllOnClick();
        clearEntryOnClick();
    };
}
