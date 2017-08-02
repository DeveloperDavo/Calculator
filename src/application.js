'use strict';

function Application() {
    this.init = function () {
        var numberElements = document.getElementsByClassName('number');
        for (var i = 0; i < numberElements.length; i++) {
            var numberElement = numberElements[i];
            var value = numberElement.innerHTML;
            numberElement.onclick = (function (value) {
                return function () {
                    document.getElementById('display').innerHTML = value;
                }
            })(value);
        }
    };

}