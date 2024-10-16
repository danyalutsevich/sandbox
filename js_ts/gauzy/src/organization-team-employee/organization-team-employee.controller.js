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
exports.OrganizationTeamEmployeeController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const index_1 = require("../../plugins/contracts/dist/index");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const organization_team_employee_service_1 = require("./organization-team-employee.service");
const dto_1 = require("./dto");
let OrganizationTeamEmployeeController = exports.OrganizationTeamEmployeeController = class OrganizationTeamEmployeeController {
    organizationTeamEmployeeService;
    constructor(organizationTeamEmployeeService) {
        this.organizationTeamEmployeeService = organizationTeamEmployeeService;
    }
    /**
     * Update team member by memberId
     *
     * @param memberId
     * @param options
     * @returns
     */
    async update(memberId, entity) {
        return await this.organizationTeamEmployeeService.update(memberId, entity);
    }
    /**
     * Update organization team member active task entity
     *
     * @param id
     * @param entity
     * @returns
     */
    async updateActiveTask(memberId, entity) {
        return await this.organizationTeamEmployeeService.updateActiveTask(memberId, entity);
    }
    /**
     * Delete team member by memberId
     *
     * @param memberId
     * @param options
     * @returns
     */
    async delete(memberId, options) {
        return await this.organizationTeamEmployeeService.deleteTeamMember(memberId, options);
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TEAM_EDIT),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateTeamMemberDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamEmployeeController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TEAM_EDIT_ACTIVE_TASK),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    (0, common_1.Put)(':id/active-task'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateOrganizationTeamActiveTaskDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamEmployeeController.prototype, "updateActiveTask", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete organization team member record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TEAM_DELETE),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.DeleteTeamMemberQueryDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTeamEmployeeController.prototype, "delete", null);
exports.OrganizationTeamEmployeeController = OrganizationTeamEmployeeController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationTeamEmployee'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [organization_team_employee_service_1.OrganizationTeamEmployeeService])
], OrganizationTeamEmployeeController);
//# sourceMappingURL=organization-team-employee.controller.js.map