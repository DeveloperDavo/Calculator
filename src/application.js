'use strict';

var convertNodeListToArray = function (nodeListElements) {
    return Array.prototype.slice.call(nodeListElements);
};

function Application() {
    this.init = function () {
        var numberElementsArray = convertNodeListToArray(document.getElementsByClassName('number'));

        numberElementsArray.forEach(function (numberElement) {
            numberElement.onclick = (function (value) {
                return function () {
                    document.getElementById('display').innerHTML = value;
                }
            })(numberElement.innerHTML);
        });
    };

}