"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicEmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const internal_1 = require("./../../core/entities/internal");
const public_employee_controller_1 = require("./public-employee.controller");
const public_employee_service_1 = require("./public-employee.service");
const handlers_1 = require("./queries/handlers");
const nestjs_1 = require("@mikro-orm/nestjs");
let PublicEmployeeModule = exports.PublicEmployeeModule = class PublicEmployeeModule {
};
exports.PublicEmployeeModule = PublicEmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            typeorm_1.TypeOrmModule.forFeature([internal_1.Employee]),
            nestjs_1.MikroOrmModule.forFeature([internal_1.Employee]),
        ],
        controllers: [
            public_employee_controller_1.PublicEmployeeController
        ],
        providers: [
            public_employee_service_1.PublicEmployeeService,
            ...handlers_1.QueryHandlers
        ],
        exports: []
    })
], PublicEmployeeModule);
//# sourceMappingURL=public-employee.module.js.map