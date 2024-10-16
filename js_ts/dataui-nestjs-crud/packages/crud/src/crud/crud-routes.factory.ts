import { RequestMethod } from '@nestjs/common';
import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum';
import {
  getOwnPropNames,
  isArrayFull,
  isEqual,
  isFalse,
  isFunction,
  isIn,
  isNil,
  isObjectFull,
  isUndefined,
  objKeys,
} from '@dataui/crud-util';
import * as deepmerge from 'deepmerge';

import { CrudActions, CrudValidationGroups } from '../enums';
import { CrudRequestInterceptor, CrudResponseInterceptor } from '../interceptors';
import { BaseRoute, CrudOptions, CrudRequest, MergedCrudOptions } from '../interfaces';
import { CrudConfigService } from '../module';
import { BaseRouteName } from '../types';
import { R } from './reflection.helper';
import { SerializeHelper } from './serialize.helper';
import { Swagger } from './swagger.helper';
import { Validation } from './validation.helper';

export interface SwaggerModels {
  get?: any;
  getMany?: any;
  create?: any;
  update?: any;
  replace?: any;
  delete?: any;
  recover?: any;
}

export class CrudRoutesFactory {
  protected options: MergedCrudOptions;
  protected swaggerModels: SwaggerModels = {};

  constructor(protected target: any, options: CrudOptions) {
    this.options = options;
    this.create();
  }

  /* istanbul ignore next */
  static create(target: any, options: CrudOptions): CrudRoutesFactory {
    return new CrudRoutesFactory(target, options);
  }

  protected get targetProto(): any {
    return this.target.prototype;
  }

  protected get modelName(): string {
    return this.options.model.type.name;
  }

  protected get modelType(): any {
    return this.options.model.type;
  }

  protected get actionsMap(): { [key in BaseRouteName]: CrudActions } {
    return {
      getManyBase: CrudActions.ReadAll,
      getOneBase: CrudActions.ReadOne,
      createManyBase: CrudActions.CreateMany,
      createOneBase: CrudActions.CreateOne,
      updateOneBase: CrudActions.UpdateOne,
      deleteOneBase: CrudActions.DeleteOne,
      replaceOneBase: CrudActions.ReplaceOne,
      recoverOneBase: CrudActions.RecoverOne,
    };
  }

  protected create() {
    const routesSchema = this.getRoutesSchema();
    this.mergeOptions();
    this.setResponseModels();
    this.createRoutes(routesSchema);
    this.overrideRoutes(routesSchema);
    this.enableRoutes(routesSchema);
  }

  /**
   * merge options with global options that provided via CrudConfigService.load()
   */
  protected mergeOptions() {
    // merge auth config
    const authOptions = R.getCrudAuthOptions(this.target);
    this.options.auth = isObjectFull(authOptions) ? authOptions : {};
    if (isUndefined(this.options.auth.property)) {
      this.options.auth.property = CrudConfigService.config.auth.property;
    }
    if (isUndefined(this.options.auth.groups)) {
      this.options.auth.groups = CrudConfigService.config.auth.groups;
    }
    if (isUndefined(this.options.auth.classTransformOptions)) {
      this.options.auth.classTransformOptions =
        CrudConfigService.config.auth.classTransformOptions;
    }

    // merge query config
    const query = isObjectFull(this.options.query) ? this.options.query : {};
    this.options.query = { ...CrudConfigService.config.query, ...query };

    // merge routes config
    const routes = isObjectFull(this.options.routes) ? this.options.routes : {};
    this.options.routes = deepmerge(CrudConfigService.config.routes, routes, {
      arrayMerge: (target, source, opts) => source,
    });

    // merge operators config
    const operators = isObjectFull(this.options.operators) ? this.options.operators : {};
    this.options.operators = deepmerge(CrudConfigService.config.operators, operators);

    // set params
    this.options.params = isObjectFull(this.options.params)
      ? this.options.params
      : isObjectFull(CrudConfigService.config.params)
      ? CrudConfigService.config.params
      : {};
    const hasPrimary = this.getPrimaryParams().length > 0;
    if (!hasPrimary) {
      this.options.params.id = {
        field: 'id',
        type: 'number',
        primary: true,
      };
    }

    // set dto
    if (!isObjectFull(this.options.dto)) {
      this.options.dto = {};
    }

    // set serialize
    const serialize = isObjectFull(this.options.serialize) ? this.options.serialize : {};
    this.options.serialize = { ...CrudConfigService.config.serialize, ...serialize };
    this.options.serialize.get = isFalse(this.options.serialize.get)
      ? false
      : this.options.serialize.get || this.modelType;
    this.options.serialize.getMany = isFalse(this.options.serialize.getMany)
      ? false
      : this.options.serialize.getMany
      ? this.options.serialize.getMany
      : isFalse(this.options.serialize.get)
      ? /* istanbul ignore next */ false
      : SerializeHelper.createGetManyDto(this.options.serialize.get, this.modelName);
    this.options.serialize.create = isFalse(this.options.serialize.create)
      ? false
      : this.options.serialize.create || this.modelType;
    this.options.serialize.update = isFalse(this.options.serialize.update)
      ? false
      : this.options.serialize.update || this.modelType;
    this.options.serialize.replace = isFalse(this.options.serialize.replace)
      ? false
      : this.options.serialize.replace || this.modelType;
    this.options.serialize.delete =
      isFalse(this.options.serialize.delete) ||
      !this.options.routes.deleteOneBase.returnDeleted
        ? false
        : this.options.serialize.delete || this.modelType;

    R.setCrudOptions(this.options, this.target);
  }

  /**
   * an array of routes schema for methods (routes) to be generated for the target controller
   * such as getManyBase, ...
   * @returns
   */
  protected getRoutesSchema(): BaseRoute[] {
    return [
      {
        name: 'getOneBase',
        path: '/',
        method: RequestMethod.GET,
        enable: false,
        override: false,
        withParams: true,
      },
      {
        name: 'getManyBase',
        path: '/',
        method: RequestMethod.GET,
        enable: false,
        override: false,
        withParams: false,
      },
      {
        name: 'createOneBase',
        path: '/',
        method: RequestMethod.POST,
        enable: false,
        override: false,
        withParams: false,
      },
      {
        name: 'createManyBase',
        path: '/bulk',
        method: RequestMethod.POST,
        enable: false,
        override: false,
        withParams: false,
      },
      {
        name: 'updateOneBase',
        path: '/',
        method: RequestMethod.PATCH,
        enable: false,
        override: false,
        withParams: true,
      },
      {
        name: 'replaceOneBase',
        path: '/',
        method: RequestMethod.PUT,
        enable: false,
        override: false,
        withParams: true,
      },
      {
        name: 'deleteOneBase',
        path: '/',
        method: RequestMethod.DELETE,
        enable: false,
        override: false,
        withParams: true,
      },
      {
        name: 'recoverOneBase',
        path: '/recover',
        method: RequestMethod.PATCH,
        enable: false,
        override: false,
        withParams: true,
      },
    ];
  }

  /**
   * generate `getManyBase()` method for the controller
   * note that `this` here will refer to the target i.e. the controller
   *
   * the generated method is similar to:
   * ```
   *  class UserController{
   *   getManyBase(req){
   *    return this.service.getMany(req);
   *   }
   *  }
   * ```
   */
  protected getManyBase(name: BaseRouteName) {
    this.targetProto[name] = function getManyBase(req: CrudRequest) {
      return this.service.getMany(req);
    };
  }

  protected getOneBase(name: BaseRouteName) {
    this.targetProto[name] = function getOneBase(req: CrudRequest) {
      return this.service.getOne(req);
    };
  }

  protected createOneBase(name: BaseRouteName) {
    this.targetProto[name] = function createOneBase(req: CrudRequest, dto: any) {
      return this.service.createOne(req, dto);
    };
  }

  protected createManyBase(name: BaseRouteName) {
    this.targetProto[name] = function createManyBase(req: CrudRequest, dto: any) {
      return this.service.createMany(req, dto);
    };
  }

  protected updateOneBase(name: BaseRouteName) {
    this.targetProto[name] = function updateOneBase(req: CrudRequest, dto: any) {
      return this.service.updateOne(req, dto);
    };
  }

  protected replaceOneBase(name: BaseRouteName) {
    this.targetProto[name] = function replaceOneBase(req: CrudRequest, dto: any) {
      return this.service.replaceOne(req, dto);
    };
  }

  protected deleteOneBase(name: BaseRouteName) {
    this.targetProto[name] = function deleteOneBase(req: CrudRequest) {
      return this.service.deleteOne(req);
    };
  }

  protected recoverOneBase(name: BaseRouteName) {
    this.targetProto[name] = function recoverOneBase(req: CrudRequest) {
      return this.service.recoverOne(req);
    };
  }

  /**
   * check if the route can be created
   * i.e. included in only[] or doesn't included in exclude[] options
   * if only[] has values, exclude[] is ignored
   * @param name
   * @returns
   */
  protected canCreateRoute(name: BaseRouteName) {
    const only = this.options.routes.only;
    const exclude = this.options.routes.exclude;

    // include recover route only for models with soft delete option
    if (name === 'recoverOneBase' && this.options.query.softDelete !== true) {
      return false;
    }

    if (isArrayFull(only)) {
      return only.some((route) => route === name);
    }

    if (isArrayFull(exclude)) {
      return !exclude.some((route) => route === name);
    }

    return true;
  }

  /**
   * generate Swagger response DTO for each operation
   * it uses options.serialize for each operation, or the model type (i.e. the entity)
   * @returns an object contains DTO for each operation
   * @example
   * ```
   * {
   *  get: UserEntity,
   *  getMany: createGetManyDto(UserEntity),
   *  create: UserEntity,
   *  update: UserEntity,
   *  replace: UserEntity,
   *  delete: UserEntity,
   *  recover: UserEntity,
   * }
   * ```
   */
  protected setResponseModels() {
    // if model.type is a function or class, use it
    // otherwise generate an empty DTO class
    const modelType = isFunction(this.modelType)
      ? this.modelType
      : SerializeHelper.createGetOneResponseDto(this.modelName);

    this.swaggerModels.get = isFunction(this.options.serialize.get)
      ? this.options.serialize.get
      : modelType;
    this.swaggerModels.getMany =
      this.options.serialize.getMany ||
      SerializeHelper.createGetManyDto(this.swaggerModels.get, this.modelName);
    this.swaggerModels.create = isFunction(this.options.serialize.create)
      ? this.options.serialize.create
      : modelType;
    this.swaggerModels.update = isFunction(this.options.serialize.update)
      ? this.options.serialize.update
      : modelType;
    this.swaggerModels.replace = isFunction(this.options.serialize.replace)
      ? this.options.serialize.replace
      : modelType;
    this.swaggerModels.delete = isFunction(this.options.serialize.delete)
      ? this.options.serialize.delete
      : modelType;
    this.swaggerModels.recover = isFunction(this.options.serialize.recover)
      ? this.options.serialize.recover
      : modelType;

    Swagger.setExtraModels(this.swaggerModels);
  }

  /**
   * generate the controller's methods (routers), such as getManyBase(), ...
   * @param routesSchema
   */
  protected createRoutes(routesSchema: BaseRoute[]) {
    // primary keys that are not disabled, i.e. doesn't have `{ disabled: true }`
    const primaryParams = this.getPrimaryParams().filter(
      (param) => !this.options.params[param].disabled,
    );

    routesSchema.forEach((route) => {
      if (this.canCreateRoute(route.name)) {
        // create base method
        // call this.getManyBase("getManyBase"), and so on ...
        this[route.name](route.name);
        route.enable = true;
        // set metadata
        this.setBaseRouteMeta(route.name);
      }

      if (route.withParams && primaryParams.length > 0) {
        route.path =
          route.path !== '/'
            ? `${primaryParams.map((param) => `/:${param}`).join('')}${route.path}`
            : primaryParams.map((param) => `/:${param}`).join('');
      }
    });
  }

  protected overrideRoutes(routesSchema: BaseRoute[]) {
    getOwnPropNames(this.targetProto).forEach((name) => {
      const override = R.getOverrideRoute(this.targetProto[name]);
      const route = routesSchema.find((r) => isEqual(r.name, override));

      if (override && route && route.enable) {
        // get metadata
        const interceptors = R.getInterceptors(this.targetProto[name]);
        const baseInterceptors = R.getInterceptors(this.targetProto[override]);
        const baseAction = R.getAction(this.targetProto[override]);
        const operation = Swagger.getOperation(this.targetProto[name]);
        const baseOperation = Swagger.getOperation(this.targetProto[override]);
        const swaggerParams = Swagger.getParams(this.targetProto[name]);
        const baseSwaggerParams = Swagger.getParams(this.targetProto[override]);
        const responseOk = Swagger.getResponseOk(this.targetProto[name]);
        const baseResponseOk = Swagger.getResponseOk(this.targetProto[override]);
        // set metadata
        R.setInterceptors([...baseInterceptors, ...interceptors], this.targetProto[name]);
        R.setAction(baseAction, this.targetProto[name]);
        Swagger.setOperation({ ...baseOperation, ...operation }, this.targetProto[name]);
        Swagger.setParams(
          [...baseSwaggerParams, ...swaggerParams],
          this.targetProto[name],
        );
        Swagger.setResponseOk(
          { ...baseResponseOk, ...responseOk },
          this.targetProto[name],
        );
        this.overrideParsedBodyDecorator(override, name);
        // enable route
        R.setRoute(route, this.targetProto[name]);
        route.override = true;
      }
    });
  }

  protected enableRoutes(routesSchema: BaseRoute[]) {
    routesSchema.forEach((route) => {
      if (!route.override && route.enable) {
        R.setRoute(route, this.targetProto[route.name]);
      }
    });
  }

  protected overrideParsedBodyDecorator(override: BaseRouteName, name: string) {
    const allowed = [
      'createManyBase',
      'createOneBase',
      'updateOneBase',
      'replaceOneBase',
    ] as BaseRouteName[];
    const withBody = isIn(override, allowed);
    const parsedBody = R.getParsedBody(this.targetProto[name]);

    if (withBody && parsedBody) {
      const baseKey = `${RouteParamtypes.BODY}:1`;
      const key = `${RouteParamtypes.BODY}:${parsedBody.index}`;
      const baseRouteArgs = R.getRouteArgs(this.target, override);
      const routeArgs = R.getRouteArgs(this.target, name);
      const baseBodyArg = baseRouteArgs[baseKey];
      R.setRouteArgs(
        {
          ...routeArgs,
          [key]: {
            ...baseBodyArg,
            index: parsedBody.index,
          },
        },
        this.target,
        name,
      );

      /* istanbul ignore else */
      if (isEqual(override, 'createManyBase')) {
        const paramTypes = R.getRouteArgsTypes(this.targetProto, name);
        const metatype = paramTypes[parsedBody.index];
        const types = [String, Boolean, Number, Array, Object];
        const toCopy =
          isIn(metatype, types) || /* istanbul ignore next */ isNil(metatype);

        /* istanbul ignore else */
        if (toCopy) {
          const baseParamTypes = R.getRouteArgsTypes(this.targetProto, override);
          const baseMetatype = baseParamTypes[1];
          paramTypes.splice(parsedBody.index, 1, baseMetatype);
          R.setRouteArgsTypes(paramTypes, this.targetProto, name);
        }
      }
    }
  }

  /**
   * get the params that has `primary: true`
   * @returns
   */
  protected getPrimaryParams(): string[] {
    return objKeys(this.options.params).filter(
      (param) => this.options.params[param] && this.options.params[param].primary,
    );
  }

  protected setBaseRouteMeta(name: BaseRouteName) {
    this.setRouteArgs(name);
    this.setRouteArgsTypes(name);
    this.setInterceptors(name);
    this.setAction(name);
    this.setSwaggerOperation(name);
    this.setSwaggerPathParams(name);
    this.setSwaggerQueryParams(name);
    this.setSwaggerResponseOk(name);
    // set decorators after Swagger so metadata can be overwritten
    this.setDecorators(name);
  }

  /**
   * generate body DTO
   * and add the NestJs ValidationPipe to create, update and replace operations
   * ValidationPipe.group option is used to distinguish between the DTO for creating and the DTO for updating
   * for example each prop in body is optional in "update", but required in "create" operation
   * https://gid-oss.github.io/dataui-nestjs-crud/controllers/#request-validation
   *
   * ```
   * class UserEntity{
   *   @IsOptional({ groups: [UPDATE] })
   *   @IsNotEmpty({ groups: [CREATE] })
   *   @Column({ ...})
   *   name: string;
   * }
   * ```
   * @param name
   */
  protected setRouteArgs(name: BaseRouteName) {
    let rest = {};
    const routes: BaseRouteName[] = [
      'createManyBase',
      'createOneBase',
      'updateOneBase',
      'replaceOneBase',
    ];

    //  add ValidationPipe to create, update and replace operations
    if (isIn(name, routes)) {
      const action = this.routeNameAction(name);
      const hasDto = !isNil(this.options.dto[action]);
      const { UPDATE, CREATE } = CrudValidationGroups;
      const groupEnum = isIn(name, ['updateOneBase', 'replaceOneBase']) ? UPDATE : CREATE;
      const group = !hasDto ? groupEnum : undefined;

      rest = R.setBodyArg(1, [Validation.getValidationPipe(this.options, group)]);
    }

    R.setRouteArgs({ ...R.setParsedRequestArg(0), ...rest }, this.target, name);
  }

  protected setRouteArgsTypes(name: BaseRouteName) {
    if (isEqual(name, 'createManyBase')) {
      const bulkDto = Validation.createBulkDto(this.options);
      R.setRouteArgsTypes([Object, bulkDto], this.targetProto, name);
    } else if (isIn(name, ['createOneBase', 'updateOneBase', 'replaceOneBase'])) {
      const action = this.routeNameAction(name);
      const dto = this.options.dto[action] || this.modelType;
      R.setRouteArgsTypes([Object, dto], this.targetProto, name);
    } else {
      R.setRouteArgsTypes([Object], this.targetProto, name);
    }
  }

  /**
   * add metadata for interceptors to the routes
   * including the built-in CrudRequestInterceptor, CrudResponseInterceptor
   * and the interceptors provided by the user via options
   * @param name
   */
  protected setInterceptors(name: BaseRouteName) {
    const interceptors = this.options.routes[name].interceptors;
    R.setInterceptors(
      [
        CrudRequestInterceptor,
        CrudResponseInterceptor,
        ...(isArrayFull(interceptors) ? /* istanbul ignore next */ interceptors : []),
      ],
      this.targetProto[name],
    );
  }

  protected setDecorators(name: BaseRouteName) {
    const decorators = this.options.routes[name].decorators;
    R.setDecorators(
      isArrayFull(decorators) ? /* istanbul ignore next */ decorators : [],
      this.targetProto,
      name,
    );
  }

  /**
   * add metadata for the action's name of the operation to the route method
   * @param name
   */
  protected setAction(name: BaseRouteName) {
    R.setAction(this.actionsMap[name], this.targetProto[name]);
  }

  /**
   * add metadata for Swagger's \@ApiOperation() to the method
   * @param name
   */
  protected setSwaggerOperation(name: BaseRouteName) {
    const summary = Swagger.operationsMap(this.modelName)[name];
    // example: getManyBaseUsersControllerUserEntity
    const operationId = name + this.targetProto.constructor.name + this.modelName;
    Swagger.setOperation({ summary, operationId }, this.targetProto[name]);
  }

  /**
   * add metadata for Swagger's path params to the method
   * i.e. @ApiParam()
   * @param name
   */
  protected setSwaggerPathParams(name: BaseRouteName) {
    const metadata = Swagger.getParams(this.targetProto[name]);
    // operations that don't need the primary key
    const withoutPrimary: BaseRouteName[] = [
      'createManyBase',
      'createOneBase',
      'getManyBase',
    ];

    // true if withoutPrimary[] includes the operation
    const removePrimary = isIn(name, withoutPrimary);

    // get path params that are not disabled, and not primary key (if removePrimary is true)
    // for this path `users/:id` the params are ['id']
    const params = objKeys(this.options.params)
      .filter((key) => !this.options.params[key].disabled)
      .filter((key) => !(removePrimary && this.options.params[key].primary))
      // example: { id: opts.params.id, ... }
      .reduce((a, c) => ({ ...a, [c]: this.options.params[c] }), {});

    const pathParamsMeta = Swagger.createPathParamsMeta(params);
    Swagger.setParams([...metadata, ...pathParamsMeta], this.targetProto[name]);
  }

  /**
   * add metadata for Swagger's \@ApiQuery()
   * @param name
   */
  protected setSwaggerQueryParams(name: BaseRouteName) {
    // existing metadata
    const metadata = Swagger.getParams(this.targetProto[name]);
    const queryParamsMeta = Swagger.createQueryParamsMeta(name, this.options);
    Swagger.setParams([...metadata, ...queryParamsMeta], this.targetProto[name]);
  }

  protected setSwaggerResponseOk(name: BaseRouteName) {
    const metadata = Swagger.getResponseOk(this.targetProto[name]);
    const metadataToAdd =
      Swagger.createResponseMeta(name, this.options, this.swaggerModels) ||
      /* istanbul ignore next */ {};
    Swagger.setResponseOk({ ...metadata, ...metadataToAdd }, this.targetProto[name]);
  }

  /**
   * get the Action's name
   * @param name the route's name, such as getManyBase, createOneBase, ...
   * @returns
   * @example getOneBase -> get
   * @example createOneBase -> create
   */
  protected routeNameAction(name: BaseRouteName): string {
    return (
      name.split('OneBase')[0] || /* istanbul ignore next */ name.split('ManyBase')[0]
    );
  }
}
