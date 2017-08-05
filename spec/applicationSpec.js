'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="display">sample display</div>' +
            '<div id="history">sample history</div>' +
            '<button id="all-clear">AC</button>' +
            '<button id="clear-entry">CE</button>' +
            '<button class="operation" id="/" value="/">&#247;</button>' +
            '<button class="operation" id="*" value="*">&times;</button>' +
            '<button class="number" id="7">7</button>' +
            '<button class="number" id="8">8</button>' +
            '<button class="number" id="9">9</button>' +
            '<button class="operation" id="-" value="-">&minus;</button>' +
            '<button class="number" id="4">4</button>' +
            '<button class="number" id="5">5</button>' +
            '<button class="number" id="6">6</button>' +
            '<button class="operation" id="+" value="+">+</button>' +
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

    it('should show new history after equals operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('1').click();

        expect(document.getElementById('history').textContent).toEqual('1');
    });


    it('should show 0 in history when operation is clicked before a number', function () {
        application.init();

        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('0-3=-3');

    });

    it('should show history', function () {
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

    it('should show new history after reusing result', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('equals').click();
        document.getElementById('+').click();
        document.getElementById('8').click();

        expect(document.getElementById('history').textContent).toEqual('6+8');
    });

    it('should clear history after clicking clear all', function () {
        application.init();

        document.getElementById('4').click();
        document.getElementById('*').click();
        document.getElementById('6').click();
        document.getElementById('all-clear').click();

        expect(document.getElementById('history').textContent).toBe('0');

        document.getElementById('4').click();
        document.getElementById('-').click();
        document.getElementById('5').click();
        expect(document.getElementById('history').textContent).toBe('4-5');

        document.getElementById('equals').click();
        expect(document.getElementById('history').textContent).toBe('4-5=-1');

    });

    it('should clear operation in history entry when clearing entry', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('history').textContent).toBe('2');

        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('2-3=-1');

    });

    it('should still show history when clearing an operation after equals', function () {
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

        expect(document.getElementById('history').textContent).toBe('-1+2=1');
    });

    it('should clear digits in history entry when clearing entry', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('2').click();
        document.getElementById('0').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('history').textContent).toBe('2+');

        document.getElementById('4').click();
        document.getElementById('0').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toBe('2+40=42');

    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
