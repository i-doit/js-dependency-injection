import DiBuilder from './DiBuilder';
import { Call, Definition, Parameter, ParameterRef, ServiceRef, TaggedRef } from './Resolveable';

/**
 * Helper to create DI components
 *
 * @type {{
 *  p: (function(*=, *=): Parameter),
 *  call: (function(*=, ...[*]): Call),
 *  ref: (function(*=): ServiceRef),
 *  s: (function(*=, *=, ...[*]): Definition),
 *  di: (function(*=, ...[*]): DiBuilder),
 *  tagged: (function(*=): TaggedRef),
 *  pref: (function(*=): ParameterRef)
 * }}
 */
const facade = {
    /**
     * DI Builder
     *
     * @param {string} name
     * @param {array} args
     * @return {DiBuilder}
     */
    di: (name, ...args) => new DiBuilder(name, ...args),
    /**
     * Parameter
     *
     * @param {string} name
     * @param {*} value
     * @return {Parameter}
     */
    p: (name, value) => new Parameter(name, value),
    /**
     * Service definition
     *
     * @param {string} name
     * @param {function} factory
     * @param {array} args
     * @return {Definition}
     */
    s: (name, factory, ...args) => new Definition(name, factory, ...args),
    /**
     * Service reference
     *
     * @param {string} name
     * @return {ServiceRef}
     */
    ref: name => new ServiceRef(name),
    /**
     * Parameter reference
     *
     * @param {string} name
     * @return {ParameterRef}
     */
    pref: name => new ParameterRef(name),
    /**
     * Reference to tagged services
     *
     * @param {string} name
     * @return {TaggedRef}
     */
    tagged: name => new TaggedRef(name),
    /**
     * Call to be called on instantiation of the service
     *
     * @param {function} callback
     * @param {array} args
     * @return {Call}
     */
    call: (callback, ...args) => new Call(callback, ...args),
};

export default facade;
