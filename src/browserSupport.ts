"use strict";

import * as css from "./caniuse/css";
import * as query from "./caniuse/query";
import { IBrowser } from "./definitions";

/**
 * Parses an IBrowser from a raw description.
 * 
 * @param rawBrowser   A config browser description, like "Chrome >= 29".
 * @returns An IBrowser summary of the browser name and version.
 */
function parseConfigBrowser(rawBrowser: string): IBrowser {
    const components: string[] = rawBrowser.split(/\s+/);

    if (components.length !== 3) {
        throw new Error("Browsers must be in the format '{browser} >= {version}'.");
    }

    return {
        name: components[0].toLowerCase(),
        version: parseInt(components[2])
    };
}

export const name: string = "browserSupport";
export const nodeTypes: string[] = ["decl"];
export const message: string = "Don't unnecessarily support older browsers.";

export function lint(config: any, node: any) {
    // Get the feature group the CSS property is a member of, if any
    const feature: string = css.feature(node.prop, node.value);
    if (!feature) {
        return;
    }

    // Any browser that requires this prop+value should speak up
    let requiredByBrowser: boolean = false;

    for (const rawBrowser of config.browsers) {
        const browser: IBrowser = parseConfigBrowser(rawBrowser);
        const supportLevel: string = query.query(feature, browser);

        if (supportLevel !== "y") {
            requiredByBrowser = true;
            break;
        }
    }

    // Not having any requiring browsers indicates this is an unnecessary rule
    if (!requiredByBrowser) {
        return [{
            column: node.source.start.column,
            line: node.source.start.line,
            message: this.message
        }];
    }

    return undefined;
};
