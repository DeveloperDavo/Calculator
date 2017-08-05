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
    var DECIMAL_POINT = ".";
    var EQUALS_SYMBOL = "=";

    var PLUS_SYMBOL = "+";
    var MINUS_SYMBOL = "-";
    var DIVIDE_SYMBOL = "/";
    var MULTIPLY_SYMBOL = "*";

    var OPERATIONS = [PLUS_SYMBOL, MINUS_SYMBOL, DIVIDE_SYMBOL, MULTIPLY_SYMBOL];

    var history = "";
    var result = "";

    var isOperation = function (text) {
        return OPERATIONS.indexOf(text) !== -1;
    };

    var doesHistoryContainEquals = function () {
        var equalsRegExp = new RegExp(/\=/g);
        return history.match(equalsRegExp);
    };

    var getLastEntityInHistory = function () {
        var operationsRegEx = new RegExp(/\+|\-|\*|\//g);
        return history.split(operationsRegEx).pop();
    };
    var refreshMainDisplay = function (textToDisplay) {
        document.getElementById('display').innerHTML = textToDisplay;
    };

    var refreshHistory = function () {
        var historyInnerHtml = history;
        if (history.length === 0) {
            historyInnerHtml = "0";
        }
        document.getElementById('history').innerHTML = historyInnerHtml;
    };

    var refreshDisplay = function (textToDisplay) {
        refreshMainDisplay(textToDisplay);
        refreshHistory();
    };

// https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayCurrentNumber = function (digitStr) {
        return function () {

            if (doesHistoryContainEquals()) {
                history = "";
            }

            history += digitStr;

            refreshDisplay(getLastEntityInHistory());
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayOperation = function (operation) {
        return function () {
            if (doesHistoryContainEquals()) {
                history = result;
            }

            if (isOperation(history[history.length - 1])) {
                history = history.substring(0, history.length - 1);
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

    var displayDecimalPointOnClick = function () {
        document.getElementById('decimal-point').onclick = function () {
            if (doesHistoryContainEquals() || history.length === 0) {
                history = "0";
            }
            history += DECIMAL_POINT;
            refreshDisplay(getLastEntityInHistory());
        };

    };

    var displayResultOnClick = function () {
        var equalsElement = document.getElementById('equals');
        equalsElement.onclick = function () {

            if (isOperation(history[history.length - 1])) {
                return;
            }

            result = new ResultCalculator().calculateResult(history);

            history += EQUALS_SYMBOL;
            history += result;

            refreshDisplay(result);
        };
    };

    this.init = function () {
        refreshDisplay("0");
        displayEachNumberOnClick();
        displayEachOperationOnClick();
        displayDecimalPointOnClick();
        displayResultOnClick();
    };
}
