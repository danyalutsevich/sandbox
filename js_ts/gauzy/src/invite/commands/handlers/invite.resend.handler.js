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
exports.InviteResendHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const invite_service_1 = require("../../invite.service");
const invite_resend_command_1 = require("../invite.resend.command");
let InviteResendHandler = exports.InviteResendHandler = class InviteResendHandler {
    inviteService;
    constructor(inviteService) {
        this.inviteService = inviteService;
    }
    async execute(command) {
        const { input, languageCode } = command;
        return await this.inviteService.resendEmail(input, languageCode);
    }
};
exports.InviteResendHandler = InviteResendHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invite_resend_command_1.InviteResendCommand),
    __metadata("design:paramtypes", [invite_service_1.InviteService])
], InviteResendHandler);
//# sourceMappingURL=invite.resend.handler.js.map