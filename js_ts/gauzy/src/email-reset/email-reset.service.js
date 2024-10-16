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
exports.EmailResetService = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const context_1 = require("../core/context");
const user_service_1 = require("../user/user.service");
const crud_1 = require("../core/crud");
const email_reset_entity_1 = require("./email-reset.entity");
const constants_1 = require("./../constants");
const utils_1 = require("./../core/utils");
const commands_1 = require("./commands");
const queries_1 = require("./queries");
const email_service_1 = require("./../email-send/email.service");
const employee_service_1 = require("./../employee/employee.service");
const auth_service_1 = require("./../auth/auth.service");
const database_helper_1 = require("./../database/database.helper");
const type_orm_email_reset_repository_1 = require("./repository/type-orm-email-reset.repository");
const mikro_orm_email_reset_repository_1 = require("./repository/mikro-orm-email-reset.repository");
let EmailResetService = exports.EmailResetService = class EmailResetService extends crud_1.TenantAwareCrudService {
    userService;
    commandBus;
    queryBus;
    emailService;
    employeeService;
    authService;
    constructor(typeOrmEmailResetRepository, mikroOrmEmailResetRepository, userService, commandBus, queryBus, emailService, employeeService, authService) {
        super(typeOrmEmailResetRepository, mikroOrmEmailResetRepository);
        this.userService = userService;
        this.commandBus = commandBus;
        this.queryBus = queryBus;
        this.emailService = emailService;
        this.employeeService = employeeService;
        this.authService = authService;
    }
    async requestChangeEmail(request, languageCode) {
        try {
            let user = context_1.RequestContext.currentUser();
            user = await this.userService.findOneByIdString(user.id, {
                relations: {
                    role: true
                }
            });
            const token = await this.authService.getJwtAccessToken(user);
            /**
             * User with email already exist
             */
            if (user.email === request.email || (await this.userService.checkIfExistsEmail(request.email))) {
                return new Object({
                    status: common_1.HttpStatus.OK,
                    message: `OK`
                });
            }
            const verificationCode = (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH);
            await this.commandBus.execute(new commands_1.EmailResetCreateCommand({
                code: verificationCode,
                email: request.email,
                oldEmail: user.email,
                userId: user.id,
                token
            }));
            const employee = await this.employeeService.findOneByIdString(user.employeeId, {
                relations: {
                    organization: true
                }
            });
            const { organization } = employee;
            this.emailService.emailReset({
                ...user,
                email: request.email
            }, languageCode || user.preferredLanguage, verificationCode, organization);
        }
        finally {
            // we reply "OK" in any case for security reasons
            return new Object({
                status: common_1.HttpStatus.OK,
                message: `OK`
            });
        }
    }
    async verifyCode(request) {
        try {
            const { code } = request;
            const user = context_1.RequestContext.currentUser();
            const record = await this.queryBus.execute(new queries_1.EmailResetGetQuery({
                code,
                oldEmail: user.email,
                userId: user.id
            }));
            if (!record ||
                /**
                 * Check if other user has already registered with same email
                 */
                (await this.userService.checkIfExistsEmail(record.email))) {
                // we reply with OK, but just do not update email for the user if something is wrong
                return new Object({
                    status: common_1.HttpStatus.OK,
                    message: `OK`
                });
            }
            // we only do update if all checks completed above
            await this.userService.update({
                id: record.userId
            }, {
                email: record.email
            });
        }
        finally {
            // we reply "OK" in any case for security reasons
            return new Object({
                status: common_1.HttpStatus.OK,
                message: `OK`
            });
        }
    }
    async getEmailResetIfCodeMatches(input) {
        try {
            const query = this.typeOrmRepository.createQueryBuilder('email_reset');
            query.where((qb) => {
                qb.andWhere(input);
                qb.andWhere([
                    {
                        expiredAt: (0, typeorm_2.MoreThanOrEqual)(new Date())
                    },
                    {
                        expiredAt: (0, typeorm_2.IsNull)()
                    }
                ]);
                qb.orderBy((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."createdAt"`), 'DESC');
            });
            return await query.getOneOrFail();
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
};
exports.EmailResetService = EmailResetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(email_reset_entity_1.EmailReset)),
    __metadata("design:paramtypes", [type_orm_email_reset_repository_1.TypeOrmEmailResetRepository,
        mikro_orm_email_reset_repository_1.MikroOrmEmailResetRepository,
        user_service_1.UserService,
        cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        email_service_1.EmailService,
        employee_service_1.EmployeeService,
        auth_service_1.AuthService])
], EmailResetService);
//# sourceMappingURL=email-reset.service.js.map