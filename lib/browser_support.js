'use strict';

const caniuse = require('caniuse');

module.exports = {
    name: 'browserSupportRule',
    nodeTypes: ['rule'],
    message: "Don't unnecessarily support older browsers.",

    lint: function browserSupportLinter (config, node) {
        console.log('config', config);
        console.log('node', node);
    }
};
