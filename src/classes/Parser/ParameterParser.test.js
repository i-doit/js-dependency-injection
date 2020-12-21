import ParameterParser from './ParameterParser';

describe('Parameter Parser', () => {
    it('should create container with parameters', () => {
        const parser = new ParameterParser();
        const container = parser.parse({
            key: 'value',
            one: 1,
            two: 'two',
            three: 'three'
        });

        expect(Object.keys(container.parameters)).toHaveLength(4);
        expect(container.getParameter('key')).toBe('value');
        expect(container.getParameter('one')).toBe(1);
        expect(container.getParameter('two')).toBe('two');
        expect(container.getParameter('three')).toBe('three');
    });
});
