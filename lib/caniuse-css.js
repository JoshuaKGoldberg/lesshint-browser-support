'use strict';

/**
 * Returns the non-browser-prefixed version of an attribute.
 * 
 * @param rawProp   A raw property, such as "display" or "-webkit-display".
 * @returns The non-browser-prefixed equivalent, such as "display".
 */
function parseBaseAttribute(rawProp) {
    console.log("rawProp", rawProp);
    var split = rawProp.split('-');
    return split[split.length - 1];
}

var knownFeatures = {
    'display': {
        'flex': 'flexbox'
    }
};

/**
 * 
 * 
 * @returns The equivalent caniuse feature key, if it exists.
 */
module.exports = {
    feature: function (rawProp, rawValue) {
        var baseProp = parseBaseAttribute(rawProp);
        var baseValue = parseBaseAttribute(rawValue);

        console.log('oh', baseProp, baseValue, knownFeatures[baseProp] && knownFeatures[baseProp][baseValue]);
        return knownFeatures[baseProp] && knownFeatures[baseProp][baseValue];
    }
}
