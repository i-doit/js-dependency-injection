import TaggedRef from './TaggedRef';

describe('TaggedRef', () => {
    it('should find tagged services in the container', () => {
        const services = [{}, {}];
        const builder = {
            getTagged: jest.fn(name => {
                expect(name).toBe('tag');
                return services;
            })
        };
        const ref = new TaggedRef('tag');
        expect(ref.resolve(builder)).toBe(services);
        expect(builder.getTagged).toBeCalledTimes(1);
    });
});
