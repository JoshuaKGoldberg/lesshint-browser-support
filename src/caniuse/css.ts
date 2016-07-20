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
const knownPropFeatures: IPropFeatures = {
    "align-items": "flexbox",
    "box-sizing": "css3-boxsizing",
    "flex-direction": "flexbox",
    "flex-grow": "flexbox",
    "flex-flow": "flexbox",
    "flex-positive": "flexbox",
    "flex-shrink": "flexbox",
    "flex-wrap": "flexbox",
    "justify-content": "flexbox",
    "touch-action": "css-touch-action",
    "transform": "transforms2d"
};

/**
 * Known CSS props and values to their caniuse feature name.
 */
const knownPropValueFeatures: IPropValueFeatures = {
    "display": {
        "box": "flexbox",
        "flex": "flexbox"
    }
};

/**
 * Known prefixes CSS props or values may start with.
 */
const browserPrefixes = [
    "-ms-",
    "-moz-",
    "-oz-",
    "-webkit-",
];

/**
 * Determines the non-browser-prefixed version of an attribute.
 * 
 * @param rawProp   A raw property, such as "display" or "-webkit-display".
 * @returns The non-browser-prefixed equivalent, such as "display".
 */
function parseBaseAttribute(raw: string): string {
    if (raw[0] !== "-") {
        return raw;
    }

    for (const prefix of browserPrefixes) {
        if (raw.indexOf(prefix) === 0) {
            return raw.slice(prefix.length);
        }
    }

    throw new Error(`Unknown browser prefix on '${raw}`);
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

    if (knownPropFeatures[baseProp]) {
        return knownPropFeatures[baseProp];
    }

    return undefined;
}
