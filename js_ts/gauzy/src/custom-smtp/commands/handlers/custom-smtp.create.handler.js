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
exports.CustomSmtpCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const custom_smtp_service_1 = require("../../custom-smtp.service");
const custom_smtp_create_command_1 = require("../custom-smtp.create.command");
let CustomSmtpCreateHandler = exports.CustomSmtpCreateHandler = class CustomSmtpCreateHandler {
    _customSmtpService;
    constructor(_customSmtpService) {
        this._customSmtpService = _customSmtpService;
    }
    async execute(command) {
        try {
            const { input } = command;
            return await this._customSmtpService.create(input);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.CustomSmtpCreateHandler = CustomSmtpCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(custom_smtp_create_command_1.CustomSmtpCreateCommand),
    __metadata("design:paramtypes", [custom_smtp_service_1.CustomSmtpService])
], CustomSmtpCreateHandler);
//# sourceMappingURL=custom-smtp.create.handler.js.map