import Ref from './Ref';

/**
 * Reference to all services tagged with the tag
 */
export default class TaggedRef extends Ref {
    /**
     * @param {string} name
     */
    constructor(name) {
        super(name, a => a.getTagged(name))
    }
}
