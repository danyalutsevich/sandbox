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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConflictAvailabilitySlotsHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../../plugins/config/dist/index");
const availability_slots_entity_1 = require("../../availability-slots.entity");
const get_conflict_availability_slots_command_1 = require("../get-conflict-availability-slots.command");
const context_1 = require("./../../../core/context");
const index_2 = require("../../../../plugins/config/dist/index");
const database_helper_1 = require("./../../../database/database.helper");
const type_orm_availability_slot_repository_1 = require("../../repository/type-orm-availability-slot.repository");
const mikro_orm_availability_slot_repository_1 = require("../../repository/mikro-orm-availability-slot.repository");
let GetConflictAvailabilitySlotsHandler = exports.GetConflictAvailabilitySlotsHandler = class GetConflictAvailabilitySlotsHandler {
    typeOrmAvailabilitySlotRepository;
    mikroOrmAvailabilitySlotRepository;
    configService;
    constructor(typeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository, configService) {
        this.typeOrmAvailabilitySlotRepository = typeOrmAvailabilitySlotRepository;
        this.mikroOrmAvailabilitySlotRepository = mikroOrmAvailabilitySlotRepository;
        this.configService = configService;
    }
    async execute(command) {
        const { input } = command;
        const { startTime, endTime, employeeId, organizationId } = input;
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        const startedAt = (0, moment_1.default)(startTime).toISOString();
        const stoppedAt = (0, moment_1.default)(endTime).toISOString();
        const query = this.typeOrmAvailabilitySlotRepository.createQueryBuilder();
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), {
            tenantId
        });
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" = :employeeId`), {
            employeeId
        });
        switch (this.configService.dbConnectionOptions.type) {
            case index_2.DatabaseTypeEnum.sqlite:
            case index_2.DatabaseTypeEnum.betterSqlite3:
                query.andWhere(`'${startedAt}' >= "${query.alias}"."startTime" AND '${startedAt}' <= "${query.alias}"."endTime"`);
                break;
            case index_2.DatabaseTypeEnum.postgres:
                query.andWhere(`(
						"${query.alias}"."startTime", "${query.alias}"."endTime") OVERLAPS (timestamptz '${startedAt}', timestamptz '${stoppedAt}'
					)`);
                break;
            case index_2.DatabaseTypeEnum.mysql:
                query.andWhere((0, database_helper_1.prepareSQLQuery)(`(
						("${query.alias}"."startTime" BETWEEN CAST('${startedAt}' AS DATETIME) AND CAST('${stoppedAt}' AS DATETIME))
						OR
						("${query.alias}"."endTime" BETWEEN CAST('${startedAt}' AS DATETIME) AND CAST('${stoppedAt}' AS DATETIME))
						OR
						("${query.alias}"."startTime" <= CAST('${startedAt}' AS DATETIME) AND "${query.alias}"."endTime" >= CAST('${stoppedAt}' AS DATETIME))
					)`));
                break;
            default:
                throw Error(`cannot compare startTime/endTime due to unsupported database type: ${this.configService.dbConnectionOptions.type}`);
        }
        // organization and tenant for availability slots conflicts
        if (organizationId) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), {
                organizationId
            });
        }
        if (input.type) {
            query.andWhere(`${query.alias}.type = :type`, {
                type: input.type
            });
        }
        if (input.relations) {
            input.relations.forEach((relation) => {
                query.leftJoinAndSelect(`${query.alias}.${relation}`, relation);
            });
        }
        if (input.ignoreId) {
            query.andWhere(`${query.alias}.id NOT IN (:...id)`, {
                id: input.ignoreId instanceof Array
                    ? input.ignoreId
                    : [input.ignoreId]
            });
        }
        return await query.getMany();
    }
};
exports.GetConflictAvailabilitySlotsHandler = GetConflictAvailabilitySlotsHandler = __decorate([
    (0, cqrs_1.CommandHandler)(get_conflict_availability_slots_command_1.GetConflictAvailabilitySlotsCommand),
    __param(0, (0, typeorm_1.InjectRepository)(availability_slots_entity_1.AvailabilitySlot)),
    __metadata("design:paramtypes", [type_orm_availability_slot_repository_1.TypeOrmAvailabilitySlotRepository,
        mikro_orm_availability_slot_repository_1.MikroOrmAvailabilitySlotRepository,
        index_1.ConfigService])
], GetConflictAvailabilitySlotsHandler);
//# sourceMappingURL=get-conflict-availability-slots.handler.js.map