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
exports.RequestApprovalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const database_helper_1 = require("./../database/database.helper");
const context_1 = require("../core/context");
const internal_1 = require("./../core/entities/internal");
const crud_1 = require("./../core/crud");
const request_approval_entity_1 = require("./request-approval.entity");
const mikro_orm_request_approval_repository_1 = require("./repository/mikro-orm-request-approval.repository");
const type_orm_request_approval_repository_1 = require("./repository/type-orm-request-approval.repository");
const type_orm_employee_repository_1 = require("../employee/repository/type-orm-employee.repository");
const mikro_orm_employee_repository_1 = require("../employee/repository/mikro-orm-employee.repository");
const type_orm_organization_team_repository_1 = require("../organization-team/repository/type-orm-organization-team.repository");
const mikro_orm_organization_team_repository_1 = require("../organization-team/repository/mikro-orm-organization-team.repository");
let RequestApprovalService = exports.RequestApprovalService = class RequestApprovalService extends crud_1.TenantAwareCrudService {
    typeOrmEmployeeRepository;
    typeOrmOrganizationTeamRepository;
    constructor(typeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository, typeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository) {
        super(typeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository);
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.typeOrmOrganizationTeamRepository = typeOrmOrganizationTeamRepository;
    }
    async findAllRequestApprovals(filter, findInput) {
        const query = this.typeOrmRepository.createQueryBuilder('request_approval');
        query.leftJoinAndSelect(`${query.alias}.approvalPolicy`, 'approvalPolicy');
        const timeOffRequestCheckIdQuery = `${(0, index_2.isSqlite)() || (0, index_2.isBetterSqlite3)()
            ? '"time_off_request"."id" = "request_approval"."requestId"'
            : (0, index_2.isPostgres)()
                ? '"time_off_request"."id"::"varchar" = "request_approval"."requestId"'
                : (0, index_2.isMySQL)()
                    ? (0, database_helper_1.prepareSQLQuery)(`CAST("time_off_request"."id" AS CHAR) COLLATE utf8mb4_unicode_ci = "request_approval"."requestId" COLLATE utf8mb4_unicode_ci`)
                    : '"time_off_request"."id" = "request_approval"."requestId"'}`;
        const equipmentSharingCheckIdQuery = `${(0, index_2.isSqlite)() || (0, index_2.isBetterSqlite3)()
            ? '"equipment_sharing"."id" = "request_approval"."requestId"'
            : (0, index_2.isPostgres)()
                ? '"equipment_sharing"."id"::"varchar" = "request_approval"."requestId"'
                : (0, index_2.isMySQL)()
                    ? (0, database_helper_1.prepareSQLQuery)(`CAST(CONVERT("time_off_request"."id" USING utf8mb4) AS CHAR) = CAST(CONVERT("request_approval"."requestId" USING utf8mb4) AS CHAR)`)
                    : '"equipment_sharing"."id" = "request_approval"."requestId"'}`;
        query.leftJoinAndSelect('time_off_request', 'time_off_request', timeOffRequestCheckIdQuery);
        query.leftJoinAndSelect('equipment_sharing', 'equipment_sharing', equipmentSharingCheckIdQuery);
        const relations = filter.relations;
        if (relations && relations.length > 0) {
            query.setFindOptions({ relations });
        }
        const tenantId = context_1.RequestContext.currentTenantId();
        const { organizationId } = findInput;
        const [items, total] = await query
            .where(new typeorm_2.Brackets((sqb) => {
            sqb.where((0, database_helper_1.prepareSQLQuery)('approvalPolicy.organizationId =:organizationId'), {
                organizationId
            }).andWhere((0, database_helper_1.prepareSQLQuery)('approvalPolicy.tenantId =:tenantId'), {
                tenantId
            });
        }))
            .orWhere(new typeorm_2.Brackets((sqb) => {
            sqb.where((0, database_helper_1.prepareSQLQuery)('time_off_request.organizationId =:organizationId'), {
                organizationId
            }).andWhere((0, database_helper_1.prepareSQLQuery)('time_off_request.tenantId =:tenantId'), {
                tenantId
            });
        }))
            .orWhere(new typeorm_2.Brackets((sqb) => {
            sqb.where((0, database_helper_1.prepareSQLQuery)('equipment_sharing.organizationId =:organizationId'), {
                organizationId
            }).andWhere((0, database_helper_1.prepareSQLQuery)('equipment_sharing.tenantId =:tenantId'), {
                tenantId
            });
        }))
            .getManyAndCount();
        return { items, total };
    }
    async findRequestApprovalsByEmployeeId(id, relations, findInput) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const currentUser = context_1.RequestContext.currentUser();
        const { organizationId } = findInput;
        const result = await this.typeOrmRepository.find({
            where: {
                createdBy: currentUser.id,
                organizationId,
                tenantId
            }
        });
        let requestApproval = [];
        const [employee] = await this.typeOrmEmployeeRepository.find({
            where: {
                id
            },
            relations
        });
        if (employee && employee.requestApprovals && employee.requestApprovals.length > 0) {
            requestApproval = [...requestApproval, ...employee.requestApprovals];
        }
        for (const request of requestApproval) {
            const approval = await this.typeOrmRepository.findOne({
                where: {
                    id: request.requestApprovalId
                },
                relations: {
                    approvalPolicy: true,
                    employeeApprovals: true,
                    teamApprovals: true,
                    tags: true
                }
            });
            result.push(approval);
        }
        return { items: result, total: result.length };
    }
    async createRequestApproval(entity) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const requestApproval = new request_approval_entity_1.RequestApproval();
        requestApproval.status = index_1.RequestApprovalStatusTypesEnum.REQUESTED;
        requestApproval.approvalPolicyId = entity.approvalPolicyId;
        requestApproval.createdBy = context_1.RequestContext.currentUser().id;
        requestApproval.createdByName = context_1.RequestContext.currentUser().name;
        requestApproval.name = entity.name;
        requestApproval.min_count = entity.min_count;
        requestApproval.tags = entity.tags;
        requestApproval.organizationId = entity.organizationId;
        requestApproval.tenantId = tenantId;
        if (entity.employeeApprovals) {
            const employees = await this.typeOrmEmployeeRepository.find({
                where: {
                    id: (0, typeorm_2.In)(entity.employeeApprovals)
                }
            });
            const requestApprovalEmployees = [];
            employees.forEach((employee) => {
                const raEmployees = new internal_1.RequestApprovalEmployee();
                raEmployees.employeeId = employee.id;
                raEmployees.organizationId = entity.organizationId;
                raEmployees.tenantId = tenantId;
                raEmployees.status = index_1.RequestApprovalStatusTypesEnum.REQUESTED;
                requestApprovalEmployees.push(raEmployees);
            });
            requestApproval.employeeApprovals = requestApprovalEmployees;
        }
        if (entity.teams) {
            const teams = await this.typeOrmOrganizationTeamRepository.find({
                where: {
                    id: (0, typeorm_2.In)(entity.teams)
                }
            });
            const requestApprovalTeams = [];
            teams.forEach((team) => {
                const raTeam = new internal_1.RequestApprovalTeam();
                raTeam.teamId = team.id;
                raTeam.team = team;
                raTeam.status = index_1.RequestApprovalStatusTypesEnum.REQUESTED;
                raTeam.organizationId = entity.organizationId;
                raTeam.tenantId = tenantId;
                requestApprovalTeams.push(raTeam);
            });
            requestApproval.teamApprovals = requestApprovalTeams;
        }
        return this.typeOrmRepository.save(requestApproval);
    }
    async updateRequestApproval(id, entity) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const requestApproval = await this.typeOrmRepository.findOneBy({
            id
        });
        requestApproval.name = entity.name;
        requestApproval.status = index_1.RequestApprovalStatusTypesEnum.REQUESTED;
        requestApproval.approvalPolicyId = entity.approvalPolicyId;
        requestApproval.min_count = entity.min_count;
        requestApproval.tags = entity.tags;
        requestApproval.organizationId = entity.organizationId;
        requestApproval.tenantId = tenantId;
        await this.typeOrmRepository
            .createQueryBuilder()
            .delete()
            .from(internal_1.RequestApprovalEmployee)
            .where((0, database_helper_1.prepareSQLQuery)('requestApprovalId = :id'), { id: id })
            .execute();
        await this.typeOrmRepository
            .createQueryBuilder()
            .delete()
            .from(internal_1.RequestApprovalTeam)
            .where((0, database_helper_1.prepareSQLQuery)('requestApprovalId = :id'), { id: id })
            .execute();
        if (entity.employeeApprovals) {
            const employees = await this.typeOrmEmployeeRepository.find({
                where: {
                    id: (0, typeorm_2.In)(entity.employeeApprovals)
                }
            });
            const requestApprovalEmployees = [];
            employees.forEach((employee) => {
                const raEmployees = new internal_1.RequestApprovalEmployee();
                raEmployees.employeeId = employee.id;
                raEmployees.employee = employee;
                raEmployees.organizationId = entity.organizationId;
                raEmployees.tenantId = tenantId;
                raEmployees.status = index_1.RequestApprovalStatusTypesEnum.REQUESTED;
                requestApprovalEmployees.push(raEmployees);
            });
            requestApproval.employeeApprovals = requestApprovalEmployees;
        }
        if (entity.teams) {
            const teams = await this.typeOrmOrganizationTeamRepository.find({
                where: {
                    id: (0, typeorm_2.In)(entity.teams)
                }
            });
            const requestApprovalTeams = [];
            teams.forEach((team) => {
                const raTeam = new internal_1.RequestApprovalTeam();
                raTeam.teamId = team.id;
                raTeam.team = team;
                raTeam.status = index_1.RequestApprovalStatusTypesEnum.REQUESTED;
                raTeam.organizationId = entity.organizationId;
                raTeam.tenantId = tenantId;
                requestApprovalTeams.push(raTeam);
            });
            requestApproval.teamApprovals = requestApprovalTeams;
        }
        return this.typeOrmRepository.save(requestApproval);
    }
    async updateStatusRequestApprovalByAdmin(id, status) {
        const [requestApproval] = await this.typeOrmRepository.find({
            where: {
                id
            },
            relations: {
                approvalPolicy: true
            }
        });
        if (!requestApproval) {
            throw new common_1.NotFoundException('Request Approval not found');
        }
        // if (
        // 	requestApproval.status ===
        // 		RequestApprovalStatusTypesEnum.APPROVED ||
        // 	requestApproval.status ===
        // 		RequestApprovalStatusTypesEnum.REFUSED
        // ) {
        // 	throw new ConflictException('Request Approval is Conflict');
        // }
        requestApproval.status = status;
        return this.typeOrmRepository.save(requestApproval);
    }
    async updateStatusRequestApprovalByEmployeeOrTeam(id, status) {
        let minCount = 0;
        const employeeId = context_1.RequestContext.currentUser().employeeId;
        const [requestApproval] = await this.typeOrmRepository.find({
            where: {
                id
            },
            relations: {
                employeeApprovals: true,
                teamApprovals: true
            }
        });
        if (!requestApproval) {
            throw new common_1.NotFoundException('Request Approval not found');
        }
        if (requestApproval.status === index_1.RequestApprovalStatusTypesEnum.APPROVED ||
            requestApproval.status === index_1.RequestApprovalStatusTypesEnum.REFUSED) {
            throw new common_1.ConflictException('Request Approval is Conflict');
        }
        if (requestApproval.employeeApprovals && requestApproval.employeeApprovals.length > 0) {
            requestApproval.employeeApprovals.forEach((req) => {
                if (req.employeeId === employeeId) {
                    req.status = status;
                }
                if (req.status === index_1.RequestApprovalStatusTypesEnum.APPROVED) {
                    minCount++;
                }
            });
        }
        if (status === index_1.RequestApprovalStatusTypesEnum.REFUSED) {
            requestApproval.status = index_1.RequestApprovalStatusTypesEnum.REFUSED;
        }
        else if (minCount >= requestApproval.min_count) {
            requestApproval.status = index_1.RequestApprovalStatusTypesEnum.APPROVED;
        }
        return this.typeOrmRepository.save(requestApproval);
    }
};
exports.RequestApprovalService = RequestApprovalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(request_approval_entity_1.RequestApproval)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __param(4, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeam)),
    __metadata("design:paramtypes", [type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository,
        mikro_orm_request_approval_repository_1.MikroOrmRequestApprovalRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        mikro_orm_employee_repository_1.MikroOrmEmployeeRepository,
        type_orm_organization_team_repository_1.TypeOrmOrganizationTeamRepository,
        mikro_orm_organization_team_repository_1.MikroOrmOrganizationTeamRepository])
], RequestApprovalService);
//# sourceMappingURL=request-approval.service.js.map