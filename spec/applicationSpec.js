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


    it('should show 4 in history', function () {
        application.init();

        document.getElementById('4').click();

        expect(document.getElementById('history').textContent).toEqual('4');
    });

    it('should show 6 in history', function () {
        application.init();

        document.getElementById('6').click();

        expect(document.getElementById('history').textContent).toEqual('6');
    });

    it('should show multiple digits in history', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('0').click();

        expect(document.getElementById('history').textContent).toEqual('20');

    });

    it('should show 3 in display', function () {
        application.init();

        document.getElementById('3').click();

        expect(document.getElementById('display').textContent).toEqual('3');
    });

    it('should show 9 in display', function () {
        application.init();

        document.getElementById('9').click();

        expect(document.getElementById('display').textContent).toEqual('9');
    });

    it('should show multiple digits in display', function () {
        application.init();

        document.getElementById('7').click();
        document.getElementById('5').click();

        expect(document.getElementById('display').textContent).toEqual('75');

    });

    it('should show operation in history', function () {
        application.init();

        document.getElementById('8').click();
        document.getElementById('+').click();

        expect(document.getElementById('history').textContent).toEqual('8+');
    });


    it('should show operation in display', function () {
        application.init();

        document.getElementById('8').click();
        document.getElementById('+').click();

        expect(document.getElementById('display').textContent).toEqual('+');
    });

    it('should show multiple digits in display after operation', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('0').click();

        expect(document.getElementById('display').textContent).toEqual('40');
    });

    it('should show result in history', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('0').click();
        document.getElementById('equals').click();

        expect(document.getElementById('history').textContent).toEqual('2+40=42');
    });

    it('should show result in display', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('4').click();
        document.getElementById('0').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toEqual('42');
    });


    it('should replace existing operation with new one in history', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('-').click();

        expect(document.getElementById('history').textContent).toEqual('2-');

    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}
