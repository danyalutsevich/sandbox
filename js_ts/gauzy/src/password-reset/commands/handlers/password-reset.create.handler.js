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
exports.PasswordResetCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const password_reset_create_command_1 = require("./../password-reset.create.command");
const password_reset_service_1 = require("./../../password-reset.service");
let PasswordResetCreateHandler = exports.PasswordResetCreateHandler = class PasswordResetCreateHandler {
    _passwordResetService;
    constructor(_passwordResetService) {
        this._passwordResetService = _passwordResetService;
    }
    /**
     * Execute a command to create a password reset request.
     *
     * @param {PasswordResetCreateCommand} command - The command object containing information for password reset creation.
     * @returns {Promise<any>} A Promise that resolves to the result of the password reset creation process or rejects with a BadRequestException in case of an error.
     */
    async execute(command) {
        try {
            const { input } = command;
            const { email, token, tenantId } = input;
            return await this._passwordResetService.create({
                email,
                tenantId,
                token
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Forgot password request failed!');
        }
    }
};
exports.PasswordResetCreateHandler = PasswordResetCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(password_reset_create_command_1.PasswordResetCreateCommand),
    __metadata("design:paramtypes", [password_reset_service_1.PasswordResetService])
], PasswordResetCreateHandler);
//# sourceMappingURL=password-reset.create.handler.js.map