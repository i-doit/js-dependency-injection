import { ensure, reduce } from '../utils';
import Di from './Di';
import { Definition, Parameter } from './Resolveable';
import Ref from './Resolveable/Ref/Ref';

/**
 * Dependency injection container builder.
 */
export default class DiBuilder {
    /**
     * @type {Object.<string, Parameter>}
     */
    parameters = {};

    /**
     * @type {Object.<string, Definition>}
     */
    definitions = {};
    /**
     * @type {Object.<string, array<string>>}
     */
    tagged = {};
    /**
     * @type {array<Ref>}
     */
    refs = [];

    /**
     * @param {string} prefix
     * @param {array<Parameter|Definition|Ref>} args
     */
    constructor(prefix = '', ...args) {
        if (prefix.length > 0) {
            args.forEach(a => a.name = prefix + '.' + a.name);
        }

        args.filter(a => Parameter.prototype.isPrototypeOf(a)).forEach(a => this.addParameter(a));
        args.filter(a => Definition.prototype.isPrototypeOf(a)).forEach(a => this.addDefinition(a));
        args.filter(a => Ref.prototype.isPrototypeOf(a)).forEach(a => this.addRef(a));
    }

    /**
     * @param {DiBuilder} container
     */
    merge(container) {
        Object.keys(container.definitions || {}).forEach(key => this.addDefinition(container.definitions[key]));
        Object.keys(container.parameters || {}).forEach(key => this.addParameter(container.parameters[key]));
        (container.refs || []).forEach(ref => this.addRef(ref));
    }

    /**
     * @param {Ref} ref
     */
    addRef(ref) {
        this.refs.push(ref);
    }

    /**
     * @param {Parameter} parameter
     */
    addParameter(parameter) {
        this.parameters[parameter.name] = parameter;
    }

    /**
     * @param {Definition} definition
     */
    addDefinition(definition) {
        this.fillTags(definition);
        this.definitions[definition.name] = definition;
    }

    /**
     * @param {Definition} definition
     */
    fillTags(definition) {
        definition.tags.forEach(tag => {
            if (!this.tagged[tag]) {
                this.tagged[tag] = [];
            }
            this.tagged[tag].push(definition.name);
        });
    }

    /**
     * Get the value of the parameter
     *
     * @param {string} name
     * @return {*}
     */
    getParameter(name) {
        if (!this.parameters[name]) {
            throw ['No ' + name + ' parameter is found in container'];
        }
        return this.parameters[name].resolve(this);
    }

    /**
     * Get the service by id
     * @param {string} name
     * @return {Object}
     */
    get(name) {
        if (!this.definitions[name]) {
            throw ['No ' + name + ' service is found in container'];
        }

        return this.definitions[name].resolve(this);
    }

    /**
     * @param {string} tag
     * @return {array<Object>}
     */
    getTagged(tag) {
        return (this.tagged[tag] || []).map(a => this.get(a));
    }

    /**
     * @returns {{get:function(string):*, has:function(string):boolean}}
     */
    build() {
        this.refs.forEach(a => a.resolve(this));
        Object.values(this.definitions).forEach(a => {
            if (a.isPublic && !a.isLazy) {
                a.resolve(this);
            }
        });

        return Di(this);
    }
}
