'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="display">sample html</div>' +
            '<button class="number" id="3" value="3">3</button>' +
            '<button class="number" id="9" value="9">9</button>'
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

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}