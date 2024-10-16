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
exports.PasswordResetGetHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const password_reset_get_command_1 = require("./../password-reset.get.command");
const password_reset_service_1 = require("./../../password-reset.service");
let PasswordResetGetHandler = exports.PasswordResetGetHandler = class PasswordResetGetHandler {
    _passwordResetService;
    constructor(_passwordResetService) {
        this._passwordResetService = _passwordResetService;
    }
    async execute(command) {
        const { input } = command;
        const { token } = input;
        try {
            return await this._passwordResetService.findOneByOptions({
                where: {
                    token
                },
                order: {
                    createdAt: 'DESC'
                }
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
};
exports.PasswordResetGetHandler = PasswordResetGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(password_reset_get_command_1.PasswordResetGetCommand),
    __metadata("design:paramtypes", [password_reset_service_1.PasswordResetService])
], PasswordResetGetHandler);
//# sourceMappingURL=password-reset.get.handler.js.map