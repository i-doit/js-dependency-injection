import DiBuilder from '../DiBuilder';
import ChainLoader from './ChainLoader';
import ContextLoader from './ContextLoader';

describe('Context loader', () => {
    it('goes through require context and call parser for defaults', () => {
        const data = {};
        const parser = {
            parse: jest.fn(exported => {
                expect(exported).toBe(data);
                return new DiBuilder();
            })
        };
        const context = jest.fn(key => {
            expect(key).toBe('key');
            return {
                default: data
            };
        });
        context.keys = jest.fn(() => ['key']);
        const loader = new ContextLoader(context, parser);
        loader.load();
        expect(context).toBeCalledTimes(1);
        expect(context.keys).toBeCalledTimes(1);
        expect(parser.parse).toBeCalledTimes(1);
    });
});
