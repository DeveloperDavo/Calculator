'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

function Application() {
    // https://stackoverflow.com/questions/15860683/onclick-event-in-a-for-loop
    var setDisplayValue = function (value) {
        return function () {
            document.getElementById('display').innerHTML = value;
        }
    };

    var setDisplayValueOnClick = function (numberElement) {
        numberElement.onclick = setDisplayValue(numberElement.innerHTML);
    };

    var displayEachNumberOnClick = function () {
        var numberElementsArray = convertNodeListToArray(document.getElementsByClassName('number'));
        numberElementsArray.forEach(setDisplayValueOnClick);
    };
    this.init = function () {
        displayEachNumberOnClick();
    };

}