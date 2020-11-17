import Ref from './Ref';

/**
 * Reference to the container parameter
 */
export default class ParameterRef extends Ref {
    /**
     * @param {string} name
     */
    constructor(name) {
        super(name, a => a.getParameter(name))
    }
}
