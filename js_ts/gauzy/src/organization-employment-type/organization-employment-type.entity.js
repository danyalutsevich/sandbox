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
exports.OrganizationEmploymentType = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_employment_type_repository_1 = require("./repository/mikro-orm-organization-employment-type.repository");
let OrganizationEmploymentType = exports.OrganizationEmploymentType = class OrganizationEmploymentType extends internal_1.TenantOrganizationBaseEntity {
    name;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
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
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationEmploymentType.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Tag, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.organizationEmploymentTypes, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_organization_employment_type',
        joinColumn: 'organizationEmploymentTypeId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_organization_employment_type'
    }),
    __metadata("design:type", Array)
], OrganizationEmploymentType.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Employee, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (employee) => employee.organizationEmploymentTypes, {
        cascade: ['update'],
        owner: true,
        pivotTable: 'organization_employment_type_employee',
        joinColumn: 'organizationEmploymentTypeId',
        inverseJoinColumn: 'employeeId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'organization_employment_type_employee'
    }),
    __metadata("design:type", Array)
], OrganizationEmploymentType.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.Candidate, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Candidate, (candidate) => candidate.organizationEmploymentTypes, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'candidate_employment_type',
        joinColumn: 'organizationEmploymentTypeId',
        inverseJoinColumn: 'candidateId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'candidate_employment_type'
    }),
    __metadata("design:type", Array)
], OrganizationEmploymentType.prototype, "candidates", void 0);
exports.OrganizationEmploymentType = OrganizationEmploymentType = __decorate([
    (0, entity_1.MultiORMEntity)('organization_employment_type', { mikroOrmRepository: () => mikro_orm_organization_employment_type_repository_1.MikroOrmOrganizationEmploymentTypeRepository })
], OrganizationEmploymentType);
//# sourceMappingURL=organization-employment-type.entity.js.map