'use strict';

describe("resultCalculator", function () {
    var resultCalculator;

    beforeEach(function () {
        resultCalculator = new ResultCalculator(document);
    });

    it('should add two numbers', function () {
        expect(resultCalculator.calculateResult("20+10=")).toEqual(30);
    });

    it('should subtract one number from another', function () {
        expect(resultCalculator.calculateResult("20-10=")).toEqual(10);
    });

    it('should multiply two numbers', function () {
        expect(resultCalculator.calculateResult("2*3=")).toEqual(6);
    });

    it('should divide one into another', function () {
        expect(resultCalculator.calculateResult("6/3=")).toEqual(2);
    });

    it('should handle decimals', function () {
        expect(resultCalculator.calculateResult("2.1-0.2")).toEqual(1.9);
        expect(resultCalculator.calculateResult("2/3")).toEqual(0.667);
    });

});
