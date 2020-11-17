/**
 * An abstract class to resolve definition to an actual instance
 */
export default class Resolveable {
    /**
     * Build and receive an actual instance for the definition
     *
     * @param {DiBuilder} container
     * @return {*}
     */
    resolve(container) {
        if (this.resolved) {
            return this.resolved;
        }

        this.resolved = this.doResolve(container);
        return this.resolved;
    }

    /**
     * Internal method to build instance by definition
     *
     * @param {DiBuilder} container
     * @return {*}
     */
    doResolve(container) {
        throw ['Implement do resolve', container];
    }
}
