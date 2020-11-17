import Resolveable from './Resolveable';

/**
 * Service definition
 */
export default class Definition extends Resolveable {
    /**
     * @type {boolean}
     */
    isPublic = false;

    /**
     * @type {string}
     */
    name;

    /**
     * @type {function}
     */
    factory;

    /**
     * @type {array}
     */
    args;

    /**
     * @type {array<string>}
     */
    tags = [];

    /**
     * @type {array<Call>}
     */
    calls = [];

    /**
     * @param {string} name
     * @param {function} factory
     * @param {array} args
     */
    constructor(name, factory, ...args) {
        super();
        this.name = name === null ? ('' + Math.random()) : name;
        this.factory = factory;
        this.args = args;
    }

    /**
     * @param {boolean} value
     * @return {Definition}
     */
    setPublic(value) {
        this.isPublic = value;

        return this;
    }

    /**
     * @param {string} tag
     * @return {Definition}
     */
    addTag(tag) {
        this.tags.push(tag);
        return this;
    }

    /**
     * @param {Call} call
     * @return {Definition}
     */
    addCall(call) {
        this.calls.push(call);
        return this;
    }

    /**
     * Resolve all the dependencies and build a service
     *
     * @param {DiBuilder} container
     * @return {Object}
     */
    doResolve(container) {
        this.resolved = new Proxy({}, {
            has: (_, prop) => container.get(this.name).hasOwnProperty(prop),
            get: (_, prop) => container.get(this.name)[prop],
            set: (_, prop, v) => container.get(this.name)[prop] = v,
            apply: (_, prop, argArray) => container.get(this.name)[prop](...argArray),
            enumerate: () => {
                const service = container.get(this.name);
                const keys = [];
                for (let key in service) {
                    // noinspection JSUnfilteredForInLoop
                    keys.push(key);
                }

                return keys;
            },
            ownKeys: () => {
                const service = container.get(this.name);
                const keys = [];
                for (let i in service) {
                    if (!service.hasOwnProperty(i)) {
                        continue;
                    }
                    keys.push(i);
                }

                return keys;
            },
        });

        const args = this.args.map(arg => {
            if (Resolveable.prototype.isPrototypeOf(arg)) {
                return arg.resolve(container);
            }

            return arg;
        });

        let object = null;
        if (this.factory.prototype) {
            object = new (this.factory)(...args);
        } else {
            object = this.factory(...args);
        }

        this.calls.forEach(call => {
            const callback = call.resolve(container);
            callback(object);
        });

        return object;
    }
}
