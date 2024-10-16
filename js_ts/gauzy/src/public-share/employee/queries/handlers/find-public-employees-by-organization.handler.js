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
exports.FindPublicEmployeesByOrganizationHandler = void 0;
;
const cqrs_1 = require("@nestjs/cqrs");
const find_public_employees_by_organization_query_1 = require("../find-public-employees-by-organization.query");
const public_employee_service_1 = require("../../public-employee.service");
let FindPublicEmployeesByOrganizationHandler = exports.FindPublicEmployeesByOrganizationHandler = class FindPublicEmployeesByOrganizationHandler {
    publicEmployeeService;
    constructor(publicEmployeeService) {
        this.publicEmployeeService = publicEmployeeService;
    }
    async execute(query) {
        const { options, relations = [] } = query;
        return await this.publicEmployeeService.findPublicEmployeeByOrganization(options, relations);
    }
};
exports.FindPublicEmployeesByOrganizationHandler = FindPublicEmployeesByOrganizationHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_public_employees_by_organization_query_1.FindPublicEmployeesByOrganizationQuery),
    __metadata("design:paramtypes", [public_employee_service_1.PublicEmployeeService])
], FindPublicEmployeesByOrganizationHandler);
//# sourceMappingURL=find-public-employees-by-organization.handler.js.map