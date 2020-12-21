import ParameterRef from './ParameterRef';

describe('Parameter Ref', () => {
    it('should find parameter from container by name', () => {
        const builder = {
            getParameter: jest.fn(name => {
                expect(name).toBe('param');
                return 123;
            })
        };
        const ref = new ParameterRef('param');
        expect(ref.resolve(builder)).toBe(123);
        expect(builder.getParameter).toBeCalledTimes(1);
    });
});
