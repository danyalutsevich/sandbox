"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindOnePublicEmployeeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const find_one_public_employee_query_1 = require("../find-one-public-employee.query");
const public_employee_service_1 = require("./../../public-employee.service");
let FindOnePublicEmployeeHandler = exports.FindOnePublicEmployeeHandler = class FindOnePublicEmployeeHandler {
    publicEmployeeService;
    constructor(publicEmployeeService) {
        this.publicEmployeeService = publicEmployeeService;
    }
    async execute(query) {
        const { params, relations = [] } = query;
        return await this.publicEmployeeService.findOneByConditions(params, relations);
    }
};
exports.FindOnePublicEmployeeHandler = FindOnePublicEmployeeHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_one_public_employee_query_1.FindOnePublicEmployeeQuery),
    __metadata("design:paramtypes", [public_employee_service_1.PublicEmployeeService])
], FindOnePublicEmployeeHandler);
//# sourceMappingURL=find-one-public-employee.handler.js.map