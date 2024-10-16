"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.TimeSlotBulkCreateOrUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const _ = __importStar(require("underscore"));
const index_1 = require("../../../../../plugins/common/dist/index");
const time_slot_entity_1 = require("./../../time-slot.entity");
const time_slot_bulk_create_or_update_command_1 = require("./../time-slot-bulk-create-or-update.command");
const context_1 = require("../../../../core/context");
const time_slot_merge_command_1 = require("./../time-slot-merge.command");
const internal_1 = require("./../../../../core/entities/internal");
const type_orm_time_log_repository_1 = require("../../../time-log/repository/type-orm-time-log.repository");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
const type_orm_employee_repository_1 = require("../../../../employee/repository/type-orm-employee.repository");
let TimeSlotBulkCreateOrUpdateHandler = exports.TimeSlotBulkCreateOrUpdateHandler = class TimeSlotBulkCreateOrUpdateHandler {
    typeOrmTimeLogRepository;
    typeOrmTimeSlotRepository;
    typeOrmEmployeeRepository;
    commandBus;
    constructor(typeOrmTimeLogRepository, typeOrmTimeSlotRepository, typeOrmEmployeeRepository, commandBus) {
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        let { slots, employeeId, organizationId } = command;
        if (slots.length === 0) {
            return [];
        }
        slots = slots.map((slot) => {
            slot.startedAt = moment_1.default.utc(slot.startedAt).toDate();
            return slot;
        });
        const insertedSlots = await this.typeOrmTimeSlotRepository.find({
            where: {
                startedAt: (0, typeorm_2.In)(_.pluck(slots, 'startedAt'))
            },
            relations: ['timeLogs']
        });
        if ((0, index_1.isEmpty)(organizationId)) {
            const employee = await this.typeOrmEmployeeRepository.findOneBy({
                id: employeeId
            });
            organizationId = employee.organizationId;
        }
        const newSlotsTimeLogIds = _.chain(slots)
            .map((slot) => _.pluck(slot.timeLogs, 'id'))
            .flatten()
            .value();
        const oldSlotsTimeLogIds = _.chain(insertedSlots)
            .map((slot) => _.pluck(slot.timeLogs, 'id'))
            .flatten()
            .value();
        const timeLogIds = _.chain(oldSlotsTimeLogIds)
            .concat(newSlotsTimeLogIds)
            .uniq()
            .values()
            .value();
        const timeLogs = await this.typeOrmTimeLogRepository.find({
            where: {
                id: (0, typeorm_2.In)(timeLogIds)
            }
        });
        if (insertedSlots.length > 0) {
            slots = slots.map((slot) => {
                const oldSlot = insertedSlots.find((insertedSlot) => (0, moment_1.default)(insertedSlot.startedAt).format('YYYY-MM-DD HH:mm') === (0, moment_1.default)(slot.startedAt).format('YYYY-MM-DD HH:mm'));
                if (oldSlot) {
                    oldSlot.keyboard = oldSlot.keyboard + slot.keyboard;
                    oldSlot.mouse = oldSlot.mouse + slot.mouse;
                    oldSlot.overall = oldSlot.overall + slot.overall;
                    const foundTimeLogs = _.where(timeLogs, {
                        id: oldSlotsTimeLogIds
                    });
                    if (foundTimeLogs.length > 0) {
                        oldSlot.timeLogs = oldSlot.timeLogs.concat(foundTimeLogs);
                        oldSlot.timeLogs = _.uniq(oldSlot.timeLogs, 'id');
                    }
                    return oldSlot;
                }
                else {
                    if (!slot.organizationId) {
                        slot.organizationId = organizationId;
                    }
                    slot.tenantId = context_1.RequestContext.currentTenantId();
                    return slot;
                }
            });
        }
        await this.typeOrmTimeSlotRepository.save(slots);
        const dates = slots.map((slot) => moment_1.default.utc(slot.startedAt).toDate());
        const minDate = dates.reduce(function (a, b) {
            return a < b ? a : b;
        });
        const maxDate = dates.reduce(function (a, b) {
            return a > b ? a : b;
        });
        return await this.commandBus.execute(new time_slot_merge_command_1.TimeSlotMergeCommand(organizationId, employeeId, minDate, maxDate));
    }
};
exports.TimeSlotBulkCreateOrUpdateHandler = TimeSlotBulkCreateOrUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_slot_bulk_create_or_update_command_1.TimeSlotBulkCreateOrUpdateCommand),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.TimeLog)),
    __param(1, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        cqrs_1.CommandBus])
], TimeSlotBulkCreateOrUpdateHandler);
//# sourceMappingURL=time-slot-bulk-create-or-update.handler.js.map