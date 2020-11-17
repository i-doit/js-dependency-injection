import Resolveable from '../Resolveable';

/**
 * An abstract reference
 */
export default class Ref extends Resolveable {
    /**
     * @type {string}
     */
    name;
    /**
     * @type {function}
     */
    callback;

    /**
     * Internal constructor to resolve the resolve behaviour
     *
     * @param {string} name
     * @param {function} callback
     */
    constructor(name, callback) {
        super();
        this.name = name;
        this.callback = callback;
    }

    /**
     * @param {DiBuilder} container
     * @return {*}
     */
    doResolve(container) {
        return this.callback(container);
    }
}
