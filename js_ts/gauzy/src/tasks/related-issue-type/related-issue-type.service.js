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
exports.TaskRelatedIssueTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const index_1 = require("../../../plugins/config/dist/index");
const task_status_priority_size_service_1 = require("../task-status-priority-size.service");
const utils_1 = require("../../core/utils");
const context_1 = require("../../core/context");
const related_issue_type_entity_1 = require("./related-issue-type.entity");
const type_orm_related_issue_type_repository_1 = require("./repository/type-orm-related-issue-type.repository");
const mikro_orm_related_issue_type_repository_1 = require("./repository/mikro-orm-related-issue-type.repository");
let TaskRelatedIssueTypeService = exports.TaskRelatedIssueTypeService = class TaskRelatedIssueTypeService extends task_status_priority_size_service_1.TaskStatusPrioritySizeService {
    typeOrmTaskRelatedIssueTypeRepository;
    mikroOrmTaskRelatedIssueTypeRepository;
    knexConnection;
    constructor(typeOrmTaskRelatedIssueTypeRepository, mikroOrmTaskRelatedIssueTypeRepository, knexConnection) {
        super(typeOrmTaskRelatedIssueTypeRepository, mikroOrmTaskRelatedIssueTypeRepository, knexConnection);
        this.typeOrmTaskRelatedIssueTypeRepository = typeOrmTaskRelatedIssueTypeRepository;
        this.mikroOrmTaskRelatedIssueTypeRepository = mikroOrmTaskRelatedIssueTypeRepository;
        this.knexConnection = knexConnection;
    }
    /**
     * GET statuses by filters
     * If parameters not match, retrieve global statuses
     *
     * @param params
     * @returns
     */
    async fetchAll(params) {
        try {
            if (this.ormType == utils_1.MultiORMEnum.TypeORM && (0, index_1.isPostgres)()) {
                return await super.fetchAllByKnex(params);
            }
            else {
                return await super.fetchAll(params);
            }
        }
        catch (error) {
            console.log('Failed to retrieve related issue types for tasks. Please ensure that the provided parameters are valid and complete.', error);
            throw new common_1.BadRequestException('Failed to retrieve related issue types for tasks. Please ensure that the provided parameters are valid and complete.', error);
        }
    }
    /**
     * Few RelatedIssueTypes can't be removed/delete because they are global
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await super.delete(id, {
            where: {
                isSystem: false
            },
        });
    }
    /**
     * Create bulk statuses for specific organization
     *
     * @param organization
     */
    async bulkCreateOrganizationRelatedIssueTypes(organization) {
        try {
            const statuses = [];
            const tenantId = context_1.RequestContext.currentTenantId();
            const { items = [] } = await super.fetchAll({ tenantId });
            for (const item of items) {
                const { tenantId, name, value, description, icon, color } = item;
                const status = new related_issue_type_entity_1.TaskRelatedIssueType({
                    tenantId,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    organization,
                    isSystem: false,
                });
                statuses.push(status);
            }
            return await this.typeOrmRepository.save(statuses);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Create bulk statuses for specific organization entity
     *
     * @param entity
     * @returns
     */
    async createBulkRelatedIssueTypesByEntity(entity) {
        try {
            const { organizationId } = entity;
            const tenantId = context_1.RequestContext.currentTenantId();
            const statuses = [];
            const { items = [] } = await super.fetchAll({
                tenantId,
                organizationId
            });
            for (const item of items) {
                const { name, value, description, icon, color } = item;
                const status = await this.create({
                    ...entity,
                    name,
                    value,
                    description,
                    icon,
                    color,
                    isSystem: false,
                });
                statuses.push(status);
            }
            return statuses;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TaskRelatedIssueTypeService = TaskRelatedIssueTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(related_issue_type_entity_1.TaskRelatedIssueType)),
    __param(2, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [type_orm_related_issue_type_repository_1.TypeOrmTaskRelatedIssueTypeRepository,
        mikro_orm_related_issue_type_repository_1.MikroOrmTaskRelatedIssueTypeRepository, Function])
], TaskRelatedIssueTypeService);
//# sourceMappingURL=related-issue-type.service.js.map