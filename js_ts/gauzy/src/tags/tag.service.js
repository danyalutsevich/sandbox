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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/common/dist/index");
const index_2 = require("../../plugins/contracts/dist/index");
const index_3 = require("../../plugins/config/dist/index");
const context_1 = require("../core/context");
const crud_1 = require("../core/crud");
const file_storage_1 = require("./../core/file-storage");
const database_helper_1 = require("./../database/database.helper");
const mikro_orm_tag_repository_1 = require("./repository/mikro-orm-tag.repository");
const type_orm_tag_repository_1 = require("./repository/type-orm-tag.repository");
let TagService = exports.TagService = class TagService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmTagRepository, mikroOrmTagRepository) {
        super(typeOrmTagRepository, mikroOrmTagRepository);
    }
    /**
     * GET tags by tenant or organization level
     *
     * @param input
     * @param relations
     * @returns
     */
    async findTagsByLevel(input, relations = []) {
        const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
        /**
         * Defines a special criteria to find specific relations.
         */
        query.setFindOptions({
            ...(relations ? { relations: relations } : {})
        });
        /**
         * Additionally you can add parameters used in where expression.
         */
        query.where((qb) => {
            this.getFilterTagQuery(qb, input);
        });
        const [items, total] = await query.getManyAndCount();
        return { items, total };
    }
    /**
     * GET tenant/organization level tags
     *
     * @param input
     * @param relations
     * @returns
     */
    async findTags(input, relations = []) {
        try {
            // Get the list of custom fields for the specified entity, defaulting to an empty array if none are found
            const customFields = (0, index_3.getConfig)().customFields?.['Tag'] ?? [];
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            // Define special criteria to find specific relations
            query.setFindOptions({
                ...(relations ? { relations: relations } : {})
            });
            // Left join all relational tables with tag table
            query.leftJoin(`${query.alias}.candidates`, 'candidate');
            query.leftJoin(`${query.alias}.employees`, 'employee');
            query.leftJoin(`${query.alias}.employeeLevels`, 'employeeLevel');
            query.leftJoin(`${query.alias}.equipments`, 'equipment');
            query.leftJoin(`${query.alias}.eventTypes`, 'eventType');
            query.leftJoin(`${query.alias}.expenses`, 'expense');
            query.leftJoin(`${query.alias}.incomes`, 'income');
            query.leftJoin(`${query.alias}.integrations`, 'integration');
            query.leftJoin(`${query.alias}.invoices`, 'invoice');
            query.leftJoin(`${query.alias}.merchants`, 'merchant');
            query.leftJoin(`${query.alias}.organizations`, 'organization');
            query.leftJoin(`${query.alias}.organizationContacts`, 'organizationContact');
            query.leftJoin(`${query.alias}.organizationDepartments`, 'organizationDepartment');
            query.leftJoin(`${query.alias}.organizationEmploymentTypes`, 'organizationEmploymentType');
            query.leftJoin(`${query.alias}.expenseCategories`, 'expenseCategory');
            query.leftJoin(`${query.alias}.organizationPositions`, 'organizationPosition');
            query.leftJoin(`${query.alias}.organizationProjects`, 'organizationProject');
            query.leftJoin(`${query.alias}.organizationTeams`, 'organizationTeam');
            query.leftJoin(`${query.alias}.organizationVendors`, 'organizationVendor');
            query.leftJoin(`${query.alias}.payments`, 'payment');
            query.leftJoin(`${query.alias}.products`, 'product');
            query.leftJoin(`${query.alias}.requestApprovals`, 'requestApproval');
            query.leftJoin(`${query.alias}.tasks`, 'task');
            query.leftJoin(`${query.alias}.users`, 'user');
            query.leftJoin(`${query.alias}.warehouses`, 'warehouse');
            // Custom Entity Fields: Add left joins for each custom field if they exist
            if (customFields.length > 0) {
                customFields.forEach((field) => {
                    if (field.relationType === 'many-to-many') {
                        query.leftJoin(`${query.alias}.customFields.${field.propertyPath}`, field.propertyPath);
                    }
                });
            }
            // Add new selection to the SELECT query
            query.select(`${query.alias}.*`);
            // Add the select statement for counting, and cast it to integer
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("candidate"."id") AS INTEGER)`), `candidate_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("employee"."id") AS INTEGER)`), `employee_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("employeeLevel"."id") AS INTEGER)`), `employee_level_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("equipment"."id") AS INTEGER)`), `equipment_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("eventType"."id") AS INTEGER)`), `event_type_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("expense"."id") AS INTEGER)`), `expense_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("income"."id") AS INTEGER)`), `income_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("integration"."id") AS INTEGER)`), `integration_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("invoice"."id") AS INTEGER)`), `invoice_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("merchant"."id") AS INTEGER)`), `merchant_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("organization"."id") AS INTEGER)`), `organization_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("organizationContact"."id") AS INTEGER)`), `organization_contact_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("organizationDepartment"."id") AS INTEGER)`), `organization_department_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("organizationEmploymentType"."id") AS INTEGER)`), `organization_employment_type_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("expenseCategory"."id") AS INTEGER)`), `expense_category_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("organizationPosition"."id") AS INTEGER)`), `organization_position_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("organizationProject"."id") AS INTEGER)`), `organization_project_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("organizationTeam"."id") AS INTEGER)`), `organization_team_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("organizationVendor"."id") AS INTEGER)`), `organization_vendor_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("payment"."id") AS INTEGER)`), `payment_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("product"."id") AS INTEGER)`), `product_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("requestApproval"."id") AS INTEGER)`), `request_approval_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("task"."id") AS INTEGER)`), `task_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("user"."id") AS INTEGER)`), `user_counter`);
            query.addSelect((0, database_helper_1.prepareSQLQuery)(`CAST(COUNT("warehouse"."id") AS INTEGER)`), `warehouse_counter`);
            // Custom Entity Fields: Add select statements for each custom field if they exist
            if (customFields.length > 0) {
                customFields.forEach((field) => {
                    if (field.relationType === 'many-to-many') {
                        const selectionAliasName = `${field.propertyPath}_counter`;
                        query.addSelect(`CAST(COUNT(${field.propertyPath}.id) AS INTEGER)`, selectionAliasName);
                    }
                });
            }
            // Adds GROUP BY condition in the query builder.
            query.addGroupBy(`${query.alias}.id`);
            // Additionally you can add parameters used in where expression.
            query.where((qb) => {
                this.getFilterTagQuery(qb, input);
            });
            let items = await query.getRawMany();
            const store = new file_storage_1.FileStorage().setProvider(index_2.FileStorageProviderEnum.LOCAL);
            items = items.map((item) => {
                if (item.icon)
                    item.fullIconUrl = store.getProviderInstance().url(item.icon);
                return item;
            });
            const total = items.length;
            return { items, total };
        }
        catch (error) {
            console.log('Error while getting tags', error);
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Get filter query for tags
     *
     * @param query
     * @param request
     * @returns
     */
    getFilterTagQuery(query, request) {
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const { organizationId, organizationTeamId, name, color, description } = request;
        const likeOperator = (0, index_3.isPostgres)() ? 'ILIKE' : 'LIKE';
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.where([
                {
                    organizationId: (0, typeorm_1.IsNull)()
                },
                {
                    organizationId
                }
            ]);
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            if ((0, index_1.isNotEmpty)(organizationTeamId)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationTeamId" = :organizationTeamId`), {
                    organizationTeamId
                });
            }
        }));
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."isSystem" = :isSystem`), {
            isSystem: false
        });
        /**
         * Additionally you can add parameters used in where expression.
         */
        if ((0, index_1.isNotEmpty)(name)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."name" ${likeOperator} :name`), {
                name: `%${name}%`
            });
        }
        if ((0, index_1.isNotEmpty)(color)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."color" ${likeOperator} :color`), {
                color: `%${color}%`
            });
        }
        if ((0, index_1.isNotEmpty)(description)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."description" ${likeOperator} :description`), {
                description: `%${description}%`
            });
        }
        return query;
    }
};
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_tag_repository_1.TypeOrmTagRepository, mikro_orm_tag_repository_1.MikroOrmTagRepository])
], TagService);
//# sourceMappingURL=tag.service.js.map