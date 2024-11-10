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
exports.OrganizationGithubRepository = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../../../core/entities/internal");
const entity_1 = require("../../../core/decorators/entity");
const mikro_orm_organization_github_repository_repository_1 = require("./repository/mikro-orm-organization-github-repository.repository");
let OrganizationGithubRepository = exports.OrganizationGithubRepository = class OrganizationGithubRepository extends internal_1.TenantOrganizationBaseEntity {
    repositoryId;
    name;
    fullName;
    owner;
    issuesCount;
    hasSyncEnabled;
    private;
    status;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /** What integration tenant sync to */
    integration;
    integrationId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /** Repository Sync Organization Projects */
    projects;
    /** Repository Sync Organization Projects */
    issues;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], OrganizationGithubRepository.prototype, "repositoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationGithubRepository.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationGithubRepository.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationGithubRepository.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], OrganizationGithubRepository.prototype, "issuesCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: true }),
    __metadata("design:type", Boolean)
], OrganizationGithubRepository.prototype, "hasSyncEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], OrganizationGithubRepository.prototype, "private", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], OrganizationGithubRepository.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.IntegrationTenant }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.IntegrationTenant, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrganizationGithubRepository.prototype, "integration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.integration),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationGithubRepository.prototype, "integrationId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationProject, (it) => it.repository, {
        cascade: true
    }),
    __metadata("design:type", Array)
], OrganizationGithubRepository.prototype, "projects", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationGithubRepositoryIssue, (it) => it.repository, {
        cascade: true
    }),
    __metadata("design:type", Array)
], OrganizationGithubRepository.prototype, "issues", void 0);
exports.OrganizationGithubRepository = OrganizationGithubRepository = __decorate([
    (0, entity_1.MultiORMEntity)('organization_github_repository', { mikroOrmRepository: () => mikro_orm_organization_github_repository_repository_1.MikroOrmOrganizationGithubRepositoryRepository })
], OrganizationGithubRepository);
//# sourceMappingURL=github-repository.entity.js.map