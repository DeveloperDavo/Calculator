'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="display">sample html</div>' +
            '<button class="number" id="7">7</button>' +
            '<button class="number" id="8">8</button>' +
            '<button class="number" id="9">9</button>' +
            '<button class="number" id="4">4</button>' +
            '<button class="number" id="5">5</button>' +
            '<button class="number" id="6">6</button>' +
            '<button class="operation" id="+">+</button>' +
            '<button class="number" id="1">1</button>' +
            '<button class="number" id="2">2</button>' +
            '<button class="number" id="3">3</button>' +
            '<button class="number" id="0">0</button>' +
            '<button class="operation" id="equals">=</button>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });

    it('should display value of button 3', function () {
        application.init();

        document.getElementById('3').click();
        expect(document.getElementById('display').textContent).toEqual('3');
    });

    it('should display value of button 9', function () {
        application.init();

        document.getElementById('9').click();
        expect(document.getElementById('display').textContent).toEqual('9');
    });

    it('should display value of two consecutive numbers', function () {
        application.init();

        document.getElementById('7').click();
        document.getElementById('5').click();

        expect(document.getElementById('display').textContent).toEqual('75');
    });

    it('should display + operation', function () {
        application.init();

        document.getElementById('8').click();
        document.getElementById('+').click();

        expect(document.getElementById('display').textContent).toEqual('+');
    });

    it('should display current number after addition operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();

        expect(document.getElementById('display').textContent).toEqual('4');
    });

    it('should display result of adding two numbers', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('0').click();
        document.getElementById('+').click();
        document.getElementById('1').click();
        document.getElementById('0').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('30');
    });

    it('should display result of adding three or more numbers', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('0').click();
        document.getElementById('+').click();
        document.getElementById('1').click();
        document.getElementById('0').click();
        document.getElementById('+').click();
        document.getElementById('6').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('36');
    });

    it('should display number after equals operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('1').click();

        expect(document.getElementById('display').textContent).toEqual('1');
    });

    it('should perform more than one operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('1').click();
        document.getElementById('+').click();
        document.getElementById('1').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('2');
    });

    it('should perform addition on existing result', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('+').click();
        document.getElementById('1').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('7');
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
