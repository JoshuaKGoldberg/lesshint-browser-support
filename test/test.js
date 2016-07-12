const Lesshint = require('lesshint');
const { expect } = require('chai');
const path = require('path');

describe('browser-support', () => {
    it('fails on a violating rule', () => {
        // Arrange
        const linter = new Lesshint();
        const browserSupport = require('../lib/browser_support');
        const config = {
            linters: [browserSupport],
            browserSupport: [
                'Chrome >= 49'
            ]
        };
        const source = '.fail {\n -webkit-display: flex;\n}\n';

        linter.configure(config);

        // Act
        const result = linter.checkString(source, 'test.less');

        // Assert
        expect(result).to.deep.equal([]);
    });
});
