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
exports.EmployeeCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/contracts/dist/index");
const index_2 = require("../../../../plugins/config/dist/index");
const index_3 = require("../../../../plugins/common/dist/index");
const context_1 = require("./../../../core/context");
const auth_service_1 = require("../../../auth/auth.service");
const user_organization_services_1 = require("../../../user-organization/user-organization.services");
const employee_service_1 = require("../../employee.service");
const employee_create_command_1 = require("../employee.create.command");
const email_service_1 = require("./../../../email-send/email.service");
const commands_1 = require("./../../../user/commands");
const role_service_1 = require("./../../../role/role.service");
const user_service_1 = require("./../../../user/user.service");
let EmployeeCreateHandler = exports.EmployeeCreateHandler = class EmployeeCreateHandler {
    _commandBus;
    _employeeService;
    _userOrganizationService;
    _authService;
    _emailService;
    _roleService;
    _userService;
    constructor(_commandBus, _employeeService, _userOrganizationService, _authService, _emailService, _roleService, _userService) {
        this._commandBus = _commandBus;
        this._employeeService = _employeeService;
        this._userOrganizationService = _userOrganizationService;
        this._authService = _authService;
        this._emailService = _emailService;
        this._roleService = _roleService;
        this._userService = _userService;
    }
    /**
     * Execute the employee creation command.
     *
     * @param command - The employee creation command.
     * @returns The created employee.
     * @throws SomeAppropriateException if an error occurs during the process.
     */
    async execute(command) {
        const { input, originUrl = index_2.environment.clientBaseUrl } = command;
        const languageCode = command.languageCode || index_1.LanguagesEnum.ENGLISH;
        const { organizationId } = input;
        if ((0, index_3.isEmpty)(input.userId)) {
            // 1. Find employee role for relative tenant
            const role = await this._roleService.findOneByWhereOptions({
                name: index_1.RolesEnum.EMPLOYEE,
                tenantId: context_1.RequestContext.currentTenantId()
            });
            // 2. Get Password Hash
            const passwordHash = await this._authService.getPasswordHash(input.password);
            // 3. Create user to relative tenant.
            const user = await this._commandBus.execute(new commands_1.UserCreateCommand({
                ...input.user,
                role,
                hash: passwordHash,
                preferredLanguage: languageCode,
                preferredComponentLayout: index_1.ComponentLayoutStyleEnum.TABLE
            }));
            // 4. Create employee for specific user
            const employee = await this._employeeService.create({
                ...input,
                user,
                organization: { id: organizationId }
            });
            // 5. Assign organizations to the employee user
            if (!!employee.organizationId) {
                await this._userOrganizationService.addUserToOrganization(user, organizationId);
            }
            // 6. Send welcome email to user register employee
            this._emailService.welcomeUser(user, languageCode, organizationId, originUrl);
            return employee;
        }
        else {
            try {
                const user = await this._userService.findOneByIdString(input.userId);
                //1. Create employee for specific user
                return await this._employeeService.create({
                    ...input,
                    user,
                    organization: { id: organizationId }
                });
            }
            catch (error) {
                console.log('Error while creating employee for existing user', error);
            }
        }
    }
};
exports.EmployeeCreateHandler = EmployeeCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(employee_create_command_1.EmployeeCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        employee_service_1.EmployeeService,
        user_organization_services_1.UserOrganizationService,
        auth_service_1.AuthService,
        email_service_1.EmailService,
        role_service_1.RoleService,
        user_service_1.UserService])
], EmployeeCreateHandler);
//# sourceMappingURL=employee.create.handler.js.map