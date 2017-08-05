'use strict';

var removeLeadingZeroes = function (multipleDigitStr) {
    return Number(multipleDigitStr).toString();
};

var removeLastEntryIn = function (array) {
    return array.slice(0, -1);
};

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

var spliceAroundIndex = function (array, index) {
    array.splice(index + 1, 1);
    array.splice(index - 1, 1);
};

function Application() {
    var EQUALS_SYMBOL = "=";

    var history = "";

    var refreshMainDisplay = function (textToDisplay) {
        document.getElementById('display').innerHTML = textToDisplay;
    };

    var refreshHistory = function () {
        document.getElementById('history').innerHTML = history;
    };

    var refreshDisplay = function (textToDisplay) {
        refreshMainDisplay(textToDisplay);
        refreshHistory();
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayCurrentNumber = function (digitStr) {
        return function () {
            history += digitStr;

            var operationsRegEx = new RegExp(/\+|\-|\*|\//g);

            refreshDisplay(history.split(operationsRegEx).pop());
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayOperation = function (operation) {
        return function () {
            // set history to 0 if it is empty
            if (history.length === 0) {
                history = "0";
            }

            history += operation;
            refreshDisplay(operation);
        }
    };

    var displayCurrentNumberOnClick = function (numberElement) {
        numberElement.onclick = displayCurrentNumber(numberElement.innerHTML);
    };

    var displayCurrentOperationOnClick = function (numberElement) {
        numberElement.onclick = displayOperation(numberElement.value);
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

            var result = new ResultCalculator().calculateResult(history);
            
            history += EQUALS_SYMBOL;
            history += result;

            refreshDisplay("");

        };
    };
    this.init = function () {

        refreshDisplay("0");
        displayEachNumberOnClick();
        displayEachOperationOnClick();
        displayResultOnClick();
    };
}
