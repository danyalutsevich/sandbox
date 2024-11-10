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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const role_entity_1 = require("./role.entity");
const context_1 = require("./../core/context");
const import_record_1 = require("./../export-import/import-record");
const repository_1 = require("./repository");
let RoleService = exports.RoleService = class RoleService extends crud_1.TenantAwareCrudService {
    typeOrmRoleRepository;
    mikroOrmRoleRepository;
    _commandBus;
    constructor(typeOrmRoleRepository, mikroOrmRoleRepository, _commandBus) {
        super(typeOrmRoleRepository, mikroOrmRoleRepository);
        this.typeOrmRoleRepository = typeOrmRoleRepository;
        this.mikroOrmRoleRepository = mikroOrmRoleRepository;
        this._commandBus = _commandBus;
    }
    /**
     * Creates multiple roles for each tenant and saves them.
     * @param tenants - An array of tenants for which roles will be created.
     * @returns A promise that resolves to an array of created roles.
     */
    async createBulk(tenants) {
        const roles = [];
        const rolesNames = Object.values(index_1.RolesEnum);
        for await (const tenant of tenants) {
            for await (const name of rolesNames) {
                const role = new role_entity_1.Role();
                role.name = name;
                role.tenant = tenant;
                role.isSystem = index_1.SYSTEM_DEFAULT_ROLES.includes(name);
                roles.push(role);
            }
        }
        return await this.typeOrmRepository.save(roles);
    }
    async migrateRoles() {
        const roles = await this.typeOrmRepository.find({
            where: {
                tenantId: context_1.RequestContext.currentTenantId()
            }
        });
        const payload = [];
        for await (const item of roles) {
            const { id: sourceId, name } = item;
            payload.push({
                name,
                isImporting: true,
                sourceId
            });
        }
        return payload;
    }
    async migrateImportRecord(roles) {
        let records = [];
        for await (const item of roles) {
            const { isImporting, sourceId, name } = item;
            if (isImporting && sourceId) {
                const destination = await this.typeOrmRepository.findOne({
                    where: {
                        tenantId: context_1.RequestContext.currentTenantId(),
                        name
                    },
                    order: {
                        createdAt: 'DESC'
                    }
                });
                if (destination) {
                    records.push(await this._commandBus.execute(new import_record_1.ImportRecordUpdateOrCreateCommand({
                        entityType: this.typeOrmRepository.metadata.tableName,
                        sourceId,
                        destinationId: destination.id,
                        tenantId: context_1.RequestContext.currentTenantId()
                    })));
                }
            }
        }
        return records;
    }
    /**
     * Few Roles can't be removed/delete for tenant
     * RolesEnum.SUPER_ADMIN, RolesEnum.ADMIN, RolesEnum.EMPLOYEE, RolesEnum.VIEWER, RolesEnum.CANDIDATE
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await super.delete({
            id,
            isSystem: false,
            name: (0, typeorm_1.Not)((0, typeorm_1.In)(index_1.SYSTEM_DEFAULT_ROLES))
        });
    }
};
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmRoleRepository,
        repository_1.MikroOrmRoleRepository,
        cqrs_1.CommandBus])
], RoleService);
//# sourceMappingURL=role.service.js.map