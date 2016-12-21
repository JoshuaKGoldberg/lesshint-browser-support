"use strict";

const data = require("caniuse-db/data.json").data;

import { IBrowser } from "../definitions";

/**
 * Finds the caniuse browser support level for a feature in caniuse.
 * 
 * @param feature   A caniuse feature name, such as "flexbox".
 * @param browser   A browser summary.
 * @returns The browser's caniuse support level.
 */
export function query(feature: string, browser: IBrowser) {
    if (!data[feature]) {
        throw new Error(`Unknown feature: '${feature}'.`);
    }

    const stats = data[feature].stats;
    if (!stats[browser.name]) {
        throw new Error(`Unknown browser: '${browser}'.`);
    }

    const browserStats = stats[browser.name];
    if (!browserStats[browser.version]) {
        throw new Error(`Unknown browser version: '${browser.name}' at '${browser.version}'.`);
    }

    return browserStats[browser.version];
};
