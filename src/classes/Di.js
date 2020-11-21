import { reduce } from '../utils';

/**
 * @param {DiBuilder} builder
 *
 * @returns {{get:function(string):*, has:function(string):boolean}}
 */
const Di = builder => {
    const publicDefinitions = reduce(builder.definitions, (r, k, definition) => definition.isPublic ? [
        ...r,
        k
    ] : r, []);

    return {
        get: key => {
            if (publicDefinitions.includes[key]) {
                throw 'Service ' + key + ' is not found';
            }

            return builder.get(key);
        },
        has: key => publicDefinitions.includes[key]
    };
}

export default Di;
