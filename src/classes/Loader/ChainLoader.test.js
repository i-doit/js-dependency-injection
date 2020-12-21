import DiBuilder from '../DiBuilder';
import ChainLoader from './ChainLoader';

describe('Chain loader', () => {
    it('goes through the chain and merges them', () => {
        const loader = jest.fn(() => new DiBuilder());
        const dummyLoader = {
            load: loader
        };
        const loaders = [dummyLoader, dummyLoader];
        const chain = new ChainLoader(loaders);
        chain.load();
        expect(loader).toBeCalledTimes(2);
    });
});
