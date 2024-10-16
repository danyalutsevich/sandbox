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
exports.FindInviteByEmailTokenHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const invite_service_1 = require("../../invite.service");
const find_invite_by_email_token_query_1 = require("../find-invite-by-email-token.query");
let FindInviteByEmailTokenHandler = exports.FindInviteByEmailTokenHandler = class FindInviteByEmailTokenHandler {
    inviteService;
    constructor(inviteService) {
        this.inviteService = inviteService;
    }
    async execute(query) {
        const { params } = query;
        try {
            return await this.inviteService.validateByToken(params);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.FindInviteByEmailTokenHandler = FindInviteByEmailTokenHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_invite_by_email_token_query_1.FindInviteByEmailTokenQuery),
    __metadata("design:paramtypes", [invite_service_1.InviteService])
], FindInviteByEmailTokenHandler);
//# sourceMappingURL=find-invite-by-email-token.handler.js.map