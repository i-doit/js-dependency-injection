# JS dependency injection

Dependency injection is a programming technique that makes a class independent of its dependencies. It achieves that by decoupling the usage of an object from its creation.

This helps you to follow SOLID’s dependency inversion and single responsibility principles.

The goal of the dependency injection technique is to remove this dependency by separating the usage from the creation of the object. This reduces the amount of required boilerplate code and improves flexibility.

## Installation

```shell
npm install @i-doit/js-dependency-injection
```

## Basic Example

To use the DI, you have to create a DiBuilder. It is responsible for the registration and resolving of all the dependencies.

```js
import { DiBuilder } from '@i-doit/js-dependency-injection';
```

Create a DiBuilder instance and register the needed services and parameters.

You can pass them via constructor arguments or call `addDefinition` or `addParameter` manually:

```js
const containerBuilder = new DiBuilder(
    'example',
    new Definition('service', MyService).setPublic(true),
    new Parameter('key', value)
);

containerBuilder.addDefinition(new Definition('cacher', Cacher));
containerBuilder.addParameter(new Parameter('api-key', global.apikey));
```

When you configured DiBuilder, call build() method to receive the Container.

Container has methods to access the defined public services.

```js
const container = containerBuilder.build();
console.log(container.has('example.service')); // will write true
console.log(container.get('example.service')); // will write an object of MyService
console.log(container.has('example.cacher')); // will write false
console.log(container.get('example.cacher')); // will throw an exception
```

## Facade

Facade is a set of helper methods to define your container builder with factory methods.

`di` - DI builder

`p` - Parameter definition

`s` - Service definition

`ref` - Reference to service

`pref` - Reference to parameter

`tagged` - Reference to all services tagged with the given tag

`call` - Definition of the method call

### Example of usage:
```js
import $ from '@i-doit/js-dependency-injection';

export default $.di('example',
    $.s('service',
        MyService, // Constructor/Factory method to create a service
        'static argument', // static values will be just passed to the contructor/factory method
        $.ref('another.service'), // reference to another service
        $.tagged('tag'), // pass an array of services tagged with `tag`
    ).setPublic(true),
    $.s('service-with-calls', MyService)
        .addCall($.call(
            (service, argument1, argument2) => service.doAction(argument1, argument2), // a callback. service - the current service
            $.ref('example.service'), // argument1
            $.pref('example.parameter'), // argument2
        )),
    $.s(null, MyService) // You can omit the service name, if it's not referenced by name
        .addTag('tag'),
    $.p('parameter', 'some-value'),
);
```

## Loaders

To simplify the configuration of the DiBuilder, you can use the loaders.

Loader has a method to load the DiBuilder. Loaders work together with Parsers to define Containers in user-friendly way.

### ChainLoader

ChainLoader is a structural class to be able to use multiple loaders at once:

```js
const loader = new ChainLoader([loader1, loader2, loader3]);
const containerBuilder = loader.load();
```

### ContextLoader

Context loader finds the files using the require context and call the passed parser for each found entry:

```js
const loader = new ContextLoader(
    require.context('.', true, /.service\.js$/),
    new ServiceParser()
);
```

## Parsers

Parsers work together with loaders to prepare the DiBuilder from the file content.

### Parser

Parser checks if the data is already a DiBuilder and returns it. This behaviour is helpful when you define DiBuilders in multiple files in the object way (with DiBuilders created directly or via Facade)

### ParameterParser

Creates a DiBuilder with parameters defined in passed object:

```js
const params = {
    parameter1: 'value',
    parameter2: ['1', '2']
};
const builder = (new ParameterParser()).parse(params);
```

It's helpful to use it to define parameters in the separate json file.

### ServiceParser

Parses the definition object to find service definitions in it.

Example of the supported format

```js
export default {
    example: {
        service: {
            class: MyService,
            public: true,
            arguments: [
                '%example.parameter%', // is a parameter reference
                '@example.cacher', // is a service reference
                '!tagged my-tag', // is a reference to all services with this tag
            ],
        },
        cacher: [Cacher, '@another.service'] // array is short form for non-public services
    },
    scope: {
        subscope: {
            service: { // can be accessed via 'scope.subscope.service'
                class: MyClass,
                tags: ['my-tag']
            }
        }
    }
};
```

## Influences

The JS dependency injection implements a [PSR-11](https://www.php-fig.org/psr/psr-11/) compatible service container that allows you to standardize and centralize the way objects are constructed in your application.

The library is inspired by [Symfony DependencyInjection](https://symfony.com/doc/current/components/dependency_injection.html) component.

## Copyright & License

Copyright (C) 2020 [synetics GmbH](https://www.i-doit.com/)

This work is licensed under a [MIT](LICENSE)
