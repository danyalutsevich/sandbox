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
exports.OrganizationDepartment = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_department_repository_1 = require("./repository/mikro-orm-organization-department.repository");
let OrganizationDepartment = exports.OrganizationDepartment = class OrganizationDepartment extends internal_1.TenantOrganizationBaseEntity {
    name;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Tag
     */
    tags;
    /**
     * Employee
     */
    members;
    /**
     * Candidate
     */
    candidates;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationDepartment.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Tag, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.organizationDepartments, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_organization_department',
        joinColumn: 'organizationDepartmentId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_organization_department'
    }),
    __metadata("design:type", Array)
], OrganizationDepartment.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (employee) => employee.organizationDepartments, {
        cascade: ['update'],
        owner: true,
        pivotTable: 'organization_department_employee',
        joinColumn: 'organizationDepartmentId',
        inverseJoinColumn: 'employeeId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'organization_department_employee'
    }),
    __metadata("design:type", Array)
], OrganizationDepartment.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Candidate, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Candidate, (candidate) => candidate.organizationDepartments, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'candidate_department',
        joinColumn: 'organizationDepartmentId',
        inverseJoinColumn: 'candidateId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'candidate_department'
    }),
    __metadata("design:type", Array)
], OrganizationDepartment.prototype, "candidates", void 0);
exports.OrganizationDepartment = OrganizationDepartment = __decorate([
    (0, entity_1.MultiORMEntity)('organization_department', { mikroOrmRepository: () => mikro_orm_organization_department_repository_1.MikroOrmOrganizationDepartmentRepository })
], OrganizationDepartment);
//# sourceMappingURL=organization-department.entity.js.map