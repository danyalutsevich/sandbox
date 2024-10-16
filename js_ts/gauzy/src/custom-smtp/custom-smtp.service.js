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
exports.CustomSmtpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_1 = require("../../plugins/common/dist/index");
const crud_1 = require("./../core/crud");
const utils_1 = require("./../email-send/utils");
const custom_smtp_entity_1 = require("./custom-smtp.entity");
const type_orm_custom_smtp_repository_1 = require("./repository/type-orm-custom-smtp.repository");
const mikro_orm_custom_smtp_repository_1 = require("./repository/mikro-orm-custom-smtp.repository");
let CustomSmtpService = exports.CustomSmtpService = class CustomSmtpService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmCustomSmtpRepository, mikroOrmCustomSmtpRepository) {
        super(typeOrmCustomSmtpRepository, mikroOrmCustomSmtpRepository);
    }
    /**
     * GET SMTP settings for tenant/organization
     *
     * @param query
     * @returns
     */
    async getSmtpSetting(query) {
        try {
            const { organizationId } = query;
            return await this.findOneByOptions({
                where: {
                    organizationId: (0, index_1.isEmpty)(organizationId) ? (0, typeorm_2.IsNull)() : organizationId
                },
                order: {
                    createdAt: 'DESC'
                }
            });
        }
        catch (error) {
            return utils_1.SMTPUtils.defaultSMTPTransporter(false);
        }
    }
    /**
     * Verifies SMTP configuration
     *
     * @param configuration
     * @returns
     */
    async verifyTransporter(transport) {
        try {
            return !!(await utils_1.SMTPUtils.verifyTransporter(transport));
        }
        catch (error) {
            console.log('Error while verifying nodemailer transport: %s', error?.message);
            return false;
        }
    }
};
exports.CustomSmtpService = CustomSmtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(custom_smtp_entity_1.CustomSmtp)),
    __metadata("design:paramtypes", [type_orm_custom_smtp_repository_1.TypeOrmCustomSmtpRepository,
        mikro_orm_custom_smtp_repository_1.MikroOrmCustomSmtpRepository])
], CustomSmtpService);
//# sourceMappingURL=custom-smtp.service.js.map