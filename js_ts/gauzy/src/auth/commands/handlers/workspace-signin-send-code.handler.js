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
exports.WorkspaceSigninSendCodeCommandHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const workspace_signin_send_code_command_1 = require("../workspace-signin-send-code.command");
const auth_service_1 = require("../../auth.service");
let WorkspaceSigninSendCodeCommandHandler = exports.WorkspaceSigninSendCodeCommandHandler = class WorkspaceSigninSendCodeCommandHandler {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async execute(command) {
        try {
            const { input, locale = index_1.LanguagesEnum.ENGLISH } = command;
            await this.authService.sendWorkspaceSigninCode(input, locale);
        }
        finally {
            return new Object({
                status: common_1.HttpStatus.OK,
                message: `OK`
            });
        }
    }
};
exports.WorkspaceSigninSendCodeCommandHandler = WorkspaceSigninSendCodeCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(workspace_signin_send_code_command_1.WorkspaceSigninSendCodeCommand),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], WorkspaceSigninSendCodeCommandHandler);
//# sourceMappingURL=workspace-signin-send-code.handler.js.map