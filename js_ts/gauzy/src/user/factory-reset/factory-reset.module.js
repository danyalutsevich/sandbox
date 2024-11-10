"use strict";
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryResetModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const plugin_1 = require("../../../plugins/plugin");
const index_1 = require("../../../plugins/config/dist/index");
const factory_reset_service_1 = require("./factory-reset.service");
const entities_1 = require("../../core/entities");
let FactoryResetModule = exports.FactoryResetModule = class FactoryResetModule {
};
exports.FactoryResetModule = FactoryResetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                ...entities_1.coreEntities,
                ...(0, plugin_1.getEntitiesFromPlugins)((0, index_1.getConfig)().plugins)
            ]),
            nestjs_1.MikroOrmModule.forFeature([
                ...entities_1.coreEntities,
                ...(0, plugin_1.getEntitiesFromPlugins)((0, index_1.getConfig)().plugins)
            ]),
        ],
        providers: [
            factory_reset_service_1.FactoryResetService,
        ],
        exports: [
            factory_reset_service_1.FactoryResetService
        ]
    })
], FactoryResetModule);
//# sourceMappingURL=factory-reset.module.js.map