"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CurrencyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const currency_entity_1 = require("./currency.entity");
const currency_controller_1 = require("./currency.controller");
const currency_service_1 = require("./currency.service");
let CurrencyModule = exports.CurrencyModule = CurrencyModule_1 = class CurrencyModule {
};
exports.CurrencyModule = CurrencyModule = CurrencyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/currency', module: CurrencyModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([currency_entity_1.Currency]),
            nestjs_1.MikroOrmModule.forFeature([currency_entity_1.Currency]),
        ],
        controllers: [currency_controller_1.CurrencyController],
        providers: [currency_service_1.CurrencyService],
        exports: [currency_service_1.CurrencyService]
    })
], CurrencyModule);
//# sourceMappingURL=currency.module.js.map