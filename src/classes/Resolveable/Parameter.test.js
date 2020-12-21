import DiBuilder from '../DiBuilder';
import Parameter from './Parameter';

const container = new DiBuilder();

describe('Parameter', () => {
    it.each([
        ['string', 'string'],
        ['number', 321],
        ['object', {some: 'object'}],
        ['date', new Date()],
    ])('should create parameter %s with a value', (name, value) => {
        const parameter = new Parameter(name, value);
        expect(parameter.name).toBe(name);
        expect(parameter.resolve(container)).toBe(value);
    })
});
