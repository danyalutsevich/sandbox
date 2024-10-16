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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTeamJoinRequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/contracts/dist/index");
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("./../constants");
const crud_1 = require("./../core/crud");
const utils_1 = require("./../core/utils");
const context_1 = require("./../core/context");
const internal_1 = require("./../core/entities/internal");
const email_service_1 = require("./../email-send/email.service");
const organization_team_join_request_entity_1 = require("./organization-team-join-request.entity");
const organization_team_service_1 = require("./../organization-team/organization-team.service");
const invite_service_1 = require("./../invite/invite.service");
const role_service_1 = require("./../role/role.service");
const employee_service_1 = require("./../employee/employee.service");
const type_orm_organization_team_join_request_repository_1 = require("./repository/type-orm-organization-team-join-request.repository");
const mikro_orm_organization_team_join_request_repository_1 = require("./repository/mikro-orm-organization-team-join-request.repository");
const type_orm_user_repository_1 = require("../user/repository/type-orm-user.repository");
const mikro_orm_user_repository_1 = require("../user/repository/mikro-orm-user.repository");
const type_orm_organization_team_employee_repository_1 = require("organization-team-employee/repository/type-orm-organization-team-employee.repository");
const mikro_orm_organization_team_employee_repository_1 = require("organization-team-employee/repository/mikro-orm-organization-team-employee.repository");
let OrganizationTeamJoinRequestService = exports.OrganizationTeamJoinRequestService = class OrganizationTeamJoinRequestService extends crud_1.TenantAwareCrudService {
    typeOrmUserRepository;
    typeOrmOrganizationTeamEmployeeRepository;
    _employeeService;
    _organizationTeamService;
    _emailService;
    _inviteService;
    _roleService;
    constructor(typeOrmOrganizationTeamJoinRequestRepository, mikroOrmOrganizationTeamJoinRequestRepository, typeOrmUserRepository, mikroOrmUserRepository, typeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository, _employeeService, _organizationTeamService, _emailService, _inviteService, _roleService) {
        super(typeOrmOrganizationTeamJoinRequestRepository, mikroOrmOrganizationTeamJoinRequestRepository);
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.typeOrmOrganizationTeamEmployeeRepository = typeOrmOrganizationTeamEmployeeRepository;
        this._employeeService = _employeeService;
        this._organizationTeamService = _organizationTeamService;
        this._emailService = _emailService;
        this._inviteService = _inviteService;
        this._roleService = _roleService;
    }
    /**
     *
     * @param options
     * @returns
     */
    async findAll(options) {
        return await super.findAll(options);
    }
    /**
     * Create organization team join request
     *
     * @param entity
     * @param languageCode
     * @returns
     */
    async create(entity, languageCode) {
        const { organizationTeamId, email } = entity;
        /** find existing team join request and throw exception */
        const request = await this.typeOrmRepository.countBy({
            organizationTeamId,
            email
        });
        if (request > 0) {
            throw new common_1.ConflictException('You have sent already join request for this team, please wait for manager response.');
        }
        /** Create new team join request */
        try {
            const organizationTeam = await this._organizationTeamService.findOneByIdString(organizationTeamId, {
                where: {
                    public: true
                },
                relations: {
                    organization: true
                }
            });
            const { organization, organizationId, tenantId } = organizationTeam;
            const code = (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH);
            const payload = {
                email,
                tenantId,
                organizationId,
                organizationTeamId,
                code
            };
            /** Generate JWT token using above JWT payload */
            const token = (0, jsonwebtoken_1.sign)(payload, index_1.environment.JWT_SECRET, {
                expiresIn: `${index_1.environment.TEAM_JOIN_REQUEST_EXPIRATION_TIME}s`
            });
            /**
             * Creates a new entity instance and copies all entity properties from this object into a new entity.
             * Note that it copies only properties that are present in entity schema.
             */
            const createEntityLike = this.typeOrmRepository.create({
                organizationTeamId,
                email,
                organizationId,
                tenantId,
                code,
                token,
                status: null
            });
            const organizationTeamJoinRequest = await this.typeOrmRepository.save(createEntityLike);
            /** Place here organization team join request email to send verification code*/
            let { appName, appLogo, appSignature, appLink, companyLink, companyName } = entity;
            this._emailService.organizationTeamJoinRequest(organizationTeam, organizationTeamJoinRequest, languageCode, organization, {
                appName,
                appLogo,
                appSignature,
                appLink,
                companyLink,
                companyName
            });
            return organizationTeamJoinRequest;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error while requesting join organization team');
        }
    }
    /**
     * Validate organization team join request
     *
     * @param options
     * @returns
     */
    async validateJoinRequest(options) {
        const { email, token, code, organizationTeamId } = options;
        try {
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.setFindOptions({
                select: {
                    id: true,
                    email: true,
                    organizationTeamId: true
                }
            });
            query.where((qb) => {
                qb.andWhere({
                    email,
                    organizationTeamId,
                    expiredAt: (0, typeorm_2.MoreThanOrEqual)(new Date()),
                    status: (0, typeorm_2.IsNull)()
                });
                qb.andWhere([
                    {
                        code
                    },
                    {
                        token
                    }
                ]);
            });
            const record = await query.getOneOrFail();
            await this.typeOrmRepository.update(record.id, {
                status: index_2.OrganizationTeamJoinRequestStatusEnum.REQUESTED
            });
            delete record.id;
            return record;
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async resendConfirmationCode(entity, languageCode) {
        const { organizationTeamId, email } = entity;
        try {
            /** find existing team join request */
            const request = await this.typeOrmRepository.findOneOrFail({
                where: {
                    organizationTeamId,
                    email,
                    status: (0, typeorm_2.IsNull)()
                },
                relations: {
                    organizationTeam: {
                        organization: true
                    }
                }
            });
            const code = (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH);
            const payload = {
                email,
                tenantId: request.tenantId,
                organizationId: request.organizationId,
                organizationTeamId,
                code
            };
            /** Generate JWT token using above JWT payload */
            const token = (0, jsonwebtoken_1.sign)(payload, index_1.environment.JWT_SECRET, {
                expiresIn: `${index_1.environment.TEAM_JOIN_REQUEST_EXPIRATION_TIME}s`
            });
            /** Update code, token and expiredAt */
            await this.typeOrmRepository.update(request.id, {
                code,
                token,
                expiredAt: (0, moment_1.default)(new Date()).add(index_1.environment.TEAM_JOIN_REQUEST_EXPIRATION_TIME, 'seconds').toDate()
            });
            /** Place here organization team join request email to send verification code*/
            let { appName, appLogo, appSignature, appLink, companyLink, companyName } = entity;
            this._emailService.organizationTeamJoinRequest(request.organizationTeam, {
                ...request,
                code,
                token
            }, languageCode, request.organizationTeam.organization, {
                appName,
                appLogo,
                appSignature,
                appLink,
                companyLink,
                companyName
            });
        }
        finally {
            return new Object({
                status: common_1.HttpStatus.OK,
                message: `OK`
            });
        }
    }
    async acceptRequestToJoin(id, action, languageCode) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const currentUserId = context_1.RequestContext.currentUserId();
        const request = await this.typeOrmRepository.findOne({
            where: {
                id,
                tenantId
            }
        });
        if (!request) {
            throw new common_1.NotFoundException('Request not found.');
        }
        /**
         * ACCEPTED
         */
        if (action === index_2.OrganizationTeamJoinRequestStatusEnum.ACCEPTED) {
            /**
             * Fetch user if already present in current tenant
             */
            let currentTenantUser = await this.typeOrmUserRepository.findOne({
                where: {
                    email: request.email,
                    tenantId
                },
                relations: {
                    tenant: true,
                    role: true
                }
            });
            /**
             * Accepted Case - 1
             * Current user is already part of tenant as separate user
             */
            if (currentTenantUser) {
                const employee = await this._employeeService.findOneByOptions({
                    where: {
                        userId: currentTenantUser.id
                    }
                });
                /**
                 * Check if user is already part of requested team
                 */
                let employeePresentInTeam = null;
                if (employee) {
                    employeePresentInTeam = await this._organizationTeamService.findOneByWhereOptions({
                        members: {
                            employeeId: employee.id
                        },
                        id: request.organizationTeamId
                    });
                }
                /**
                 * Add employee to team
                 */
                if (!employeePresentInTeam && employee) {
                    await this.typeOrmOrganizationTeamEmployeeRepository.save({
                        employeeId: employee.id,
                        organizationTeamId: request.organizationTeamId,
                        tenantId,
                        organizationId: request.organizationId
                    });
                    await this.typeOrmRepository.update(id, {
                        status: index_2.OrganizationTeamJoinRequestStatusEnum.ACCEPTED,
                        userId: currentTenantUser.id
                    });
                }
            }
            /**
             * Accepted Case - 2
             * Current user is not belong to this tenant
             */
            if (!currentTenantUser) {
                const names = request?.fullName?.split(' ');
                const role = await this._roleService.findOneByWhereOptions({
                    name: index_2.RolesEnum.EMPLOYEE
                });
                const newTenantUser = await this._inviteService.createUser({
                    user: {
                        firstName: (names && names.length && names[0]) || '',
                        lastName: (names && names.length && names[1]) || '',
                        email: request.email,
                        tenantId: tenantId,
                        role: role
                    },
                    organizationId: request.organizationId,
                    createdById: currentUserId
                }, request.organizationTeamId, languageCode);
                await this.typeOrmRepository.update(id, {
                    status: index_2.OrganizationTeamJoinRequestStatusEnum.ACCEPTED,
                    userId: newTenantUser.id
                });
            }
        }
        /**
         * REJECTED
         */
        if (action === index_2.OrganizationTeamJoinRequestStatusEnum.REJECTED) {
            await this.typeOrmRepository.update(id, {
                status: index_2.OrganizationTeamJoinRequestStatusEnum.REJECTED
            });
        }
    }
};
exports.OrganizationTeamJoinRequestService = OrganizationTeamJoinRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_team_join_request_entity_1.OrganizationTeamJoinRequest)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeamEmployee)),
    __metadata("design:paramtypes", [type_orm_organization_team_join_request_repository_1.TypeOrmOrganizationTeamJoinRequestRepository,
        mikro_orm_organization_team_join_request_repository_1.MikroOrmOrganizationTeamJoinRequestRepository,
        type_orm_user_repository_1.TypeOrmUserRepository,
        mikro_orm_user_repository_1.MikroOrmUserRepository, typeof (_a = typeof type_orm_organization_team_employee_repository_1.TypeOrmOrganizationTeamEmployeeRepository !== "undefined" && type_orm_organization_team_employee_repository_1.TypeOrmOrganizationTeamEmployeeRepository) === "function" ? _a : Object, typeof (_b = typeof mikro_orm_organization_team_employee_repository_1.MikroOrmOrganizationTeamEmployeeRepository !== "undefined" && mikro_orm_organization_team_employee_repository_1.MikroOrmOrganizationTeamEmployeeRepository) === "function" ? _b : Object, employee_service_1.EmployeeService,
        organization_team_service_1.OrganizationTeamService,
        email_service_1.EmailService,
        invite_service_1.InviteService,
        role_service_1.RoleService])
], OrganizationTeamJoinRequestService);
//# sourceMappingURL=organization-team-join-request.service.js.map