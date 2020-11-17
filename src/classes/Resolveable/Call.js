import Resolveable from './Resolveable';

/**
 * A method call definition
 */
export default class Call extends Resolveable {
    /**
     * @type {function}
     */
    callback;

    /**
     * @type {array}
     */
    args;

    /**
     * @param {function} callback
     * @param {array} args
     */
    constructor(callback, ...args) {
        super();

        this.callback = callback;
        this.args = args;
    }

    /**
     * Resolve call - build a function to be called
     *
     * @param {DiBuilder} container
     * @return {function(*=): *}
     */
    doResolve(container) {
        const args = this.args.map(a => {
            if (Resolveable.prototype.isPrototypeOf(a)) {
                return a.resolve(container);
            }

            return a;
        });

        return object => this.callback(object, ...args);
    }
}
