import DiBuilder from '../DiBuilder';

export default class Parser {
    /**
     * @param {*} data
     * @returns {DiBuilder}
     */
    parse(data) {
        if (DiBuilder.prototype.isPrototypeOf(data)) {
            return data;
        }

        return null;
    }
}
