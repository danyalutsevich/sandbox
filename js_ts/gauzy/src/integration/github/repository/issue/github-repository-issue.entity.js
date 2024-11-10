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
exports.OrganizationGithubRepositoryIssue = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
;
const internal_1 = require("../../../../core/entities/internal");
const entity_1 = require("../../../../core/decorators/entity");
const github_repository_entity_1 = require("./../github-repository.entity");
const mikro_orm_github_repository_issue_repository_1 = require("./repository/mikro-orm-github-repository-issue.repository");
let OrganizationGithubRepositoryIssue = exports.OrganizationGithubRepositoryIssue = class OrganizationGithubRepositoryIssue extends internal_1.TenantOrganizationBaseEntity {
    issueId;
    issueNumber;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Organization Github Repository
     */
    repository;
    repositoryId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], OrganizationGithubRepositoryIssue.prototype, "issueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], OrganizationGithubRepositoryIssue.prototype, "issueNumber", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => github_repository_entity_1.OrganizationGithubRepository, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], OrganizationGithubRepositoryIssue.prototype, "repository", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.repository),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], OrganizationGithubRepositoryIssue.prototype, "repositoryId", void 0);
exports.OrganizationGithubRepositoryIssue = OrganizationGithubRepositoryIssue = __decorate([
    (0, entity_1.MultiORMEntity)('organization_github_repository_issue', { mikroOrmRepository: () => mikro_orm_github_repository_issue_repository_1.MikroOrmOrganizationGithubRepositoryIssueRepository })
], OrganizationGithubRepositoryIssue);
//# sourceMappingURL=github-repository-issue.entity.js.map