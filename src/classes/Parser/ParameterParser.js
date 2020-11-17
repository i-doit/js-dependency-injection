import reduce from '../../utils/reduce';
import DiBuilder from '../DiBuilder';
import Parameter from '../Resolveable/Parameter';
import Parser from './Parser';

/**
 * Parse an object with key-value parameters as parameter definitions
 */
export default class ParameterParser extends Parser {
    parse(data) {
        const args = reduce(data, (r, k, value) => ([
            ...r,
            new Parameter(k, value)
        ]), []);

        return new DiBuilder('', ...args);
    }
}
