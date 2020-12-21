import DiBuilder from '../DiBuilder';
import Call from './Call';
import Parameter from './Parameter';

const container = new DiBuilder();

describe('Call', () => {
    it('should create callback %s with a value', () => {
        const callback = jest.fn();
        const call = new Call(callback);
        const resolved = call.resolve(container);
        expect(typeof resolved).toBe('function');
        resolved();
        expect(callback).toBeCalledTimes(1);
        resolved();
        expect(callback).toBeCalledTimes(2);
    });

    it('is called with arguments', () => {
        const object = {};
        const callback = jest.fn((current, a, b, c) => {
            expect(current).toBe(object);
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);

            return 'result';
        });
        const call = new Call(callback, 1, 2, 3);
        const resolved = call.resolve(container);
        expect(resolved(object)).toBe('result');
        expect(callback).toBeCalledTimes(1);
    });

    it('is called with resolveable arguments', () => {
        const object = {};
        const callback = jest.fn((current, a, b, c) => {
            expect(current).toBe(object);
            expect(a).toBe('first');
            expect(b).toBe('second');
            expect(c).toBe(3);

            return 'result';
        });
        const call = new Call(
            callback,
            new Parameter('first', 'first'),
            new Parameter('second', 'second'),
            3
        );
        const resolved = call.resolve(container);
        expect(resolved(object)).toBe('result');
        expect(callback).toBeCalledTimes(1);
    });
});
