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
exports.TimeSlotCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../../../plugins/contracts/dist/index");
const time_slot_create_command_1 = require("./../time-slot-create.command");
const context_1 = require("./../../../../core/context");
const internal_1 = require("./../../../../core/entities/internal");
const type_orm_time_slot_repository_1 = require("../../repository/type-orm-time-slot.repository");
let TimeSlotCreateHandler = exports.TimeSlotCreateHandler = class TimeSlotCreateHandler {
    typeOrmTimeSlotRepository;
    constructor(typeOrmTimeSlotRepository) {
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
    }
    async execute(command) {
        const { input } = command;
        const tenantId = context_1.RequestContext.currentTenantId();
        const { employeeId, duration, keyboard, mouse, overall, time_slot, organizationId } = input;
        try {
            const entity = this.typeOrmTimeSlotRepository.create({
                employeeId,
                duration,
                keyboard,
                mouse,
                overall,
                startedAt: new Date((0, moment_1.default)(time_slot).format('YYYY-MM-DD HH:mm:ss')),
                organizationId,
                tenantId
            });
            return await this.typeOrmTimeSlotRepository.save(entity);
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t create ${index_1.IntegrationEntity.TIME_SLOT}`);
        }
    }
};
exports.TimeSlotCreateHandler = TimeSlotCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_slot_create_command_1.TimeSlotCreateCommand),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.TimeSlot)),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository])
], TimeSlotCreateHandler);
//# sourceMappingURL=time-slot-create.handler.js.map