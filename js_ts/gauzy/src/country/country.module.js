"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CountryModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const country_entity_1 = require("./country.entity");
const country_controller_1 = require("./country.controller");
const country_service_1 = require("./country.service");
const nestjs_1 = require("@mikro-orm/nestjs");
let CountryModule = exports.CountryModule = CountryModule_1 = class CountryModule {
};
exports.CountryModule = CountryModule = CountryModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/country', module: CountryModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([country_entity_1.Country]),
            nestjs_1.MikroOrmModule.forFeature([country_entity_1.Country]),
        ],
        controllers: [country_controller_1.CountryController],
        providers: [country_service_1.CountryService],
        exports: [country_service_1.CountryService]
    })
], CountryModule);
//# sourceMappingURL=country.module.js.map