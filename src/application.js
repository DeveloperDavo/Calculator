'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

function Application() {
    var currentNumberInput = "";

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var setDisplayValue = function (value) {
        return function () {
            currentNumberInput += value;
            document.getElementById('display').innerHTML = currentNumberInput;
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var setOperationDisplayValue = function (value) {
        return function () {
            document.getElementById('display').innerHTML = value;
        }
    };

    var setDisplayValueOnClick = function (numberElement) {
        numberElement.onclick = setDisplayValue(numberElement.innerHTML);
    };

    var setDisplayOperationOnClick = function (numberElement) {
        numberElement.onclick = setOperationDisplayValue(numberElement.innerHTML);
    };

    var displayEachNumberOnClick = function () {
        var numberElementsArray = convertNodeListToArray(document.getElementsByClassName('number'));
        numberElementsArray.forEach(setDisplayValueOnClick);
    };

    var displayEachOperationOnClick = function () {
        var operationElementsArray = convertNodeListToArray(document.getElementsByClassName('operation'));
        operationElementsArray.forEach(setDisplayOperationOnClick);
    };

    this.init = function () {
        displayEachNumberOnClick();
        displayEachOperationOnClick();
    };
}
