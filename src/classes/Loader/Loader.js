/**
 * An abstract loader
 */
export default class Loader {
    /**
     * @returns {DiBuilder}
     */
    load() {
        throw ['Load the container builder'];
    }
}
