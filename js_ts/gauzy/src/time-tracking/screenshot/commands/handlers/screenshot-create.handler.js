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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const commands_1 = require("./../../../time-slot/commands");
const screenshot_create_command_1 = require("./../screenshot-create.command");
const screenshot_service_1 = require("./../../../screenshot/screenshot.service");
const time_slot_service_1 = require("./../../../time-slot/time-slot.service");
const context_1 = require("./../../../../core/context");
let ScreenshotCreateHandler = exports.ScreenshotCreateHandler = class ScreenshotCreateHandler {
    _screenshotService;
    _timeSlotService;
    _commandBus;
    constructor(_screenshotService, _timeSlotService, _commandBus) {
        this._screenshotService = _screenshotService;
        this._timeSlotService = _timeSlotService;
        this._commandBus = _commandBus;
    }
    async execute(command) {
        try {
            const { input } = command;
            const { file, thumb, recordedAt, activityTimestamp, employeeId, organizationId } = input;
            const tenantId = context_1.RequestContext.currentTenantId();
            const startedAt = (0, moment_1.default)(moment_1.default.utc(activityTimestamp).format('YYYY-MM-DD HH:mm:ss')).toDate();
            const stoppedAt = (0, moment_1.default)(moment_1.default.utc(activityTimestamp).add(10, 'minutes').format('YYYY-MM-DD HH:mm:ss')).toDate();
            let timeSlot;
            try {
                timeSlot = await this._timeSlotService.findOneByOptions({
                    where: {
                        employeeId,
                        organizationId,
                        tenantId,
                        startedAt: (0, typeorm_1.Between)(startedAt, stoppedAt),
                    }
                });
            }
            catch (error) {
                timeSlot = await this._commandBus.execute(new commands_1.TimeSlotCreateCommand({
                    tenantId,
                    organizationId,
                    employeeId,
                    duration: 0,
                    keyboard: 0,
                    mouse: 0,
                    overall: 0,
                    startedAt: new Date(moment_1.default.utc(activityTimestamp).format()),
                    time_slot: new Date(moment_1.default.utc(activityTimestamp).format())
                }));
            }
            return await this._screenshotService.create({
                timeSlot,
                file,
                thumb,
                recordedAt,
                organizationId
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can'\t create ${index_1.IntegrationEntity.SCREENSHOT} for ${index_1.IntegrationEntity.TIME_SLOT}`);
        }
    }
};
exports.ScreenshotCreateHandler = ScreenshotCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(screenshot_create_command_1.ScreenshotCreateCommand),
    __metadata("design:paramtypes", [screenshot_service_1.ScreenshotService,
        time_slot_service_1.TimeSlotService,
        cqrs_1.CommandBus])
], ScreenshotCreateHandler);
//# sourceMappingURL=screenshot-create.handler.js.map