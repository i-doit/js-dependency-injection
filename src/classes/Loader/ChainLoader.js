import DiBuilder from '../DiBuilder';
import Loader from './Loader';

/**
 * Load di containers from other loaders
 */
export default class ChainLoader extends Loader {
    /**
     * @type {array<Loader>}
     */
    loaders;

    /**
     * @param {array<Loader>} loaders
     */
    constructor(loaders) {
        super();
        this.loaders = loaders;
    }

    /**
     * Load the container builder
     *
     * @returns {DiBuilder}
     */
    load() {
        const di = new DiBuilder();

        this.loaders.forEach(loader => {
            di.merge(loader.load());
        });

        return di;
    }
}
