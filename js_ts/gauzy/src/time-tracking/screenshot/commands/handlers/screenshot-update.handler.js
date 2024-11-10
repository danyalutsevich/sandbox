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
exports.ScreenshotUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const screenshot_update_command_1 = require("./../screenshot-update.command");
const screenshot_service_1 = require("./../../../screenshot/screenshot.service");
let ScreenshotUpdateHandler = exports.ScreenshotUpdateHandler = class ScreenshotUpdateHandler {
    _screenshotService;
    constructor(_screenshotService) {
        this._screenshotService = _screenshotService;
    }
    async execute(command) {
        try {
            const { input } = command;
            const { id, file, thumb } = input;
            await this._screenshotService.update(id, {
                file,
                thumb
            });
            return await this._screenshotService.findOneByIdString(id);
        }
        catch (error) {
            throw new common_1.BadRequestException('Can\'t update screenshot for time slot');
        }
    }
};
exports.ScreenshotUpdateHandler = ScreenshotUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(screenshot_update_command_1.ScreenshotUpdateCommand),
    __metadata("design:paramtypes", [screenshot_service_1.ScreenshotService])
], ScreenshotUpdateHandler);
//# sourceMappingURL=screenshot-update.handler.js.map