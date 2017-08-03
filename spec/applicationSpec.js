'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="display">sample html</div>' +
            '<button class="number" id="7">7</button>' +
            '<button class="number" id="9">9</button>' +
            '<button class="number" id="5">5</button>' +
            '<button class="number" id="3">3</button>'
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


});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}