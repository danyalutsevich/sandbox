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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicEmployeeController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../../plugins/common/dist/index");
const dto_1 = require("./../../core/dto");
const queries_1 = require("./queries");
const public_employee_query_dto_1 = require("./dto/public-employee-query.dto");
const public_transform_interceptor_1 = require("./../public-transform.interceptor");
let PublicEmployeeController = exports.PublicEmployeeController = class PublicEmployeeController {
    queryBus;
    constructor(queryBus) {
        this.queryBus = queryBus;
    }
    /**
     * GET public employees in the specific organization
     *
     * @param params
     * @param options
     * @returns
     */
    async findPublicEmployeesByOrganization(conditions, options) {
        return await this.queryBus.execute(new queries_1.FindPublicEmployeesByOrganizationQuery(conditions, options.relations));
    }
    /**
     * GET public employee by profile link in the specific organization
     *
     * @param id
     * @param profile_link
     * @returns
     */
    async findPublicEmployeeByProfileLink(params, options) {
        return await this.queryBus.execute(new queries_1.FindOnePublicEmployeeQuery(params, options.relations));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find public information for all employees in the organization.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found employees in the organization'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Records not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }))),
    __param(1, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TenantOrganizationBaseDTO,
        public_employee_query_dto_1.PublicEmployeeQueryDTO]),
    __metadata("design:returntype", Promise)
], PublicEmployeeController.prototype, "findPublicEmployeesByOrganization", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find public information for one employee by profile link in the organization.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found employee in the organization'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('/:profile_link/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, public_employee_query_dto_1.PublicEmployeeQueryDTO]),
    __metadata("design:returntype", Promise)
], PublicEmployeeController.prototype, "findPublicEmployeeByProfileLink", null);
exports.PublicEmployeeController = PublicEmployeeController = __decorate([
    (0, index_1.Public)(),
    (0, common_1.UseInterceptors)(public_transform_interceptor_1.PublicTransformInterceptor),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.QueryBus])
], PublicEmployeeController);
//# sourceMappingURL=public-employee.controller.js.map