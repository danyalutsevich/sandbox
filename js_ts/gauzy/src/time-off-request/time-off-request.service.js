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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffRequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const time_off_request_entity_1 = require("./time-off-request.entity");
const request_approval_entity_1 = require("../request-approval/request-approval.entity");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const database_helper_1 = require("./../database/database.helper");
const mikro_orm_request_approval_repository_1 = require("request-approval/repository/mikro-orm-request-approval.repository");
const type_orm_request_approval_repository_1 = require("request-approval/repository/type-orm-request-approval.repository");
const mikro_orm_time_off_request_repository_1 = require("./repository/mikro-orm-time-off-request.repository");
const type_orm_time_off_request_repository_1 = require("./repository/type-orm-time-off-request.repository");
let TimeOffRequestService = exports.TimeOffRequestService = class TimeOffRequestService extends crud_1.TenantAwareCrudService {
    typeOrmRequestApprovalRepository;
    constructor(typeOrmTimeOffRequestRepository, mikroOrmTimeOffRequestRepository, typeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository) {
        super(typeOrmTimeOffRequestRepository, mikroOrmTimeOffRequestRepository);
        this.typeOrmRequestApprovalRepository = typeOrmRequestApprovalRepository;
    }
    async create(entity) {
        try {
            const request = new time_off_request_entity_1.TimeOffRequest();
            Object.assign(request, entity);
            const tenantId = context_1.RequestContext.currentTenantId();
            const currentUser = context_1.RequestContext.currentUser();
            const timeOffRequest = await this.typeOrmRepository.save(request);
            const requestApproval = new request_approval_entity_1.RequestApproval();
            requestApproval.requestId = timeOffRequest.id;
            requestApproval.requestType = index_1.ApprovalPolicyTypesStringEnum.TIME_OFF;
            requestApproval.status = timeOffRequest.status
                ? index_1.StatusTypesMapRequestApprovalEnum[timeOffRequest.status]
                : index_1.RequestApprovalStatusTypesEnum.REQUESTED;
            requestApproval.createdBy = currentUser.id;
            requestApproval.createdByName = currentUser.name;
            requestApproval.name = 'Request time off';
            requestApproval.min_count = 1;
            requestApproval.organizationId = timeOffRequest.organizationId;
            requestApproval.tenantId = tenantId;
            await this.typeOrmRequestApprovalRepository.save(requestApproval);
            return timeOffRequest;
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async getAllTimeOffRequests(relations, findInput) {
        try {
            const { organizationId, employeeId, startDate, endDate } = findInput;
            const tenantId = context_1.RequestContext.currentTenantId();
            const query = this.typeOrmRepository.createQueryBuilder('timeoff');
            query
                .leftJoinAndSelect(`${query.alias}.employees`, `employees`)
                .leftJoinAndSelect(`${query.alias}.policy`, `policy`)
                .leftJoinAndSelect(`employees.user`, `user`);
            query.andWhere(new typeorm_2.Brackets((qb) => {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
            }));
            if (employeeId) {
                const employeeIds = [employeeId];
                query.innerJoin(`${query.alias}.employees`, 'employee', 'employee.id IN (:...employeeIds)', {
                    employeeIds
                });
            }
            const start = (0, moment_1.default)(startDate).format('YYYY-MM-DD hh:mm:ss');
            const end = (0, moment_1.default)(endDate).format('YYYY-MM-DD hh:mm:ss');
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."start" BETWEEN :begin AND :end`), {
                begin: start,
                end: end
            });
            const items = await query.getMany();
            return { items, total: items.length };
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async updateTimeOffByAdmin(id, timeOffRequest) {
        try {
            return await this.typeOrmRepository.save({
                id,
                ...timeOffRequest
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateStatusTimeOffByAdmin(id, status) {
        try {
            const timeOffRequest = await this.typeOrmRepository.findOneBy({
                id
            });
            if (!timeOffRequest) {
                throw new common_1.NotFoundException('Request time off not found');
            }
            if (timeOffRequest.status === index_1.StatusTypesEnum.REQUESTED) {
                timeOffRequest.status = status;
            }
            else {
                throw new common_1.ConflictException('Request time off is Conflict');
            }
            return await this.typeOrmRepository.save(timeOffRequest);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    /**
     * Time Off Request override pagination method
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        try {
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            // Set query options
            if ((0, index_2.isNotEmpty)(options)) {
                query.setFindOptions({
                    skip: options.skip ? options.take * (options.skip - 1) : 0,
                    take: options.take ? options.take : 10,
                    ...(options.join ? { join: options.join } : {}),
                    ...(options.relations ? { relations: options.relations } : {})
                });
            }
            query.where((qb) => {
                qb.andWhere(new typeorm_2.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), {
                        tenantId: context_1.RequestContext.currentTenantId()
                    });
                    if ((0, index_2.isNotEmpty)(options.where)) {
                        const { where } = options;
                        if ((0, index_2.isNotEmpty)(where.organizationId)) {
                            const { organizationId } = where;
                            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), {
                                organizationId
                            });
                        }
                    }
                }));
                if ((0, index_2.isNotEmpty)(options.where)) {
                    const { where } = options;
                    if ((0, index_2.isNotEmpty)(where.employeeIds)) {
                        const { employeeIds } = where;
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employees"."id" IN (:...employeeIds)`), {
                            employeeIds
                        });
                    }
                    /**
                     * Filter by dates or current month
                     */
                    let startDate = (0, moment_1.default)().startOf('month').utc().format('YYYY-MM-DD HH:mm:ss');
                    let endDate = (0, moment_1.default)().endOf('month').utc().format('YYYY-MM-DD HH:mm:ss');
                    if ((0, index_2.isNotEmpty)(where.startDate) && (0, index_2.isNotEmpty)(where.endDate)) {
                        startDate = moment_1.default.utc(where.startDate).format('YYYY-MM-DD HH:mm:ss');
                        endDate = moment_1.default.utc(where.endDate).format('YYYY-MM-DD HH:mm:ss');
                    }
                    qb.andWhere(new typeorm_2.Brackets((web) => {
                        web.where([
                            {
                                start: (0, typeorm_2.Between)(startDate, endDate)
                            },
                            {
                                end: (0, typeorm_2.Between)(startDate, endDate)
                            }
                        ]);
                    }));
                    if ((0, index_2.isNotEmpty)(where.isHoliday) && (0, index_2.isNotEmpty)(Boolean(JSON.parse(where.isHoliday)))) {
                        qb.andWhere({ isHoliday: false });
                    }
                    if ((0, index_2.isNotEmpty)(where.includeArchived)) {
                        qb.andWhere({
                            isArchived: Boolean(JSON.parse(where.includeArchived))
                        });
                    }
                    if ((0, index_2.isNotEmpty)(where.status)) {
                        qb.andWhere({
                            status: where.status
                        });
                    }
                    qb.andWhere(new typeorm_2.Brackets((web) => {
                        if ((0, index_2.isNotEmpty)(where.user) && (0, index_2.isNotEmpty)(where.user.name)) {
                            const keywords = where.user.name.split(' ');
                            keywords.forEach((keyword, index) => {
                                web.orWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("user"."firstName") like LOWER(:keyword_${index})`), {
                                    [`keyword_${index}`]: `%${keyword}%`
                                });
                                web.orWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("user"."lastName") like LOWER(:${index}_keyword)`), {
                                    [`${index}_keyword`]: `%${keyword}%`
                                });
                            });
                        }
                    }));
                    qb.andWhere(new typeorm_2.Brackets((web) => {
                        if ((0, index_2.isNotEmpty)(where.description)) {
                            const { description } = where;
                            web.andWhere({
                                description: (0, typeorm_2.Like)(`%${description}%`)
                            });
                        }
                        if ((0, index_2.isNotEmpty)(where.policy) && (0, index_2.isNotEmpty)(where.policy.name)) {
                            web.andWhere({
                                policy: {
                                    name: (0, typeorm_2.Like)(`%${where.policy.name}%`)
                                }
                            });
                            web.andWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("policy"."name") like LOWER(:name)`), {
                                name: `%${where.policy.name}%`
                            });
                        }
                    }));
                }
            });
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.TimeOffRequestService = TimeOffRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(time_off_request_entity_1.TimeOffRequest)),
    __param(2, (0, typeorm_1.InjectRepository)(request_approval_entity_1.RequestApproval)),
    __metadata("design:paramtypes", [type_orm_time_off_request_repository_1.TypeOrmTimeOffRequestRepository,
        mikro_orm_time_off_request_repository_1.MikroOrmTimeOffRequestRepository, typeof (_a = typeof type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository !== "undefined" && type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository) === "function" ? _a : Object, typeof (_b = typeof mikro_orm_request_approval_repository_1.MikroOrmRequestApprovalRepository !== "undefined" && mikro_orm_request_approval_repository_1.MikroOrmRequestApprovalRepository) === "function" ? _b : Object])
], TimeOffRequestService);
//# sourceMappingURL=time-off-request.service.js.map