import DiBuilder from '../DiBuilder';
import Parser from './Parser';

describe('Parser', () => {
    it('should return container', () => {
        const container = new DiBuilder();
        const parser = new Parser();
        expect(parser.parse(container)).toBe(container);
    });
    it('should return null on non-container', () => {
        const parser = new Parser();
        expect(parser.parse({a: 123})).toBeNull();
    });
});
