'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

var spliceAroundIndex = function (array, index) {
    array.splice(index + 1, 1);
    array.splice(index - 1, 1);
};

function Application() {
    var currentNumberInput = "";
    var equation = [];
    var clickedOnEquals = false;

    var throwAndDisplayError = function () {
        document.getElementById('display').innerHTML = "Error";
        throw "equation array has been compromised: [" + equation + "]";
    };

    /**
     * eg. Replaces [2, *, 3, +, 4] with [3, +, 4]
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
            document.getElementById('display').innerHTML = currentNumberInput;
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayOperation = function (operation) {
        return function () {
            if (currentNumberInput.length !== 0) {
                // only push to equation if there is number to push.
                equation.push(currentNumberInput);

                currentNumberInput = "";

                // only display operation if there is number beforehand
                document.getElementById('display').innerHTML = operation;
            }
            equation.push(operation);
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

    var displayResultOnClick = function () {
        var equalsElement = document.getElementById('equals');
        equalsElement.onclick = function () {
            equation.push(currentNumberInput);

            currentNumberInput = calculateResultFromEquation().toString();

            document.getElementById('display').innerHTML = currentNumberInput;

            clickedOnEquals = true;
            equation = [];
        };
    };

    var clearEntryOnClick = function () {
        document.getElementById('clear-entry').onclick = function () {
            if (currentNumberInput.length !== 0) {
                // entry is a number, so it has not yet been pushed to the equation array.
                currentNumberInput = "";
            } else {
                // entry is an operation, so remove it from the equation array.
                equation.splice(equation.length - 1);
            }
            document.getElementById('display').innerHTML = "";
        };
    };

    var clearAllOnClick = function () {
        document.getElementById('all-clear').onclick = function () {
            currentNumberInput = "";
            equation = [];
            document.getElementById('display').innerHTML = currentNumberInput;
        };
    };

    this.init = function () {
        document.getElementById('display').innerHTML = "";
        displayEachNumberOnClick();
        displayEachOperationOnClick();
        displayResultOnClick();
        clearEntryOnClick();
        clearAllOnClick();
    };
}
