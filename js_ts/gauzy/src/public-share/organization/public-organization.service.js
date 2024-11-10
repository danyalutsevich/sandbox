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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicOrganizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const internal_1 = require("./../../core/entities/internal");
const type_orm_organization_repository_1 = require("organization/repository/type-orm-organization.repository");
const type_orm_organization_contact_repository_1 = require("organization-contact/repository/type-orm-organization-contact.repository");
const type_orm_organization_project_repository_1 = require("organization-project/repository/type-orm-organization-project.repository");
let PublicOrganizationService = exports.PublicOrganizationService = class PublicOrganizationService {
    typeOrmOrganizationRepository;
    typeOrmOrganizationContactRepository;
    typeOrmOrganizationProjectRepository;
    constructor(typeOrmOrganizationRepository, typeOrmOrganizationContactRepository, typeOrmOrganizationProjectRepository) {
        this.typeOrmOrganizationRepository = typeOrmOrganizationRepository;
        this.typeOrmOrganizationContactRepository = typeOrmOrganizationContactRepository;
        this.typeOrmOrganizationProjectRepository = typeOrmOrganizationProjectRepository;
    }
    /**
     * GET organization by profile link
     *
     * @param options
     * @param relations
     * @returns
     */
    async findOneByProfileLink(where, relations) {
        try {
            return await this.typeOrmOrganizationRepository.findOneOrFail({
                where,
                relations
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`The requested record was not found`);
        }
    }
    /**
     * GET all public clients by organization condition
     *
     * @param options
     * @returns
     */
    async findPublicClientsByOrganization(options) {
        try {
            const [items = [], total = 0] = await this.typeOrmOrganizationContactRepository.findAndCountBy(options);
            return { items, total };
        }
        catch (error) {
            throw new common_1.NotFoundException(`The requested public clients was not found`);
        }
    }
    /**
     * GET all public client counts by organization condition
     *
     * @param options
     * @returns
     */
    async findPublicClientCountsByOrganization(options) {
        try {
            return await this.typeOrmOrganizationContactRepository.countBy(options);
        }
        catch (error) {
            throw new common_1.NotFoundException(`The requested client counts was not found`);
        }
    }
    /**
     * GET all public project counts by organization condition
     *
     * @param options
     * @returns
     */
    async findPublicProjectCountsByOrganization(options) {
        try {
            return await this.typeOrmOrganizationProjectRepository.countBy(options);
        }
        catch (error) {
            throw new common_1.NotFoundException(`The requested project counts was not found`);
        }
    }
};
exports.PublicOrganizationService = PublicOrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.Organization)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.OrganizationContact)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.OrganizationProject)),
    __metadata("design:paramtypes", [typeof (_a = typeof type_orm_organization_repository_1.TypeOrmOrganizationRepository !== "undefined" && type_orm_organization_repository_1.TypeOrmOrganizationRepository) === "function" ? _a : Object, typeof (_b = typeof type_orm_organization_contact_repository_1.TypeOrmOrganizationContactRepository !== "undefined" && type_orm_organization_contact_repository_1.TypeOrmOrganizationContactRepository) === "function" ? _b : Object, typeof (_c = typeof type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository !== "undefined" && type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository) === "function" ? _c : Object])
], PublicOrganizationService);
//# sourceMappingURL=public-organization.service.js.map