'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

var spliceAroundIndex = function (array, index) {
    array.splice(index + 1, 1);
    array.splice(index - 1, 1);
};

function Application() {
    var currentNumberInput = "0";
    var history = "";
    var equation = [];
    var clickedOnEquals = false;

    var refreshDisplay = function () {
        document.getElementById('display').innerHTML = currentNumberInput;
        if (history.length === 0) {
            document.getElementById('history').innerHTML = "0";
        } else {
            document.getElementById('history').innerHTML = history;
        }
    };

    var clearAll = function () {
        equation = [];
        clickedOnEquals = false;
        currentNumberInput = "0";
    };

    var throwAndDisplayError = function () {
        var temp = equation;
        clearAll();
        document.getElementById('display').innerHTML = "Error";
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
    var displayCurrentNumber = function (number) {
        return function () {
            if (clickedOnEquals) {
                // Don't append to existing number as this should be the previous result
                currentNumberInput = number;
                clickedOnEquals = false;
            } else {
                // Append to existing number
                currentNumberInput += number;
            }
            history += number;
            var currentNumberInputWithoutLeadingZeroes = Number(currentNumberInput).toString();
            document.getElementById('display').innerHTML = currentNumberInputWithoutLeadingZeroes;
            document.getElementById('history').innerHTML = history;
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayOperation = function (operation) {
        return function () {
            if (currentNumberInput.length !== 0) {
                // only push to equation if there is number to push.
                equation.push(currentNumberInput);

                currentNumberInput = "0";

            }
            equation.push(operation);
            history += operation;
            document.getElementById('display').innerHTML = operation;
            document.getElementById('history').innerHTML = history;
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
                // Don't append to existing number as this should be the previous result
                currentNumberInput = "0.";
                clickedOnEquals = false;
            } else {
                // Append to existing number
                currentNumberInput += ".";
            }
            history += ".";
            document.getElementById('display').innerHTML = currentNumberInput;
            document.getElementById('history').innerHTML = history;
        };

    };

    var displayResultOnClick = function () {
        var equalsElement = document.getElementById('equals');
        equalsElement.onclick = function () {
            equation.push(currentNumberInput);

            currentNumberInput = calculateResultFromEquation().toString();

            history += "=";
            document.getElementById('display').innerHTML = currentNumberInput;
            document.getElementById('history').innerHTML = history;

            clickedOnEquals = true;
            equation = [];
        };
    };

    // FIXME
    var clearEntryOnClick = function () {
        document.getElementById('clear-entry').onclick = function () {
            currentNumberInput = "0";
            refreshDisplay();
        };
    };

    var clearAllOnClick = function () {
        document.getElementById('all-clear').onclick = function () {
            clearAll();
            refreshDisplay();
        };
    };

    this.init = function () {
        refreshDisplay();
        displayEachNumberOnClick();
        displayEachOperationOnClick();
        displayDecimalPointOnClick();
        displayResultOnClick();
        clearEntryOnClick();
        clearAllOnClick();
    };
}
