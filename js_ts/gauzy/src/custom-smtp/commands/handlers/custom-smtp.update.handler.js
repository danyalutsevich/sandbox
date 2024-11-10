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
exports.CustomSmtpUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const custom_smtp_service_1 = require("../../custom-smtp.service");
const custom_smtp_update_command_1 = require("../custom-smtp.update.command");
let CustomSmtpUpdateHandler = exports.CustomSmtpUpdateHandler = class CustomSmtpUpdateHandler {
    _customSmtpService;
    constructor(_customSmtpService) {
        this._customSmtpService = _customSmtpService;
    }
    async execute(command) {
        try {
            const { id, input } = command;
            await this._customSmtpService.update(id, input);
            return await this._customSmtpService.findOneByIdString(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.CustomSmtpUpdateHandler = CustomSmtpUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(custom_smtp_update_command_1.CustomSmtpUpdateCommand),
    __metadata("design:paramtypes", [custom_smtp_service_1.CustomSmtpService])
], CustomSmtpUpdateHandler);
//# sourceMappingURL=custom-smtp.update.handler.js.map