'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="display">sample html</div>' +
            '<button id="3"></button>'
        );
        document.body.appendChild(container);
        application = new Application(document);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });

    it('should display value of button', function () {
        application.init();

        document.getElementById('3').click();
        expect(document.getElementById('display').textContent).toEqual('3');
    });


});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}