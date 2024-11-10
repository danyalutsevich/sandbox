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
exports.EquipmentSharingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const index_3 = require("../../plugins/common/dist/index");
const database_helper_1 = require("./../database/database.helper");
const equipment_sharing_entity_1 = require("./equipment-sharing.entity");
const context_1 = require("../core/context");
const crud_1 = require("./../core/crud");
const request_approval_entity_1 = require("../request-approval/request-approval.entity");
const type_orm_equipment_sharing_repository_1 = require("./repository/type-orm-equipment-sharing.repository");
const mikro_orm_equipment_sharing_repository_1 = require("./repository/mikro-orm-equipment-sharing.repository");
const type_orm_request_approval_repository_1 = require("./../request-approval/repository/type-orm-request-approval.repository");
const mikro_orm_request_approval_repository_1 = require("./../request-approval/repository/mikro-orm-request-approval.repository");
let EquipmentSharingService = exports.EquipmentSharingService = class EquipmentSharingService extends crud_1.TenantAwareCrudService {
    typeOrmRequestApprovalRepository;
    configService;
    constructor(typeOrmEquipmentSharingRepository, mikroOrmEquipmentSharingRepository, typeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository, configService) {
        super(typeOrmEquipmentSharingRepository, mikroOrmEquipmentSharingRepository);
        this.typeOrmRequestApprovalRepository = typeOrmRequestApprovalRepository;
        this.configService = configService;
    }
    async findEquipmentSharingsByOrgId(organizationId) {
        try {
            const query = this.typeOrmRepository.createQueryBuilder('equipment_sharing');
            query
                .leftJoinAndSelect(`${query.alias}.employees`, 'employees')
                .leftJoinAndSelect(`${query.alias}.teams`, 'teams')
                .innerJoinAndSelect(`${query.alias}.equipment`, 'equipment')
                .leftJoinAndSelect(`${query.alias}.equipmentSharingPolicy`, 'equipmentSharingPolicy');
            switch (this.configService.dbConnectionOptions.type) {
                case index_2.DatabaseTypeEnum.sqlite:
                case index_2.DatabaseTypeEnum.betterSqlite3:
                    query.leftJoinAndSelect('request_approval', 'requestApproval', '"equipment_sharing"."id" = "requestApproval"."requestId"');
                    break;
                case index_2.DatabaseTypeEnum.postgres:
                case index_2.DatabaseTypeEnum.mysql:
                    query.leftJoinAndSelect('request_approval', 'requestApproval', 'uuid(equipment_sharing.id) = uuid(requestApproval.requestId)');
                    break;
                default:
                    throw Error(`cannot create query to find equipment sharings by orgId due to unsupported database type: ${this.configService.dbConnectionOptions.type}`);
            }
            return await query
                .leftJoinAndSelect('requestApproval.approvalPolicy', 'approvalPolicy')
                .where(new typeorm_2.Brackets((qb) => {
                const tenantId = context_1.RequestContext.currentTenantId();
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
            }))
                .getMany();
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async findRequestApprovalsByEmployeeId(id) {
        try {
            return await this.typeOrmRepository.find({
                where: {
                    createdBy: id
                },
                relations: ['equipment', 'employees', 'teams']
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async findAllEquipmentSharings() {
        const [items, total] = await this.typeOrmRepository.findAndCount({
            relations: ['equipment', 'employees', 'teams']
        });
        return { items, total };
    }
    async createEquipmentSharing(equipmentSharing) {
        try {
            equipmentSharing.createdBy = context_1.RequestContext.currentUser().id;
            equipmentSharing.createdByName = context_1.RequestContext.currentUser().name;
            const equipmentSharingSaved = await this.typeOrmRepository.save(equipmentSharing);
            return equipmentSharingSaved;
        }
        catch (err) {
            console.log('err', err);
            throw new common_1.BadRequestException(err);
        }
    }
    async update(id, equipmentSharing) {
        try {
            await this.typeOrmRepository.delete(id);
            const equipmentSharingSaved = await this.typeOrmRepository.save(equipmentSharing);
            return equipmentSharingSaved;
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async delete(id) {
        try {
            const [equipmentSharing] = await Promise.all([
                await this.typeOrmRepository.delete(id),
                await this.typeOrmRequestApprovalRepository.delete({
                    requestId: id
                })
            ]);
            return equipmentSharing;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateStatusEquipmentSharingByAdmin(id, status) {
        try {
            const equipmentSharing = await this.typeOrmRepository.findOneBy({
                id
            });
            if (!equipmentSharing) {
                throw new common_1.NotFoundException('Equipment Sharing not found');
            }
            equipmentSharing.status = status;
            return await this.typeOrmRepository.save(equipmentSharing);
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async pagination(filter) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const query = this.typeOrmRepository.createQueryBuilder('equipment_sharing');
            /**
             * Pagination
             * Sets number of entities to skip.
             * Sets maximal number of entities to take.
             */
            query.skip(filter && filter.skip ? filter.take * (filter.skip - 1) : 0);
            query.take(filter && filter.take ? filter.take : 10);
            query.innerJoinAndSelect(`${query.alias}.equipment`, 'equipment');
            query.leftJoinAndSelect(`${query.alias}.equipmentSharingPolicy`, 'equipmentSharingPolicy');
            query.leftJoinAndSelect(`${query.alias}.employees`, 'employees');
            query.leftJoinAndSelect(`${query.alias}.teams`, 'teams');
            switch (this.configService.dbConnectionOptions.type) {
                case index_2.DatabaseTypeEnum.sqlite:
                case index_2.DatabaseTypeEnum.betterSqlite3:
                    query.leftJoinAndSelect('request_approval', 'requestApproval', '"equipment_sharing"."id" = "requestApproval"."requestId"');
                    break;
                case index_2.DatabaseTypeEnum.postgres:
                    query.leftJoinAndSelect('request_approval', 'requestApproval', 'uuid(equipment_sharing.id) = uuid(requestApproval.requestId)');
                    break;
                case index_2.DatabaseTypeEnum.mysql:
                    query.leftJoinAndSelect('request_approval', 'requestApproval', (0, database_helper_1.prepareSQLQuery)(`"equipment_sharing"."id" = "requestApproval"."requestId"`));
                    break;
                default:
                    throw Error(`cannot paginate equipment sharings due to unsupported database type: ${this.configService.dbConnectionOptions.type}`);
            }
            query.leftJoinAndSelect('requestApproval.approvalPolicy', 'approvalPolicy');
            /**
             * Adds new AND WHERE condition in the query builder.
             * Additionally you can add parameters used in where expression.
             */
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            query.andWhere(new typeorm_2.Brackets((qb) => {
                if (filter.where) {
                    const { tenantId, organizationId } = filter.where;
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"equipment"."tenantId" = :tenantId`), { tenantId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"equipment"."organizationId" = :organizationId`), { organizationId });
                }
            }));
            query.andWhere(new typeorm_2.Brackets((qb) => {
                if ((0, index_3.isNotEmpty)(filter.where) && (0, index_3.isNotEmpty)(filter.where.employeeIds)) {
                    let { employeeIds = [], organizationId } = filter.where;
                    const user = context_1.RequestContext.currentUser();
                    if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE) &&
                        user.employeeId) {
                        employeeIds = [user.employeeId];
                    }
                    qb.andWhere(new typeorm_2.Brackets((qb) => {
                        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employees"."id" IN (:...employeeIds)`), {
                            employeeIds
                        });
                        qb.orWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."createdBy" IN (:...employeeIds)`), {
                            employeeIds
                        });
                    }));
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employees"."tenantId" = :tenantId`), { tenantId });
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employees"."organizationId" = :organizationId`), { organizationId });
                }
            }));
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.EquipmentSharingService = EquipmentSharingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_sharing_entity_1.EquipmentSharing)),
    __param(2, (0, typeorm_1.InjectRepository)(request_approval_entity_1.RequestApproval)),
    __metadata("design:paramtypes", [type_orm_equipment_sharing_repository_1.TypeOrmEquipmentSharingRepository,
        mikro_orm_equipment_sharing_repository_1.MikroOrmEquipmentSharingRepository,
        type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository,
        mikro_orm_request_approval_repository_1.MikroOrmRequestApprovalRepository,
        index_2.ConfigService])
], EquipmentSharingService);
//# sourceMappingURL=equipment-sharing.service.js.map