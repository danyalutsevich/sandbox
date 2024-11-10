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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const activity_update_command_1 = require("../activity-update.command");
const activity_service_1 = require("./../../../activity/activity.service");
let ActivityUpdateHandler = exports.ActivityUpdateHandler = class ActivityUpdateHandler {
    _activityService;
    constructor(_activityService) {
        this._activityService = _activityService;
    }
    async execute(command) {
        try {
            const { input } = command;
            const { id, title, duration, type, date, time, projectId, employeeId, taskId } = input;
            return await this._activityService.create({
                id,
                title,
                duration,
                type,
                date,
                time,
                projectId,
                employeeId,
                taskId
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can'\t update ${index_1.IntegrationEntity.ACTIVITY} for ${index_1.IntegrationEntity.TIME_SLOT}`);
        }
    }
};
exports.ActivityUpdateHandler = ActivityUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(activity_update_command_1.ActivityUpdateCommand),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityUpdateHandler);
//# sourceMappingURL=activity-update.handler.js.map