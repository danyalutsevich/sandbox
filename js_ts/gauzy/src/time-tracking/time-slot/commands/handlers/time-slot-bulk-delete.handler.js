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
exports.TimeSlotBulkDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../../plugins/common/dist/index");
const time_slot_entity_1 = require("../../time-slot.entity");
const time_slot_bulk_delete_command_1 = require("../time-slot-bulk-delete.command");
const context_1 = require("../../../../core/context");
const database_helper_1 = require("./../../../../database/database.helper");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
let TimeSlotBulkDeleteHandler = exports.TimeSlotBulkDeleteHandler = class TimeSlotBulkDeleteHandler {
    typeOrmTimeSlotRepository;
    constructor(typeOrmTimeSlotRepository) {
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
    }
    async execute(command) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { input, forceDirectDelete } = command;
        const { organizationId, employeeId, timeLog, timeSlotsIds = [] } = input;
        const query = this.typeOrmTimeSlotRepository.createQueryBuilder('time_slot');
        query.setFindOptions({
            relations: {
                timeLogs: true,
                screenshots: true
            }
        });
        query.where((qb) => {
            if ((0, index_1.isNotEmpty)(timeSlotsIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."id" IN (:...timeSlotsIds)`), {
                    timeSlotsIds
                });
            }
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" = :employeeId`), {
                employeeId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), {
                organizationId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), {
                tenantId
            });
            console.log('Time Slots Delete Range Query', qb.getQueryAndParameters());
        });
        const timeSlots = await query.getMany();
        console.log({ timeSlots, forceDirectDelete }, 'Time Slots Delete Range');
        if ((0, index_1.isNotEmpty)(timeSlots)) {
            if (forceDirectDelete) {
                await this.typeOrmTimeSlotRepository.remove(timeSlots);
                return true;
            }
            else {
                for await (const timeSlot of timeSlots) {
                    const { timeLogs } = timeSlot;
                    if (timeLogs.length === 1) {
                        const [firstTimeLog] = timeLogs;
                        if (firstTimeLog.id === timeLog.id) {
                            await this.typeOrmTimeSlotRepository.remove(timeSlot);
                        }
                    }
                }
                return true;
            }
        }
        return false;
    }
};
exports.TimeSlotBulkDeleteHandler = TimeSlotBulkDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_slot_bulk_delete_command_1.TimeSlotBulkDeleteCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository])
], TimeSlotBulkDeleteHandler);
//# sourceMappingURL=time-slot-bulk-delete.handler.js.map