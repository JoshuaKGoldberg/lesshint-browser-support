const Lesshint = require("lesshint");
const { expect } = require("chai");
const path = require("path");

describe("browser-support", () => {
    it("flags a violating prefixed rule", () => {
        // Arrange
        const linter = new Lesshint();
        const browserSupport = require("../lib/browserSupport");
        const config = {
            linters: [browserSupport],
            browserSupport: {
                enabled: true,
                browsers: [
                    "Chrome >= 29"
                ]
            }
        };
        const source = ".fail {\n    -webkit-display: flex;\n}\n";

        linter.configure(config);

        // Act
        const result = linter.checkString(source, "test.less");

        // Assert
        expect(result).to.deep.equal([{
            "column": 5,
            "file": "test.less",
            "fullPath": "test.less",
            "line": 2,
            "linter": "browserSupport",
            "message": "Don't unnecessarily support older browsers.",
            "severity": "warning",
            "source": "    -webkit-display: flex;"
        }]);
    });

    it("ignores an acceptable prefixed rule", () => {
        // Arrange
        const linter = new Lesshint();
        const browserSupport = require("../lib/browserSupport");
        const config = {
            linters: [browserSupport],
            browserSupport: {
                enabled: true,
                browsers: [
                    "Chrome >= 28"
                ]
            }
        };
        const source = ".pass {\n    -webkit-display: flex;\n}\n";

        linter.configure(config);

        // Act
        const result = linter.checkString(source, "test.less");

        // Assert
        expect(result).to.deep.equal([]);
    });

    it("ignores a violating non-prefixed rule", () => {
        // Arrange
        const linter = new Lesshint();
        const browserSupport = require("../lib/browserSupport");
        const config = {
            linters: [browserSupport],
            browserSupport: {
                enabled: true,
                browsers: [
                    "Chrome >= 29"
                ]
            }
        };
        const source = ".pass {\n    display: flex;\n}\n";

        linter.configure(config);

        // Act
        const result = linter.checkString(source, "test.less");

        // Assert
        expect(result).to.deep.equal([]);
    });

    it("ignores an acceptable non-prefixed rule", () => {
        // Arrange
        const linter = new Lesshint();
        const browserSupport = require("../lib/browserSupport");
        const config = {
            linters: [browserSupport],
            browserSupport: {
                enabled: true,
                browsers: [
                    "Chrome >= 28"
                ]
            }
        };
        const source = ".pass {\n    display: flex;\n}\n";

        linter.configure(config);

        // Act
        const result = linter.checkString(source, "test.less");

        // Assert
        expect(result).to.deep.equal([]);
    });

    it("ignores a standard rule", () => {
        // Arrange
        const linter = new Lesshint();
        const browserSupport = require("../lib/browserSupport");
        const config = {
            linters: [browserSupport],
            browserSupport: {
                enabled: true,
                browsers: [
                    "Chrome >= 28"
                ]
            }
        };
        const source = ".pass {\n    color: red;\n}\n";

        linter.configure(config);

        // Act
        const result = linter.checkString(source, "test.less");

        // Assert
        expect(result).to.deep.equal([]);
    });
});
