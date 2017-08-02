'use strict';

var convertNodeListToArray = function (nodeList) {
    return Array.prototype.slice.call(nodeList);
};

function Application() {
    var setDisplayValue = function (value) {
        return function () {
            document.getElementById('display').innerHTML = value;
        }

    };
    this.init = function () {
        var numberElementsArray = convertNodeListToArray(document.getElementsByClassName('number'));

        numberElementsArray.forEach(function (numberElement) {
            numberElement.onclick = setDisplayValue(numberElement.innerHTML);
        });
    };

}