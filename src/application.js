'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

function Application() {
    var currentNumberInput = "";
    var equation = [];

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var setDisplayNumber = function (number) {
        return function () {
            currentNumberInput += number;
            document.getElementById('display').innerHTML = currentNumberInput;
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var setDisplayOperation = function (operation) {
        return function () {
            equation.push(currentNumberInput);
            equation.push(operation);
            currentNumberInput = "";
            document.getElementById('display').innerHTML = operation;
        }
    };

    var setDisplayNumberOnClick = function (numberElement) {
        numberElement.onclick = setDisplayNumber(numberElement.innerHTML);
    };

    var setDisplayOperationOnClick = function (numberElement) {
        numberElement.onclick = setDisplayOperation(numberElement.innerHTML);
    };

    var displayEachNumberOnClick = function () {
        var numberElementsArray = convertNodeListToArray(document.getElementsByClassName('number'));
        numberElementsArray.forEach(setDisplayNumberOnClick);
    };

    var displayEachOperationOnClick = function () {
        var operationElementsArray = convertNodeListToArray(document.getElementsByClassName('operation'));
        operationElementsArray.forEach(setDisplayOperationOnClick);
    };

    var displayResultOnClick = function () {
        var equalsElement = document.getElementById('equals');
        equalsElement.onclick = function () {
            equation.push(currentNumberInput);
            currentNumberInput = "";
            var result = 0;
            for (var i = 0; i < equation.length; i = i + 2) {
                result += Number(equation[i]);
            }
            equation = [];
            document.getElementById('display').innerHTML = result.toString();
        };
    };

    this.init = function () {
        displayEachNumberOnClick();
        displayEachOperationOnClick();
        displayResultOnClick();
    };
}
