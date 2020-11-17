/**
 * Checks if the value on the path exists. If doesn't exist - create it
 *
 * @param object {object|array}
 * @param path {string|array} - selector
 * @param value {*} - value
 *
 * @returns void
 */
const ensure = (object, path, value) => {
    path = Array.isArray(path) ? path : path.split('.');

    if (path.length === 1) {
        object[path[0]] = object[path[0]] || value;
        return;
    }

    if (object[path[0]] === undefined) {
        object[path[0]] = {};
    }

    ensure(object[path[0]], path.slice(1), value);
};

export default ensure;
