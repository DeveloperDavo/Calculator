'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

function Application() {
    var MAX_CHARS_IN_HISTORY = 15;
    var MAX_DIGITS_IN_DISPLAY = 8;

    var DECIMAL_POINT = ".";
    var EQUALS_SYMBOL = "=";
    var EQUALS_REG_EX = /\=/g;

    var PLUS_SYMBOL = "+";
    var MINUS_SYMBOL = "-";
    var DIVIDE_SYMBOL = "/";
    var MULTIPLY_SYMBOL = "*";

    var OPERATIONS = [PLUS_SYMBOL, MINUS_SYMBOL, DIVIDE_SYMBOL, MULTIPLY_SYMBOL];
    var OPERATIONS_REG_EX = /\+|\-|\*|\//g;

    /**
     * All calculations and displaying the history depend on this string.
     * @type {string}
     */
    var history = "0";
    var result = "";

    var isOperation = function (text) {
        return OPERATIONS.indexOf(text) !== -1;
    };

    var doesHistoryContainEquals = function () {
        return history.match(EQUALS_REG_EX);
    };

    var getLastNumberInHistory = function () {
        return history.split(OPERATIONS_REG_EX).pop();
    };

    var doesHistoryOnlyContainOneNumber = function () {
        return history === getLastNumberInHistory();
    };

    var isLastIndexHistoryAnOperation = function () {
        return isOperation(history[history.length - 1]);
    };
    var getHistoryToDisplay = function () {
        if (history.length > MAX_CHARS_IN_HISTORY) {
            return "..." + history.slice(-MAX_CHARS_IN_HISTORY);
        }
        return history;
    };

    var refreshDisplay = function (textToDisplay) {
        document.getElementById('display').innerHTML = textToDisplay;
        document.getElementById('history').innerHTML = getHistoryToDisplay();
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayCurrentNumber = function (digitStr) {
        return function () {

            if (history === "0" || doesHistoryContainEquals()) {
                history = "";
            }

            if (document.getElementById('display').innerHTML.length < MAX_DIGITS_IN_DISPLAY) {
                history += digitStr;
            }

            refreshDisplay(getLastNumberInHistory());
        }
    };

    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var displayOperation = function (operation) {
        return function () {

            if (doesHistoryContainEquals()) {
                history = result;
            } else if (isLastIndexHistoryAnOperation()) {
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
            if (isLastIndexHistoryAnOperation()) {
                history += "0";
            }
            history += DECIMAL_POINT;
            refreshDisplay(getLastNumberInHistory());
        };
    };

    var getResultToDisplay = function () {
        if (result.toString().length < MAX_DIGITS_IN_DISPLAY) {
            return result;
        }

        var resultInExponentialNotation = result.toExponential();
        var splitResult = resultInExponentialNotation.toString().split("e");
        splitResult[0] = Math.round(splitResult[0]);

        return splitResult[0] + "e" + splitResult[1];
    };

    var displayResultOnClick = function () {
        document.getElementById('equals').onclick = function () {

            if (history === "0" || isLastIndexHistoryAnOperation()) {
                return;
            }

            result = new ResultCalculator().calculateResult(history);

            history += EQUALS_SYMBOL;
            history += result;

            refreshDisplay(getResultToDisplay());
        };
    };

    var clearAllOnClick = function () {
        document.getElementById('all-clear').onclick = function () {
            history = "0";
            result = "";
            refreshDisplay("0");
        };
    };

    var clearEntryOnClick = function () {
        document.getElementById('clear-entry').onclick = function () {

            if (isLastIndexHistoryAnOperation()) {
                history = history.substring(0, history.length - 1)
            } else if (doesHistoryOnlyContainOneNumber() || doesHistoryContainEquals()) {
                history = "0";
            } else {
                history = history.replace(getLastNumberInHistory(), "");
            }

            refreshDisplay(getLastNumberInHistory());

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
