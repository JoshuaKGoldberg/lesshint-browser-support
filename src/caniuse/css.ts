"use strict";

/**
 * Mapping of known CSS props to known caniuse feature name.
 */
interface IPropFeatures {
    [i: string]: string;
}

/**
 * Mapping of known CSS props and values to their caniuse feature name.
 */
interface IPropValueFeatures {
    [i: string]: {
        [i: string]: string;
    }
}

/**
 * Known CSS props to known caniuse feature name.
 */
const knownPropFeatures: IPropFeatures = {};

/**
 * Known CSS props and values to their caniuse feature name.
 */
const knownPropValueFeatures: IPropValueFeatures = {
    "display": {
        "flex": "flexbox"
    }
};

/**
 * Determines the non-browser-prefixed version of an attribute.
 * 
 * @param rawProp   A raw property, such as "display" or "-webkit-display".
 * @returns The non-browser-prefixed equivalent, such as "display".
 */
function parseBaseAttribute(rawProp: string): string {
    var split = rawProp.split("-");
    return split[split.length - 1];
}

/**
 * Determines the feature 
 * 
 * @returns The equivalent caniuse feature key, if it exists.
 */
export function feature(rawProp: string, rawValue: string): string {
    var baseProp = parseBaseAttribute(rawProp);
    var baseValue = parseBaseAttribute(rawValue);

    // We don't care about non-prefixed tags
    if (baseProp === rawProp && baseValue === rawValue) {
        return undefined;
    }

    if (knownPropValueFeatures[baseProp] && knownPropValueFeatures[baseProp][baseValue]) {
        return knownPropValueFeatures[baseProp][baseValue];
    }

    if (knownPropFeatures[baseProp] && knownPropFeatures[baseProp]) {
        return knownPropFeatures[baseProp];
    }

    return undefined;
}
