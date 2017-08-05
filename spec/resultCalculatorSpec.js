'use strict';

describe("resultCalculator", function () {
    var resultCalculator;

    beforeEach(function () {
        resultCalculator = new ResultCalculator(document);
    });

    it('should add two numbers', function () {
        expect(resultCalculator.calculateResult("20+10=")).toEqual('30');
    });

    it('should display result of subtracting one number from another', function () {
        expect(resultCalculator.calculateResult("20-10=")).toEqual('10');
    });


});
