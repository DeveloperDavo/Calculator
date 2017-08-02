'use strict';

describe("application", function () {
    var container, application;

    beforeEach(function () {
        container = fixture(
            '<div id="display">sample html</div>'
        );
        document.body.appendChild(container);
    });

    afterEach(function () {
        document.body.removeChild(container);
    });

    it('should display sample html', function () {
        expect(document.getElementById('display').textContent).toEqual('sample html');
    });

});

function fixture(html) {
    var div = window.document.createElement('div');
    div.innerHTML = html;
    return div;
}