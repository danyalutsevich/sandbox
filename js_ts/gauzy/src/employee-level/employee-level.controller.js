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
exports.EmployeeLevelController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const employee_level_entity_1 = require("./employee-level.entity");
const employee_level_service_1 = require("./employee-level.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
let EmployeeLevelController = exports.EmployeeLevelController = class EmployeeLevelController extends crud_1.CrudController {
    employeeLevelService;
    constructor(employeeLevelService) {
        super(employeeLevelService);
        this.employeeLevelService = employeeLevelService;
    }
    async findAll(data) {
        const { relations, findInput } = data;
        return await this.employeeLevelService.findAll({
            where: {
                ...findInput
            },
            relations
        });
    }
    async update(id, entity, ...options) {
        try {
            return this.employeeLevelService.create({
                id,
                ...entity
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeLevelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_level_entity_1.EmployeeLevel, Object]),
    __metadata("design:returntype", Promise)
], EmployeeLevelController.prototype, "update", null);
exports.EmployeeLevelController = EmployeeLevelController = __decorate([
    (0, swagger_1.ApiTags)('EmployeeLevel'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [employee_level_service_1.EmployeeLevelService])
], EmployeeLevelController);
//# sourceMappingURL=employee-level.controller.js.map