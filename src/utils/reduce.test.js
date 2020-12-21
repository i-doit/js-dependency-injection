import reduce from './reduce';

const data = {a: 1, b: 2, c: 3, d: 4};

describe('reduce', () => {
    it.each([
        ['sum', data, (r, k, v) => r + v, 0, 10],
        ['multiplication', data, (r, k, v) => r * v, 1, 24],
        ['sum a,c', data, (r, k, v) => ['a', 'c'].includes(k) ? (r + v) : r, 0, 4],
    ])('Scalar operation: %s', (name, object, callback, initial, expected) => {
        const result = reduce(object, callback, initial);
        expect(result).toBe(expected);
    });
});
