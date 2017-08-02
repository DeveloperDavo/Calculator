'use strict';

function Application() {
    this.init = function () {
        var numberElements = document.getElementsByClassName('number');
        Array.prototype.slice.call(numberElements).forEach(function (numberElement) {
            numberElement.onclick = (function (value) {
                return function () {
                    document.getElementById('display').innerHTML = value;
                }
            })(numberElement.innerHTML);
        });
    };

}