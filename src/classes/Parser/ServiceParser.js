import reduce from '../../utils/reduce';
import DiBuilder from '../DiBuilder';
import { Call, Definition, ParameterRef, ServiceRef, TaggedRef } from '../Resolveable';
import Parser from './Parser';

export default class ServiceParser extends Parser {
    /**
     * Parse entry as service definitions
     *
     * @param {array<string>} prefix
     * @param {array|Object|{class:string,arguments:array,calls:array,tags:array<string>}} object
     *
     * @return {array<Definition>}
     */
    parseDefinitions(prefix, object) {
        if (Array.isArray(object)) {
            return this.parseDefinitions(prefix, {
                class: object[0],
                arguments: object.slice(1),
            });
        }

        if (object.class) {
            const args = (object.arguments || []).map(a => this.parseArg(a));
            const service = new Definition(prefix.join('.'), object.class, ...args);

            if (object.public) {
                service.setPublic(true);
            }

            if (typeof object.lazy !== 'undefined' && !object.lazy) {
                service.setLazy(false);
            }

            (object.tags || []).forEach(tag => service.addTag(tag));
            (object.calls || []).forEach(call => service.addCall(this.parseCall(call)));

            return [service];
        }

        return reduce(object, (r, k, v) => ([
            ...r,
            ...this.parseDefinitions([...prefix, k], v)
        ]), []);
    }

    /**
     * Parse entry as a call
     *
     * @param {function|array|Call} arg
     * @return {Call}
     */
    parseCall(arg) {
        if (typeof arg === 'function') {
            return new Call(arg);
        }

        if (Array.isArray(arg)) {
            return new Call(arg[0], arg.slice(1).map(a => this.parseArg(a)));
        }

        if (Call.isPrototypeOf(arg)) {
            return arg;
        }

        return null;
    }

    /**
     * Parse entry as an argument
     *
     * @param {string|*} arg
     *
     * @return {ParameterRef|ServiceRef|*}
     */
    parseArg(arg) {
        if (typeof arg === 'string') {
            // if argument is a string that starts with !tagged - parse it as a tagged reference
            if (arg.startsWith('!tagged ')) {
                return new TaggedRef(arg.substring('!tagged '.length));
            }
            // if argument is a string that starts with @ - parse it as a service reference
            if (arg[0] === '@') {
                return new ServiceRef(arg.substring(1));
            }
            // if it starts and ends with % - threat it as a parameter reference
            if (arg[0] === '%' && arg[arg.length - 1] === '%') {
                return new ParameterRef(arg.substring(1, arg.length - 1));
            }
        }
        return arg;
    }


    parse(data) {
        const definitions = this.parseDefinitions([], data);

        return new DiBuilder('', ...definitions);
    }
}
