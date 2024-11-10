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
exports.AuthRegisterHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const index_1 = require("../../../../plugins/contracts/dist/index");
const auth_register_command_1 = require("../auth.register.command");
const auth_service_1 = require("../../auth.service");
const user_service_1 = require("../../../user/user.service");
let AuthRegisterHandler = exports.AuthRegisterHandler = class AuthRegisterHandler {
    authService;
    userService;
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async execute(command) {
        const { input, languageCode } = command;
        if (input.user &&
            input.user.role &&
            input.user.role.name === index_1.RolesEnum.SUPER_ADMIN) {
            if (!input.createdById) {
                throw new common_1.BadRequestException();
            }
            ;
            const { role } = await this.userService.findOneByIdString(input.createdById, {
                relations: {
                    role: true
                }
            });
            if (role.name !== index_1.RolesEnum.SUPER_ADMIN) {
                throw new common_1.UnauthorizedException();
            }
        }
        return await this.authService.register(input, languageCode);
    }
};
exports.AuthRegisterHandler = AuthRegisterHandler = __decorate([
    (0, cqrs_1.CommandHandler)(auth_register_command_1.AuthRegisterCommand),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthRegisterHandler);
//# sourceMappingURL=auth.register.handler.js.map