import Ref from './Ref';

/**
 * Reference to the container's service
 */
export default class ServiceRef extends Ref {
    /**
     * @type {array<Call>}
     */
    calls = [];

    /**
     * @param {string} name
     */
    constructor(name) {
        super(name, a => a.get(name))
    }

    /**
     * Add a call to the service.
     * This call will be called on instantiation of the service
     *
     * @param {Call} call
     * @return {ServiceRef}
     */
    addCall(call) {
        this.calls.push(call);
        return this;
    }

    /**
     * @param {DiBuilder} container
     * @return {Object}
     */
    doResolve(container) {
        const resolved = super.doResolve(container);
        this.calls.map(a => a.resolve(container)).forEach(call => {
            call(resolved);
        });

        return resolved;
    }
}
