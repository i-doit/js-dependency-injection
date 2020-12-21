import DiBuilder from '../DiBuilder';
import Call from './Call';
import Definition from './Definition';
import Parameter from './Parameter';

const container = new DiBuilder();
const object = {};

describe('Definition', () => {
    it('should create definition with a value', () => {
        const factory = jest.fn(() => object);
        const definition = new Definition('name', factory);
        expect(definition.name).toBe('name');
        expect(definition.resolve(container)).toBe(object);
        expect(factory).toBeCalledTimes(1);
    });

    it('does not call factory multiple times', () => {
        const factory = jest.fn(() => object);
        const definition = new Definition('name', factory);
        expect(definition.resolve(container)).toBe(object);
        expect(definition.resolve(container)).toBe(object);
        expect(definition.resolve(container)).toBe(object);
        expect(factory).toBeCalledTimes(1);
    });

    it('generates omitted name', () => {
        const factory = jest.fn(() => object);
        const definition = new Definition(null, factory);
        expect(definition.name).not.toBeFalsy();
    });

    it('has correct defaults', () => {
        const factory = jest.fn(() => object);
        const definition = new Definition(null, factory);
        expect(definition.isPublic).toBe(false);
        expect(definition.isLazy).toBe(true);
        expect(definition.args).toHaveLength(0);
        expect(definition.calls).toHaveLength(0);
        expect(definition.tags).toHaveLength(0);
    });

    it('its setters work', () => {
        const factory = jest.fn(() => object);
        const definition = new Definition(null, factory, 1, 2, 3);
        definition.setPublic(true);
        expect(definition.isPublic).toBe(true);
        definition.setLazy(false);
        expect(definition.isLazy).toBe(false);
        expect(definition.args).toHaveLength(3);
        definition.addCall(new Call(() => null));
        expect(definition.calls).toHaveLength(1);
        definition.addTag('one');
        definition.addTag('second');
        expect(definition.tags).toHaveLength(2);
    });

    it('should create definition with a value and params', () => {
        const factory = jest.fn((a, b, c) => {
            expect(a).toBe(1);
            expect(b).toBe(2);
            expect(c).toBe(3);
            return object;
        });
        const definition = new Definition('name', factory, 1, 2, 3);
        expect(definition.name).toBe('name');
        expect(definition.resolve(container)).toBe(object);
        expect(factory).toBeCalledTimes(1);
    });

    it('should create definition with a value and resolvable params', () => {
        const factory = jest.fn((a, b, c) => {
            expect(a).toBe('first');
            expect(b).toBe('second');
            expect(c).toBe(3);
            return object;
        });
        const definition = new Definition('name', factory, new Parameter('first', 'first'), new Parameter('second', 'second'), 3);
        expect(definition.name).toBe('name');
        expect(definition.resolve(container)).toBe(object);
        expect(factory).toBeCalledTimes(1);
    });

    it('should create definition with a callback', () => {
        const callback = jest.fn();
        const call = new Call(callback);
        const factory = jest.fn(() => object);
        const definition = new Definition('name', factory);
        definition.addCall(call);
        expect(definition.resolve(container)).toBe(object);
        expect(callback).toBeCalledTimes(1);
    });
});
