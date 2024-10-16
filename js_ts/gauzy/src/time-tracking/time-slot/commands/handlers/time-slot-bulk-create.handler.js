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
exports.TimeSlotBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const underscore_1 = require("underscore");
const time_slot_entity_1 = require("./../../time-slot.entity");
const time_log_entity_1 = require("./../../../time-log/time-log.entity");
const time_slot_bulk_create_command_1 = require("./../time-slot-bulk-create.command");
const time_slot_merge_command_1 = require("./../time-slot-merge.command");
const context_1 = require("../../../../core/context");
const utils_1 = require("./../../../../core/utils");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
const type_orm_time_log_repository_1 = require("../../../time-log/repository/type-orm-time-log.repository");
let TimeSlotBulkCreateHandler = exports.TimeSlotBulkCreateHandler = class TimeSlotBulkCreateHandler {
    typeOrmTimeLogRepository;
    typeOrmTimeSlotRepository;
    commandBus;
    constructor(typeOrmTimeLogRepository, typeOrmTimeSlotRepository, commandBus) {
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        let { slots, employeeId, organizationId } = command;
        if (slots.length === 0) {
            return [];
        }
        slots = slots.map((slot) => {
            const { start } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(slot.startedAt), moment_1.default.utc(slot.startedAt));
            slot.startedAt = start;
            return slot;
        });
        const tenantId = context_1.RequestContext.currentTenantId();
        const insertedSlots = await this.typeOrmTimeSlotRepository.find({
            where: {
                startedAt: (0, typeorm_2.In)((0, underscore_1.pluck)(slots, 'startedAt')),
                tenantId,
                organizationId,
                employeeId
            }
        });
        if (insertedSlots.length > 0) {
            slots = slots.filter((slot) => !insertedSlots.find((insertedSlot) => (0, moment_1.default)(insertedSlot.startedAt).isSame((0, moment_1.default)(slot.startedAt))));
        }
        if (slots.length === 0) {
            return [];
        }
        const timeLogs = await this.typeOrmTimeLogRepository.find({
            where: {
                id: (0, typeorm_2.In)((0, underscore_1.chain)(slots).pluck('timeLogId').flatten().value().filter(Boolean)),
                organizationId,
                employeeId,
                tenantId
            }
        });
        slots = slots.map((slot) => {
            let timeLogIds;
            if (slot.timeLogId instanceof Array) {
                timeLogIds = slot.timeLogId;
            }
            else {
                timeLogIds = [slot.timeLogId];
            }
            slot.timeLogs = [];
            for (const timeLogId of timeLogIds) {
                slot.timeLogs.push(...(0, underscore_1.where)(timeLogs, { id: timeLogId }));
            }
            slot.organizationId = organizationId;
            slot.tenantId = tenantId;
            return slot;
        });
        console.log('Time Slots Bulk Create Handler Request', { slots });
        if (slots.length > 0) {
            await this.typeOrmTimeSlotRepository.save(slots);
        }
        slots = insertedSlots.concat(slots);
        const dates = slots.map((slot) => (0, moment_1.default)(slot.startedAt).toDate());
        const minDate = dates.reduce(function (a, b) {
            return a < b ? a : b;
        });
        const maxDate = dates.reduce(function (a, b) {
            return a > b ? a : b;
        });
        return await this.commandBus.execute(new time_slot_merge_command_1.TimeSlotMergeCommand(organizationId, employeeId, minDate, maxDate));
    }
};
exports.TimeSlotBulkCreateHandler = TimeSlotBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_slot_bulk_create_command_1.TimeSlotBulkCreateCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_log_entity_1.TimeLog)),
    __param(1, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        cqrs_1.CommandBus])
], TimeSlotBulkCreateHandler);
//# sourceMappingURL=time-slot-bulk-create.handler.js.map