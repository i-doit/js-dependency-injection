import { DiBuilder } from '../index';
import Definition from './Resolveable/Definition';
import Parameter from './Resolveable/Parameter';
import ServiceRef from './Resolveable/Ref/ServiceRef';

const createService = (name = null, isPublic = true) =>
    new Definition(name, () => ({}))
        .setPublic(isPublic);

describe('Di Builder', () => {
    it('should add a prefix', () => {
        const service = {};
        const factory = jest.fn(() => service);
        const parameter = new Parameter('name', 'value');
        const definition = new Definition('definition', factory);
        const builder = new DiBuilder('name', parameter, definition);
        expect(parameter.name).toBe('name.name');
        expect(definition.name).toBe('name.definition');
        expect(builder.getParameter('name.name')).toBe('value');
        expect(builder.get('name.definition')).toBe(service);
    });

    it('cannot find not existing service', () => {
        const builder = new DiBuilder();
        expect(() => builder.get('a')).toThrow();
    });

    it('cannot find not existing parameter', () => {
        const builder = new DiBuilder();
        expect(() => builder.getParameter('a')).toThrow();
    });

    it('builds the public services', () => {
        const builder = new DiBuilder(
            '',
            createService(),
            createService().setPublic(false),
            createService().setPublic(false),
            createService(),
        );
        const di = builder.build();
        expect(di.keys()).toHaveLength(2);
    });

    it('creates tagged services', () => {
        const builder = new DiBuilder(
            '',
            createService().addTag('tag'),
            createService().addTag('tag')
        );
        expect(builder.getTagged('tag')).toHaveLength(2);
    });
    it('resolves arguments', () => {
        const callback = jest.fn();
        const builder = new DiBuilder(
            '',
            new Definition('test', proxy => ({
                proxy
            }), new ServiceRef('ref')).setPublic(true),
            createService(),
            new Definition('ref', () => ({
                callback
            })),
        );
        const di = builder.build();
        const built = di.get('test');
        expect(built).toHaveProperty('proxy');
        built.proxy.callback();
        expect(callback).toBeCalledTimes(1);
    });
});
