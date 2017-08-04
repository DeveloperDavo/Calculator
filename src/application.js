'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

var spliceAroundIndex = function (array, index) {
    array.splice(index + 1, 1);
    array.splice(index - 1, 1);
};

function Application() {
    var multipleDigitStr = "0";
    var equation = [];
    var clickedOnEquals = false;

    var refreshMainDisplay = function (displayInnerHtml) {
        document.getElementById('display').innerHTML = displayInnerHtml;
    };

    var clearAll = function () {
        equation = [];
        clickedOnEquals = false;
        multipleDigitStr = "0";
    };

    var throwAndDisplayError = function () {
        var temp = equation;
        clearAll();
        refreshMainDisplay("Error");
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
            refreshMainDisplay(Number(multipleDigitStr).toString());
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayOperation = function (operation) {
        return function () {
            if (multipleDigitStr.length !== 0) {
                // only push to equation if there is a digit string to push.
                equation.push(multipleDigitStr);

                multipleDigitStr = "0";

            }
            equation.push(operation);
            refreshMainDisplay(operation);
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
                multipleDigitStr = "0.";
                clickedOnEquals = false;
            } else {
                // Append to existing digit string
                multipleDigitStr += ".";
            }
            refreshMainDisplay(multipleDigitStr);
        };

    };

    var displayResultOnClick = function () {
        var equalsElement = document.getElementById('equals');
        equalsElement.onclick = function () {
            equation.push(multipleDigitStr);

            multipleDigitStr = calculateResultFromEquation().toString();

            refreshMainDisplay(Number(multipleDigitStr).toString());

            clickedOnEquals = true;
            equation = [];
        };
    };


    this.init = function () {
        refreshMainDisplay("0");
        displayEachNumberOnClick();
        displayEachOperationOnClick();
        displayDecimalPointOnClick();
        displayResultOnClick();
    };
}
