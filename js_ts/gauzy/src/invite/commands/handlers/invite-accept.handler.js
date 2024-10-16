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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteAcceptHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../plugins/contracts/dist/index");
const auth_service_1 = require("./../../../auth/auth.service");
const user_service_1 = require("./../../../user/user.service");
const employee_service_1 = require("./../../../employee/employee.service");
const invite_service_1 = require("./../../invite.service");
const invite_accept_candidate_command_1 = require("../invite.accept-candidate.command");
const invite_accept_employee_command_1 = require("../invite.accept-employee.command");
const invite_accept_user_command_1 = require("../invite.accept-user.command");
const invite_accept_command_1 = require("../invite-accept.command");
const internal_1 = require("./../../../core/entities/internal");
const type_orm_user_repository_1 = require("./../../../user/repository/type-orm-user.repository");
let InviteAcceptHandler = exports.InviteAcceptHandler = class InviteAcceptHandler {
    typeOrmUserRepository;
    commandBus;
    inviteService;
    authService;
    userService;
    employeeService;
    constructor(typeOrmUserRepository, commandBus, inviteService, authService, userService, employeeService) {
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.commandBus = commandBus;
        this.inviteService = inviteService;
        this.authService = authService;
        this.userService = userService;
        this.employeeService = employeeService;
    }
    /**
     * Accepts an invitation based on the provided command.
     * @param command The command containing the invite acceptance data.
     * @returns The authorized user.
     */
    async execute(command) {
        try {
            const { input, languageCode } = command;
            const { email, token, code } = input;
            let invite;
            // Validate invite by token or code
            if (typeof input === 'object' && 'email' in input && 'token' in input) {
                invite = await this.inviteService.validateByToken({ email, token });
            }
            else if (typeof input === 'object' && 'email' in input && 'code' in input) {
                invite = await this.inviteService.validateByCode({ email, code });
            }
            if (!invite) {
                throw Error('Invite does not exist');
            }
            // Assign role to user
            const { id: inviteId } = invite;
            const { role } = await this.inviteService.findOneByIdString(inviteId, {
                relations: { role: true }
            });
            input['user']['role'] = role;
            input['inviteId'] = inviteId;
            // Invite accept for employee, candidate & user
            let user;
            switch (role.name) {
                case index_1.RolesEnum.EMPLOYEE:
                    user = await this.commandBus.execute(new invite_accept_employee_command_1.InviteAcceptEmployeeCommand(input, languageCode));
                    return await this._authorizeUser(user);
                case index_1.RolesEnum.CANDIDATE:
                    user = await this.commandBus.execute(new invite_accept_candidate_command_1.InviteAcceptCandidateCommand(input, languageCode));
                    return await this._authorizeUser(user);
                default:
                    user = await this.commandBus.execute(new invite_accept_user_command_1.InviteAcceptUserCommand(input, languageCode));
                    return await this._authorizeUser(user);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * After accept invite authorize user
     *
     * @param user
     * @returns
     */
    async _authorizeUser(user) {
        try {
            const { id, email } = user;
            await this.typeOrmUserRepository.findOneOrFail({
                where: {
                    id,
                    email,
                    isActive: true,
                    isArchived: false
                },
                relations: {
                    role: { rolePermissions: true }
                },
                order: { createdAt: 'DESC' }
            });
            // If users are inactive
            if (user.isActive === false) {
                throw new common_1.UnauthorizedException();
            }
            // Retrieve the employee details associated with the user.
            const employee = await this.employeeService.findOneByUserId(user.id);
            // Check if the employee is active and not archived. If not, throw an error.
            if (employee && (!employee.isActive || employee.isArchived)) {
                throw new common_1.UnauthorizedException();
            }
            // Generate both access and refresh tokens concurrently for efficiency.
            const [access_token, refresh_token] = await Promise.all([
                this.authService.getJwtAccessToken(user),
                this.authService.getJwtRefreshToken(user)
            ]);
            // Store the current refresh token with the user for later validation.
            await this.userService.setCurrentRefreshToken(refresh_token, user.id);
            // Return the user object with user details, tokens, and optionally employee info if it exists.
            return {
                user: {
                    ...user,
                    ...(employee && { employee })
                },
                token: access_token,
                refresh_token: refresh_token
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.InviteAcceptHandler = InviteAcceptHandler = __decorate([
    (0, cqrs_1.CommandHandler)(invite_accept_command_1.InviteAcceptCommand),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.User)),
    __metadata("design:paramtypes", [type_orm_user_repository_1.TypeOrmUserRepository,
        cqrs_1.CommandBus,
        invite_service_1.InviteService,
        auth_service_1.AuthService,
        user_service_1.UserService,
        employee_service_1.EmployeeService])
], InviteAcceptHandler);
//# sourceMappingURL=invite-accept.handler.js.map