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
exports.OrganizationTeamEmployee = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_team_employee_repository_1 = require("./repository/mikro-orm-organization-team-employee.repository");
let OrganizationTeamEmployee = exports.OrganizationTeamEmployee = class OrganizationTeamEmployee extends internal_1.TenantOrganizationBaseEntity {
    /**
     * enabled / disabled time tracking feature for team member
     */
    isTrackingEnabled;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * member's active task
     */
    activeTask;
    activeTaskId;
    /**
     * OrganizationTeam
     */
    organizationTeam;
    organizationTeamId;
    /**
     * Employee
     */
    employee;
    employeeId;
    /**
     * Role
     */
    role;
    roleId;
    order;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ type: Boolean, nullable: true, default: true }),
    __metadata("design:type", Boolean)
], OrganizationTeamEmployee.prototype, "isTrackingEnabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Task }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Task, (it) => it.organizationTeamEmployees, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], OrganizationTeamEmployee.prototype, "activeTask", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.activeTask),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ type: String, nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationTeamEmployee.prototype, "activeTaskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.OrganizationTeam }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.OrganizationTeam, (it) => it.members, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], OrganizationTeamEmployee.prototype, "organizationTeam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.organizationTeam),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], OrganizationTeamEmployee.prototype, "organizationTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (it) => it.teams, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], OrganizationTeamEmployee.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], OrganizationTeamEmployee.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Role }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Role, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], OrganizationTeamEmployee.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.role),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationTeamEmployee.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], OrganizationTeamEmployee.prototype, "order", void 0);
exports.OrganizationTeamEmployee = OrganizationTeamEmployee = __decorate([
    (0, entity_1.MultiORMEntity)('organization_team_employee', { mikroOrmRepository: () => mikro_orm_organization_team_employee_repository_1.MikroOrmOrganizationTeamEmployeeRepository })
], OrganizationTeamEmployee);
//# sourceMappingURL=organization-team-employee.entity.js.map