import Resolveable from './Resolveable';

/**
 * Definition of the parameter
 */
export default class Parameter extends Resolveable {
    /**
     * @type {string}
     */
    name;
    /**
     * @type {*}
     */
    value;

    /**
     * @param {string} name
     * @param {*} value
     */
    constructor(name, value) {
        super();
        this.name = name;
        this.value = value;
    }

    /**
     * @return {*}
     */
    doResolve() {
        return this.value;
    }
}
