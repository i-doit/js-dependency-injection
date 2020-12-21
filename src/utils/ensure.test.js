import ensure from './ensure';

describe('ensure', () => {
    it('creates a value by path', () => {
        const object = {};
        ensure(object, 'key', 'value');
        expect(Object.keys(object)).toHaveLength(1);
        expect(Object.keys(object)[0]).toBe('key');
        expect(object.key).toBe('value');
    });
    it('creates a value by array path', () => {
        const object = {};
        ensure(object, ['key'], 'value');
        expect(Object.keys(object)).toHaveLength(1);
        expect(Object.keys(object)[0]).toBe('key');
        expect(object.key).toBe('value');
    });
    it('creates a value by long path', () => {
        const object = {};
        ensure(object, 'key.subkey', 'value');
        expect(Object.keys(object)).toHaveLength(1);
        expect(Object.keys(object)[0]).toBe('key');
        const second = object.key;
        expect(Object.keys(second)).toHaveLength(1);
        expect(Object.keys(second)[0]).toBe('subkey');
        expect(second.subkey).toBe('value');
    });
    it('creates a value by long array path', () => {
        const object = {};
        ensure(object, ['key', 'subkey'], 'value');
        expect(Object.keys(object)).toHaveLength(1);
        expect(Object.keys(object)[0]).toBe('key');
        const second = object.key;
        expect(Object.keys(second)).toHaveLength(1);
        expect(Object.keys(second)[0]).toBe('subkey');
        expect(second.subkey).toBe('value');
    });
    it('does not replace the value on path', () => {
        const object = {key: {subkey: 'old-value'}};
        ensure(object, 'key', 'value');
        expect(object.key.subkey).toBe('old-value');
    });
});
