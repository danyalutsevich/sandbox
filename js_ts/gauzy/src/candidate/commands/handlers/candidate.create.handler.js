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
exports.CandidateCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const index_1 = require("../../../../plugins/contracts/dist/index");
const index_2 = require("../../../../plugins/config/dist/index");
const commands_1 = require("./../../../user/commands");
const candidate_create_command_1 = require("../candidate.create.command");
const auth_service_1 = require("./../../../auth/auth.service");
const candidate_service_1 = require("../../candidate.service");
const role_service_1 = require("./../../../role/role.service");
const user_organization_services_1 = require("./../../../user-organization/user-organization.services");
const email_service_1 = require("./../../../email-send/email.service");
let CandidateCreateHandler = exports.CandidateCreateHandler = class CandidateCreateHandler {
    _commandBus;
    _authService;
    _candidateService;
    _roleService;
    _userOrganizationService;
    _emailService;
    constructor(_commandBus, _authService, _candidateService, _roleService, _userOrganizationService, _emailService) {
        this._commandBus = _commandBus;
        this._authService = _authService;
        this._candidateService = _candidateService;
        this._roleService = _roleService;
        this._userOrganizationService = _userOrganizationService;
        this._emailService = _emailService;
    }
    /**
     * Executes the candidate creation process.
     *
     * @param command - The command containing the necessary information to create a candidate.
     * @returns A promise that resolves to the created candidate.
     * @throws BadRequestException if any error occurs during the candidate creation process.
     */
    async execute(command) {
        try {
            const { input, originUrl = index_2.environment.clientBaseUrl, languageCode } = command;
            // Find candidate role for the relative tenant
            const role = await this._roleService.findOneByWhereOptions({
                name: index_1.RolesEnum.CANDIDATE
            });
            // 1. Create user to relative candidate for specific tenant.
            const user = await this._commandBus.execute(new commands_1.UserCreateCommand({
                ...input.user,
                role,
                hash: await this._authService.getPasswordHash(input.password),
                preferredLanguage: languageCode || index_1.LanguagesEnum.ENGLISH,
                preferredComponentLayout: index_1.ComponentLayoutStyleEnum.TABLE
            }));
            // 2. Create candidate for specific user
            const candidate = await this._candidateService.create({
                ...input,
                status: index_1.CandidateStatusEnum.APPLIED,
                user
            });
            // 3. Assign organization to the candidate user
            if (candidate.organizationId) {
                await this._userOrganizationService.addUserToOrganization(user, candidate.organizationId);
            }
            // 4. Send welcome email to candidate user
            this._emailService.welcomeUser(user, languageCode, candidate.organizationId, originUrl);
            return candidate;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.CandidateCreateHandler = CandidateCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_create_command_1.CandidateCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        auth_service_1.AuthService,
        candidate_service_1.CandidateService,
        role_service_1.RoleService,
        user_organization_services_1.UserOrganizationService,
        email_service_1.EmailService])
], CandidateCreateHandler);
//# sourceMappingURL=candidate.create.handler.js.map