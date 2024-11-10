---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---

## Why?

[NestJS](https://github.com/nestjs/nest) is probably one of the best things that happened to Node.js community a couple of years ago. It was a missing part that provides a truly important architectural solution for a wide range of backend development aspects. But, despite the fact that it allows creating RESTful applications efficiently, an important CRUD scaffolding functionality that is present in many other HTTP frameworks was missing. That's why **Nestjsx/crud** came out. And we hope you'll find it very useful.

## Installation

```
npm i @dataui/crud-typeorm @nestjs/typeorm typeorm
```

For for TypeORM 0.2.x :

```
npm i @dataui/crud-typeorm@~5.1 @nestjs/typeorm@~8.0.2 typeorm@~0.2
```

## Compatibility

Versions < 5.2.0 aim for full compatibility with the original Nestjsx/crud project while adding few new features.

Version >= 5.2.0 are based on TypeORM 0.3.x and might not be compatible, but still the goal is to have minimal disruption when upgrading from TypeORM 0.2.x

## Documentation

### Controllers

- [Description](controllers#description)
- [Install](controllers#install)
- [Getting started](controllers#getting-started)
- [API endpoints](controllers#api-endpoints)
- [Swagger](controllers#swagger)
- [Options](controllers#options)
- [Global options](controllers#global-options)
- [Request authentication](controllers#request-authentication)
- [Request validation](controllers#request-validation)
- [Response serialization](controllers#response-serialization)
- [IntelliSense](controllers#intellisense)
- [Routes override](controllers#routes-override)
- [Adding routes](controllers#adding-routes)
- [Additional decorators](controllers#additional-decorators)

### Services

- [Description](services#description)
- [TypeORM](service-typeorm)

### Requests

- [Description](requests#description)
- [Query params](requests#query-params)
- [Frontend usage](requests#frontend-usage)
