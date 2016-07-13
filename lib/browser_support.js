'use strict';

var caniuse = require('caniuse-db');
var caniuseCss = require('./caniuse-css');

function parseConfigBrowser(rawBrowser) {
    console.log("rawBrowser", rawBrowser);
    var components = rawBrowser.split(/\s+/);

    if (components.length !== 3) {
        throw new Error('Browsers must be in the format "{browser} >= {version}".');
    }

    return {
        name: components[0].toLowerCase(),
        version: components[2]
    }
}

module.exports = {
    name: 'browserSupport',
    nodeTypes: ['decl'],
    message: "Don't unnecessarily support older browsers.",

    lint: function browserSupportLinter (config, node) {
        var feature = caniuseCss.feature(node.prop, node.value);
        if (!feature) {
            return;
        }

        var errors = [];

        config.browsers
            .map(parseConfigBrowser)
            .forEach(function (browser) {
                var result = caniuse.query(feature, browser);
                console.log('giving', feature, browser, "gives", result);
            });
    }
};
