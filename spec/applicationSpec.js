'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="display">sample display</div>' +
            '<div id="history">sample history</div>' +
            '<button id="all-clear">AC</button>' +
            '<button id="clear-entry">CE</button>' +
            '<button class="operation" id="/">/</button>' +
            '<button class="operation" id="*">*</button>' +
            '<button class="number" id="7">7</button>' +
            '<button class="number" id="8">8</button>' +
            '<button class="number" id="9">9</button>' +
            '<button class="operation" id="-">-</button>' +
            '<button class="number" id="4">4</button>' +
            '<button class="number" id="5">5</button>' +
            '<button class="number" id="6">6</button>' +
            '<button class="operation" id="+">+</button>' +
            '<button class="number" id="1">1</button>' +
            '<button class="number" id="2">2</button>' +
            '<button class="number" id="3">3</button>' +
            '<button class="number" id="0">0</button>' +
            '<button id="decimal-point">.</button>' +
            '<button id="equals">=</button>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });

    it('should display value of 0 upon initialisation', function () {
        application.init();

        expect(document.getElementById('display').textContent).toEqual('0');
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

    it('should display result of subtracting one number from another', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('0').click();
        document.getElementById('-').click();
        document.getElementById('1').click();
        document.getElementById('0').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('10');
    });

    it('should display result of multiplying two numbers', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('*').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('6');
    });

    it('should display result of dividing one number by another', function () {
        application.init();

        document.getElementById('6').click();
        document.getElementById('/').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('2');
    });
    it('should display result of multiple chained operations', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('0').click();
        document.getElementById('-').click();
        document.getElementById('1').click();
        document.getElementById('0').click();
        document.getElementById('+').click();
        document.getElementById('6').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('16');
    });

    it('should display new number after equals operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('1').click();

        expect(document.getElementById('display').textContent).toEqual('1');
    });

    it('should display new history after equals operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('1').click();

        expect(document.getElementById('history').textContent).toEqual('1');
    });

    it('should perform more than one operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('6');

        document.getElementById('1').click();
        document.getElementById('-').click();
        document.getElementById('1').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('0');
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

    it('should display operator upon first click', function () {
        application.init();

        document.getElementById('+').click();
        expect(document.getElementById('display').textContent).toEqual('+');

        document.getElementById('-').click();
        expect(document.getElementById('display').textContent).toEqual('-');

        document.getElementById('*').click();
        expect(document.getElementById('display').textContent).toEqual('*');

        document.getElementById('/').click();
        expect(document.getElementById('display').textContent).toEqual('/');
    });

    it('should display decimal number', function () {
        application.init();

        document.getElementById('decimal-point').click();
        document.getElementById('3').click();
        expect(document.getElementById('display').textContent).toEqual('0.3');

        document.getElementById('-').click();
        document.getElementById('2').click();
        document.getElementById('decimal-point').click();
        expect(document.getElementById('display').textContent).toEqual('2.');

        document.getElementById('1').click();
        expect(document.getElementById('display').textContent).toEqual('2.1');

        document.getElementById('equals').click();
        expect(document.getElementById('display').textContent).toEqual('-1.8');

    });

    it('should show result with decimal when dividing', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBeCloseTo('0.67', 2);
    });

    it('should not display 0 as the first digit of a whole number', function () {
        application.init();

        document.getElementById('0').click();
        document.getElementById('2').click();

        expect(document.getElementById('display').textContent).toBe('2');
    });

    it('should calculate result when operation is clicked before a number', function () {
        application.init();

        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('-3');

    });

    it('should display history', function () {
        application.init();

        expect(document.getElementById('history').textContent).toBe('0');

        document.getElementById('5').click();
        expect(document.getElementById('history').textContent).toBe('5');

        document.getElementById('-').click();
        expect(document.getElementById('history').textContent).toBe('5-');

        document.getElementById('3').click();
        expect(document.getElementById('history').textContent).toBe('5-3');

        document.getElementById('/').click();
        expect(document.getElementById('history').textContent).toBe('5-3/');

        document.getElementById('1').click();
        expect(document.getElementById('history').textContent).toBe('5-3/1');

        document.getElementById('equals').click();
        expect(document.getElementById('history').textContent).toBe('5-3/1=2');

    });

    it('should display new history after reusing result', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('+').click();
        document.getElementById('8').click();

        expect(document.getElementById('history').textContent).toEqual('6+8');
    });

    it('should clear all', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('3').click();
        document.getElementById('all-clear').click();

        expect(document.getElementById('display').textContent).toBe('0');
        expect(document.getElementById('history').textContent).toBe('0');

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('3').click();
        expect(document.getElementById('history').textContent).toBe('2/3');

        document.getElementById('equals').click();
        expect(document.getElementById('display').textContent).toBeCloseTo('0.67', 2);
    });

    it('should still calculate result after clearing all first', function () {
        application.init();

        document.getElementById('all-clear').click();
        document.getElementById('+').click();
        document.getElementById('7').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('7');

    });

    it('should clear operation entry', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('display').textContent).toBe('0');
        expect(document.getElementById('history').textContent).toBe('2');

    });

    it('should still calculate result after clearing operation entry', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('clear-entry').click();
        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('-1');
        expect(document.getElementById('history').textContent).toBe('2-3=-1');

    });

    it('should still display result and history after clearing operation entry after equals', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();
        document.getElementById('-').click();
        document.getElementById('clear-entry').click();
        document.getElementById('+').click();
        document.getElementById('2').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('1');
        expect(document.getElementById('history').textContent).toBe('-1+2=1');

    });

    it('should clear number entry', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('3').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('display').textContent).toBe('0');
        expect(document.getElementById('history').textContent).toBe('2/');

        document.getElementById('4').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('0.5');
        expect(document.getElementById('history').textContent).toBe('2/4=0.5');

    });

    it('should clear multi digit entry', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('2').click();
        document.getElementById('0').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('display').textContent).toBe('0');
        expect(document.getElementById('history').textContent).toBe('2+');

        document.getElementById('4').click();
        document.getElementById('0').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('42');
        expect(document.getElementById('history').textContent).toBe('2+40=42');

    });

    it('should still calculate result after clearing entry first', function () {
        application.init();

        document.getElementById('clear-entry').click();
        document.getElementById('+').click();
        document.getElementById('7').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('7');

    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
