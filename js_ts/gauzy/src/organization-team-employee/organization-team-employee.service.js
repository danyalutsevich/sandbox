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
exports.OrganizationTeamEmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const organization_team_employee_entity_1 = require("./organization-team-employee.entity");
const task_service_1 = require("./../tasks/task.service");
const mikro_orm_organization_team_employee_repository_1 = require("./repository/mikro-orm-organization-team-employee.repository");
const type_orm_organization_team_employee_repository_1 = require("./repository/type-orm-organization-team-employee.repository");
let OrganizationTeamEmployeeService = exports.OrganizationTeamEmployeeService = class OrganizationTeamEmployeeService extends crud_1.TenantAwareCrudService {
    taskService;
    constructor(typeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository, taskService) {
        super(typeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository);
        this.taskService = taskService;
    }
    async updateOrganizationTeam(organizationTeamId, organizationId, employees, role, managerIds, memberIds) {
        const members = [...managerIds, ...memberIds];
        const tenantId = context_1.RequestContext.currentTenantId();
        const teamMembers = await this.typeOrmRepository.find({
            where: {
                tenantId,
                organizationId,
                organizationTeamId
            },
            relations: {
                role: true
            }
        });
        // 1. Remove employee members from the organization team
        const removedMemberIds = teamMembers.filter((employee) => !members.includes(employee.employeeId)).map((emp) => emp.id) || [];
        if ((0, index_2.isNotEmpty)(removedMemberIds)) {
            this.deleteMemberByIds(removedMemberIds);
        }
        // 2. Update role of employees that already exist in the system
        teamMembers
            .filter((employee) => members.includes(employee.employeeId))
            .forEach(async (member) => {
            const { id, employeeId } = member;
            await this.typeOrmRepository.update(id, {
                role: managerIds.includes(employeeId)
                    ? role
                    : member.roleId !== role.id // Check if current member's role is not same as role(params)
                        ? member.role // Keep old role as it is, to avoid setting null while updating team.(PUT /organization-team API)
                        : null // When the employeeId is not present in managerIds and the employee does not already have a MANAGER role.
            });
        });
        // 3. Add new team members
        const existingMembers = teamMembers.map((member) => member.employeeId);
        employees
            .filter((member) => !existingMembers.includes(member.id))
            .forEach(async (employee) => {
            const organizationTeamEmployee = new organization_team_employee_entity_1.OrganizationTeamEmployee();
            organizationTeamEmployee.organizationTeamId = organizationTeamId;
            organizationTeamEmployee.employeeId = employee.id;
            organizationTeamEmployee.tenantId = tenantId;
            organizationTeamEmployee.organizationId = organizationId;
            organizationTeamEmployee.role = managerIds.includes(employee.id) ? role : null;
            this.save(organizationTeamEmployee);
        });
    }
    /**
     * Delete team members by IDs
     *
     * @param memberIds
     */
    deleteMemberByIds(memberIds) {
        memberIds.forEach(async (memberId) => {
            await this.typeOrmRepository.delete(memberId);
        });
    }
    /**
     * Update organization team member entity
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(memberId, entity) {
        try {
            const { organizationId, organizationTeamId } = entity;
            if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                try {
                    await this.findOneByWhereOptions({
                        employeeId: context_1.RequestContext.currentEmployeeId(),
                        organizationId,
                        organizationTeamId,
                        role: {
                            name: index_1.RolesEnum.MANAGER
                        }
                    });
                    return await super.update({ id: memberId, organizationId, organizationTeamId }, entity);
                }
                catch (error) {
                    throw new common_1.ForbiddenException();
                }
            }
            return await super.update({ id: memberId, organizationId, organizationTeamId }, entity);
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * Update organization team member active task entity
     *
     * @param id
     * @param entity
     * @returns
     */
    async updateActiveTask(memberId, entity) {
        try {
            const { organizationId, organizationTeamId } = entity;
            const tenantId = context_1.RequestContext.currentTenantId();
            // Admin, Super Admin can update activeTaskId of any Employee
            if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                const member = await this.typeOrmRepository.findOneOrFail({
                    where: {
                        id: memberId,
                        tenantId,
                        organizationId,
                        organizationTeamId
                    }
                });
                return await this.typeOrmRepository.update(member.id, { activeTaskId: entity.activeTaskId });
            }
            else {
                const employeeId = context_1.RequestContext.currentEmployeeId();
                if (employeeId) {
                    let member;
                    try {
                        /** If employee has manager of the team, he/she should be able to update activeTaskId for team */
                        await this.findOneByWhereOptions({
                            organizationId,
                            organizationTeamId,
                            role: {
                                name: index_1.RolesEnum.MANAGER
                            }
                        });
                        member = await this.typeOrmRepository.findOneOrFail({
                            where: {
                                id: memberId,
                                organizationId,
                                tenantId,
                                organizationTeamId
                            }
                        });
                    }
                    catch (error) {
                        /** If employee has member of the team, he/she should be able to remove own self from team */
                        member = await this.typeOrmRepository.findOneOrFail({
                            where: {
                                employeeId,
                                organizationId,
                                tenantId,
                                organizationTeamId
                            }
                        });
                    }
                    return await this.typeOrmRepository.update({ id: member.id, organizationId, organizationTeamId }, { activeTaskId: entity.activeTaskId });
                }
                throw new common_1.ForbiddenException();
            }
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * Delete team member by memberId
     *
     * @param memberId
     * @param options
     * @returns
     */
    async deleteTeamMember(memberId, options) {
        try {
            const { organizationId, organizationTeamId } = options;
            const tenantId = context_1.RequestContext.currentTenantId();
            if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                const member = await this.typeOrmRepository.findOneOrFail({
                    where: {
                        id: memberId,
                        tenantId,
                        organizationId,
                        organizationTeamId
                    }
                });
                await this.taskService.unassignEmployeeFromTeamTasks(member.employeeId, organizationTeamId);
                return await this.typeOrmRepository.remove(member);
            }
            else {
                const employeeId = context_1.RequestContext.currentEmployeeId();
                if (employeeId) {
                    let member;
                    try {
                        /** If employee has manager of the team, he/she should be able to remove members from team */
                        await this.findOneByWhereOptions({
                            organizationId,
                            organizationTeamId,
                            role: {
                                name: index_1.RolesEnum.MANAGER
                            }
                        });
                        member = await this.typeOrmRepository.findOneOrFail({
                            where: {
                                id: memberId,
                                organizationId,
                                tenantId,
                                organizationTeamId
                            }
                        });
                    }
                    catch (error) {
                        /** If employee has member of the team, he/she should be able to remove own self from team */
                        member = await this.typeOrmRepository.findOneOrFail({
                            where: {
                                employeeId,
                                organizationId,
                                tenantId,
                                organizationTeamId
                            }
                        });
                    }
                    /** Unassigned employee all tasks before remove from team  */
                    await this.taskService.unassignEmployeeFromTeamTasks(member.employeeId, organizationTeamId);
                    return await this.typeOrmRepository.remove(member);
                }
                throw new common_1.ForbiddenException();
            }
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
};
exports.OrganizationTeamEmployeeService = OrganizationTeamEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_team_employee_entity_1.OrganizationTeamEmployee)),
    __metadata("design:paramtypes", [type_orm_organization_team_employee_repository_1.TypeOrmOrganizationTeamEmployeeRepository,
        mikro_orm_organization_team_employee_repository_1.MikroOrmOrganizationTeamEmployeeRepository,
        task_service_1.TaskService])
], OrganizationTeamEmployeeService);
//# sourceMappingURL=organization-team-employee.service.js.map