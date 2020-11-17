/**
 * Reduce of objects
 *
 * @param object {object}
 * @param callback {function}
 * @param start {*}
 *
 * @returns {*}
 */
const reduce = (object, callback, start) => Object.keys(object)
    .reduce((result, key) => callback(result, key, object[key]), start);

export default reduce;
