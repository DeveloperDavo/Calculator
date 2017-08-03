'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

function Application() {
    var currentNumberInput = "";
    var equation = [];
    var clickedOnEquals = false;

    var calculateResultFromEquation = function () {
        var result = Number(equation[0]);
        for (var i = 1; i < equation.length; i += 2) {
            if (equation[i] === "+") {
                result += Number(equation[i + 1]);
            } else {
                result -= Number(equation[i + 1]);
            }
        }
        return result;
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayCurrentNumber = function (number) {
        return function () {
            if (clickedOnEquals) {
                currentNumberInput = number;
                clickedOnEquals = false;
            } else {
                currentNumberInput += number;
            }
            document.getElementById('display').innerHTML = currentNumberInput;
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayOperation = function (operation) {
        return function () {
            equation.push(currentNumberInput);
            equation.push(operation);
            if (currentNumberInput.length !== 0) {
                currentNumberInput = "";
                document.getElementById('display').innerHTML = operation;
            }
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

    this.init = function () {
        document.getElementById('display').innerHTML = "";
        displayEachNumberOnClick();
        displayEachOperationOnClick();
        displayResultOnClick();
    };
}
