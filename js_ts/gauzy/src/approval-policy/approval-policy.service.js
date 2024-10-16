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
exports.ApprovalPolicyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const approval_policy_entity_1 = require("./approval-policy.entity");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const type_orm_approval_policy_repository_1 = require("./repository/type-orm-approval-policy.repository");
const mikro_orm_approval_policy_repository_1 = require("./repository/mikro-orm-approval-policy.repository");
let ApprovalPolicyService = exports.ApprovalPolicyService = class ApprovalPolicyService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmApprovalPolicyRepository, mikroOrmApprovalPolicyRepository) {
        super(typeOrmApprovalPolicyRepository, mikroOrmApprovalPolicyRepository);
    }
    /**
     * GET approval policies by pagination
     *
     * @param options
     * @returns
     */
    pagination(options) {
        if ('where' in options) {
            const { where } = options;
            if ('name' in where) {
                options.where.name = (0, typeorm_2.Like)(`%${where.name}%`);
            }
        }
        return super.paginate(options);
    }
    /*
     * Get all approval policies
     */
    async findAllApprovalPolicies(options) {
        return await super.findAll({
            ...(options && options.where
                ? {
                    where: options.where
                }
                : {}),
            ...(options && options.relations
                ? {
                    relations: options.relations
                }
                : {})
        });
    }
    /*
     * Get all request approval policies
     */
    async findApprovalPoliciesForRequestApproval({ findInput, relations }) {
        const query = {
            where: {
                approvalType: (0, typeorm_2.Not)((0, typeorm_2.In)([index_1.ApprovalPolicyTypesStringEnum.EQUIPMENT_SHARING, index_1.ApprovalPolicyTypesStringEnum.TIME_OFF])),
                ...findInput
            },
            ...(relations
                ? {
                    relations: relations
                }
                : {})
        };
        return await super.findAll(query);
    }
    /*
     * Create approval policy
     */
    async create(entity) {
        try {
            const approvalPolicy = new approval_policy_entity_1.ApprovalPolicy();
            approvalPolicy.name = entity.name;
            approvalPolicy.organizationId = entity.organizationId;
            approvalPolicy.tenantId = context_1.RequestContext.currentTenantId();
            approvalPolicy.description = entity.description;
            approvalPolicy.approvalType = entity.name ? entity.name.replace(/\s+/g, '_').toUpperCase() : null;
            return await this.save(approvalPolicy);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /*
     * Update approval policy
     */
    async update(id, entity) {
        try {
            const approvalPolicy = await this.findOneByIdString(id);
            approvalPolicy.name = entity.name;
            approvalPolicy.organizationId = entity.organizationId;
            approvalPolicy.tenantId = context_1.RequestContext.currentTenantId();
            approvalPolicy.description = entity.description;
            approvalPolicy.approvalType = entity.name ? entity.name.replace(/\s+/g, '_').toUpperCase() : null;
            return await this.save(approvalPolicy);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.ApprovalPolicyService = ApprovalPolicyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(approval_policy_entity_1.ApprovalPolicy)),
    __metadata("design:paramtypes", [type_orm_approval_policy_repository_1.TypeOrmApprovalPolicyRepository,
        mikro_orm_approval_policy_repository_1.MikroOrmApprovalPolicyRepository])
], ApprovalPolicyService);
//# sourceMappingURL=approval-policy.service.js.map