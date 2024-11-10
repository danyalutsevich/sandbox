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
exports.DeleteTimeSlotHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const index_2 = require("../../../../../plugins/common/dist/index");
;
const time_slot_entity_1 = require("./../../time-slot.entity");
const delete_time_span_command_1 = require("../../../time-log/commands/delete-time-span.command");
const delete_time_slot_command_1 = require("../delete-time-slot.command");
const context_1 = require("./../../../../core/context");
const database_helper_1 = require("./../../../../database/database.helper");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
let DeleteTimeSlotHandler = exports.DeleteTimeSlotHandler = class DeleteTimeSlotHandler {
    typeOrmTimeSlotRepository;
    commandBus;
    constructor(typeOrmTimeSlotRepository, commandBus) {
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { query } = command;
        const ids = query.ids;
        if ((0, index_2.isEmpty)(ids)) {
            throw new common_1.NotAcceptableException('You can not delete time slots');
        }
        let employeeIds = [];
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            const user = context_1.RequestContext.currentUser();
            employeeIds = [user.employeeId];
        }
        const tenantId = context_1.RequestContext.currentTenantId();
        const { organizationId } = query;
        for await (const id of Object.values(ids)) {
            const query = this.typeOrmTimeSlotRepository.createQueryBuilder('time_slot');
            query.setFindOptions({
                relations: {
                    timeLogs: true,
                    screenshots: true
                }
            });
            query.where((qb) => {
                qb.andWhere(new typeorm_2.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."id" = :id`), { id });
                }));
                if ((0, index_2.isNotEmpty)(employeeIds)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" IN (:...employeeIds)`), {
                        employeeIds
                    });
                }
                qb.addOrderBy((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."createdAt"`), 'ASC');
            });
            const timeSlots = await query.getMany();
            if ((0, index_2.isEmpty)(timeSlots)) {
                continue;
            }
            for await (const timeSlot of timeSlots) {
                if (timeSlot && (0, index_2.isNotEmpty)(timeSlot.timeLogs)) {
                    const timeLogs = timeSlot.timeLogs.filter((timeLog) => timeLog.isRunning === false);
                    if ((0, index_2.isNotEmpty)(timeLogs)) {
                        for await (const timeLog of timeLogs) {
                            await this.commandBus.execute(new delete_time_span_command_1.DeleteTimeSpanCommand({
                                start: timeSlot.startedAt,
                                end: timeSlot.stoppedAt
                            }, timeLog, timeSlot));
                        }
                    }
                }
            }
        }
        return true;
    }
};
exports.DeleteTimeSlotHandler = DeleteTimeSlotHandler = __decorate([
    (0, cqrs_1.CommandHandler)(delete_time_slot_command_1.DeleteTimeSlotCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        cqrs_1.CommandBus])
], DeleteTimeSlotHandler);
//# sourceMappingURL=delete-time-slot.handler.js.map