import Di from './Di';

describe('Di', () => {
    it('should expose public definitions', () => {
        const builder = {
            get: jest.fn(),
            definitions: {
                a: {},
                one: {
                    isPublic: true,
                },
                second: {
                    isPublic: true,
                },
                third: {
                    isPublic: false,
                },
            }
        }
        const di = new Di(builder);
        expect(di.keys()).toHaveLength(2);
        expect(di.has('a')).toBeFalsy();
        expect(di.has('b')).toBeFalsy();
        expect(di.has('one')).toBeTruthy();
        expect(di.has('second')).toBeTruthy();
        expect(di.has('third')).toBeFalsy();
        expect(() => di.get('a')).toThrow();
        expect(() => di.get('b')).toThrow();
        expect(() => di.get('third')).toThrow();
        expect(() => di.get('one')).not.toThrow();
        expect(builder.get).toBeCalledTimes(1);
    });
});
