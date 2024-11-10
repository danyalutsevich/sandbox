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
exports.UserDeleteHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const user_delete_command_1 = require("./../user.delete.command");
const user_service_1 = require("./../../user.service");
let UserDeleteHandler = exports.UserDeleteHandler = class UserDeleteHandler {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async execute(command) {
        try {
            let { userId } = command;
            return await this.userService.delete(userId);
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
};
exports.UserDeleteHandler = UserDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(user_delete_command_1.UserDeleteCommand),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserDeleteHandler);
//# sourceMappingURL=user.delete.handler.js.map