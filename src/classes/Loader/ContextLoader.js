import DiBuilder from '../DiBuilder';
import Loader from './Loader';

/**
 * Load container from files found by require context
 */
export default class ContextLoader extends Loader {
    /**
     * @type {RequireContext}
     */
    context;
    /**
     * @type {Parser}
     */
    parser;

    /**
     * @param {RequireContext} context
     * @param {Parser} parser
     */
    constructor(context, parser) {
        super();
        this.context = context;
        this.parser = parser;
    }

    /**
     * @returns {DiBuilder}
     */
    load() {
        const di = new DiBuilder();

        this.context.keys().forEach(item => {
            const exposed = this.context(item);
            const parsed = this.parser.parse(exposed.default);
            if (DiBuilder.prototype.isPrototypeOf(parsed)) {
                di.merge(parsed);
            }
        });

        return di;
    }
}
