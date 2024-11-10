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
exports.EmailResetCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const email_reset_create_command_1 = require("../email-reset.create.command");
const email_reset_service_1 = require("./../../email-reset.service");
let EmailResetCreateHandler = exports.EmailResetCreateHandler = class EmailResetCreateHandler {
    _emailResetService;
    constructor(_emailResetService) {
        this._emailResetService = _emailResetService;
    }
    async execute(command) {
        const { input } = command;
        const { email, oldEmail, code, userId, token } = input;
        try {
            return await this._emailResetService.create({
                email,
                oldEmail,
                code,
                userId,
                token
            });
        }
        catch (error) { }
    }
};
exports.EmailResetCreateHandler = EmailResetCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(email_reset_create_command_1.EmailResetCreateCommand),
    __metadata("design:paramtypes", [email_reset_service_1.EmailResetService])
], EmailResetCreateHandler);
//# sourceMappingURL=email-reset.create.handler.js.map