import ServiceRef from './ServiceRef';

describe('ServiceRef', () => {
    it('should find service from container by name', () => {
        const service = {};
        const builder = {
            get: jest.fn(name => {
                expect(name).toBe('ref');
                return service;
            })
        };
        const ref = new ServiceRef('ref');
        expect(ref.resolve(builder)).toBe(service);
        expect(builder.get).toBeCalledTimes(1);
    });

    it('can add calls on the service', () => {
        const service = {};
        const builder = {
            get: () => service
        };
        const callback = jest.fn();
        const call = {
            resolve: () => callback
        }
        const ref = new ServiceRef('ref');
        ref.addCall(call);
        expect(ref.resolve(builder)).toBe(service);
        expect(callback).toBeCalledTimes(1);
    });

    it('cannot add calls on the resolved service', () => {
        const service = {};
        const builder = {
            get: () => service
        };
        const callback = jest.fn();
        const call = {
            resolve: () => callback
        }
        const ref = new ServiceRef('ref');
        expect(ref.resolve(builder)).toBe(service);
        ref.addCall(call);
        expect(ref.resolve(builder)).toBe(service);
        expect(callback).toBeCalledTimes(0);
    });
});
