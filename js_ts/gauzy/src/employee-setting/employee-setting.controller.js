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
exports.EmployeeSettingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const employee_setting_service_1 = require("./employee-setting.service");
const employee_setting_entity_1 = require("./employee-setting.entity");
const crud_1 = require("./../core/crud");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let EmployeeSettingController = exports.EmployeeSettingController = class EmployeeSettingController extends crud_1.CrudController {
    employeeSettingService;
    constructor(employeeSettingService) {
        super(employeeSettingService);
        this.employeeSettingService = employeeSettingService;
    }
    /**
     * GET all employee settings
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.employeeSettingService.findAll({
            where: findInput,
            relations
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all employee settings.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found employee settings',
        type: employee_setting_entity_1.EmployeeSetting
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeSettingController.prototype, "findAll", null);
exports.EmployeeSettingController = EmployeeSettingController = __decorate([
    (0, swagger_1.ApiTags)('EmployeeSetting'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [employee_setting_service_1.EmployeeSettingService])
], EmployeeSettingController);
//# sourceMappingURL=employee-setting.controller.js.map