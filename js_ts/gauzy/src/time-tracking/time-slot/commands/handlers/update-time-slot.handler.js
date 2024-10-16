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
exports.UpdateTimeSlotHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const context_1 = require("../../../../core/context");
const activity_entity_1 = require("../../../activity/activity.entity");
const update_time_slot_command_1 = require("../update-time-slot.command");
const time_slot_entity_1 = require("./../../time-slot.entity");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
const type_orm_activity_repository_1 = require("../../../activity/repository/type-orm-activity.repository");
let UpdateTimeSlotHandler = exports.UpdateTimeSlotHandler = class UpdateTimeSlotHandler {
    typeOrmTimeSlotRepository;
    typeOrmActivityRepository;
    constructor(typeOrmTimeSlotRepository, typeOrmActivityRepository) {
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.typeOrmActivityRepository = typeOrmActivityRepository;
    }
    async execute(command) {
        const { input, id } = command;
        let employeeId = input.employeeId;
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            const user = context_1.RequestContext.currentUser();
            employeeId = user.employeeId;
        }
        let timeSlot = await this.typeOrmTimeSlotRepository.findOne({
            where: {
                ...(employeeId ? { employeeId: employeeId } : {}),
                id: id
            }
        });
        if (timeSlot) {
            if (input.startedAt) {
                input.startedAt = (0, moment_1.default)(input.startedAt)
                    //.set('minute', 0)
                    .set('millisecond', 0)
                    .toDate();
            }
            let newActivities = [];
            if (input.activities) {
                newActivities = input.activities.map((activity) => {
                    activity = new activity_entity_1.Activity(activity);
                    activity.employeeId = timeSlot.employeeId;
                    activity.tenantId = context_1.RequestContext.currentTenantId();
                    return activity;
                });
                await this.typeOrmActivityRepository.save(newActivities);
                input.activities = (timeSlot.activities || []).concat(newActivities);
            }
            await this.typeOrmTimeSlotRepository.update(id, input);
            timeSlot = await this.typeOrmTimeSlotRepository.findOne({
                where: {
                    ...(employeeId ? { employeeId } : {}),
                    id
                },
                relations: {
                    timeLogs: true,
                    screenshots: true,
                    activities: true
                }
            });
            return timeSlot;
        }
        else {
            return null;
        }
    }
};
exports.UpdateTimeSlotHandler = UpdateTimeSlotHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_time_slot_command_1.UpdateTimeSlotCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __param(1, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        type_orm_activity_repository_1.TypeOrmActivityRepository])
], UpdateTimeSlotHandler);
//# sourceMappingURL=update-time-slot.handler.js.map