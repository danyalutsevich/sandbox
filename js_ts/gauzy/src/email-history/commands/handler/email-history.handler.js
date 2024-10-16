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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHistoryResendHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const email_service_1 = require("email-send/email.service");
const email_history_resend_command_1 = require("../email-history.resend.command");
let EmailHistoryResendHandler = exports.EmailHistoryResendHandler = class EmailHistoryResendHandler {
    emailService;
    constructor(emailService) {
        this.emailService = emailService;
    }
    async execute(command) {
        const { input, languageCode } = command;
        return await this.emailService.resendEmail(input, languageCode);
    }
};
exports.EmailHistoryResendHandler = EmailHistoryResendHandler = __decorate([
    (0, cqrs_1.CommandHandler)(email_history_resend_command_1.EmailHistoryResendCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _a : Object])
], EmailHistoryResendHandler);
//# sourceMappingURL=email-history.handler.js.map