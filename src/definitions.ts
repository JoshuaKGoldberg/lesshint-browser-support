/**
 * Configuration summary of a browser.
 */
export interface IBrowser {
    /**
     * Caniuse browser name, such as "Chrome" or "ie".
     */
    name: string;

    /**
     * Integer version of the browser.
     */
    version: number;
}
