    it('should display new number after equals operation', function () {
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

    it('should clear display after clicking clear all', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('3').click();
        document.getElementById('all-clear').click();

        expect(document.getElementById('display').textContent).toBe('0');

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('3').click();

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

    it('should clear operation in display when clearing entry', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('/').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('display').textContent).toBe('0');

        document.getElementById('-').click();
        document.getElementById('3').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('-1');

    });

    it('should clear digits in display entry when clearing entry', function () {
        application.init();

        document.getElementById('2').click();
        document.getElementById('+').click();
        document.getElementById('2').click();
        document.getElementById('0').click();
        document.getElementById('clear-entry').click();

        expect(document.getElementById('display').textContent).toBe('0');

        document.getElementById('4').click();
        document.getElementById('0').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('42');
    });

    it('should still calculate result after clearing entry first', function () {
        application.init();

        document.getElementById('clear-entry').click();
        document.getElementById('+').click();
        document.getElementById('7').click();
        document.getElementById('equals').click();

        expect(document.getElementById('display').textContent).toBe('7');

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

