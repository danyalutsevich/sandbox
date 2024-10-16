"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlApiModule = void 0;
const common_1 = require("@nestjs/common");
const role_entity_resolver_1 = require("./../role/role-entity.resolver");
const Resolvers = [role_entity_resolver_1.RoleEntityResolver];
let GraphqlApiModule = exports.GraphqlApiModule = class GraphqlApiModule {
};
exports.GraphqlApiModule = GraphqlApiModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [...Resolvers],
        exports: [...Resolvers]
    })
], GraphqlApiModule);
//# sourceMappingURL=graphql-api.module.js.map