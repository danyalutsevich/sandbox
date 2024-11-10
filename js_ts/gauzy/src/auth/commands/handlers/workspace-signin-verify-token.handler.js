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
exports.WorkspaceSigninVerifyTokenHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const workspace_signin_verify_token_command_1 = require("../workspace-signin-verify-token.command");
const auth_service_1 = require("../../auth.service");
let WorkspaceSigninVerifyTokenHandler = exports.WorkspaceSigninVerifyTokenHandler = class WorkspaceSigninVerifyTokenHandler {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async execute(command) {
        try {
            const { input } = command;
            return await this.authService.workspaceSigninVerifyToken(input);
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.WorkspaceSigninVerifyTokenHandler = WorkspaceSigninVerifyTokenHandler = __decorate([
    (0, cqrs_1.CommandHandler)(workspace_signin_verify_token_command_1.WorkspaceSigninVerifyTokenCommand),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], WorkspaceSigninVerifyTokenHandler);
//# sourceMappingURL=workspace-signin-verify-token.handler.js.map