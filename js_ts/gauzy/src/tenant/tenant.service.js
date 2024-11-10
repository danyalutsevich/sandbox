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
exports.TenantService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const crud_service_1 = require("../core/crud/crud.service");
const commands_1 = require("./commands");
const commands_2 = require("../role/commands");
const commands_3 = require("./../tasks/statuses/commands");
const import_record_1 = require("./../export-import/import-record");
const commands_4 = require("./tenant-setting/commands");
const commands_5 = require("./../tasks/sizes/commands");
const commands_6 = require("./../tasks/priorities/commands");
const commands_7 = require("./../tasks/issue-type/commands");
const repository_1 = require("./repository");
const repository_2 = require("../user/repository");
const repository_3 = require("../role/repository");
let TenantService = exports.TenantService = class TenantService extends crud_service_1.CrudService {
    typeOrmTenantRepository;
    mikroOrmTenantRepository;
    typeOrmRoleRepository;
    mikroOrmRoleRepository;
    typeOrmUserRepository;
    mikroOrmUserRepository;
    commandBus;
    configService;
    constructor(typeOrmTenantRepository, mikroOrmTenantRepository, typeOrmRoleRepository, mikroOrmRoleRepository, typeOrmUserRepository, mikroOrmUserRepository, commandBus, configService) {
        super(typeOrmTenantRepository, mikroOrmTenantRepository);
        this.typeOrmTenantRepository = typeOrmTenantRepository;
        this.mikroOrmTenantRepository = mikroOrmTenantRepository;
        this.typeOrmRoleRepository = typeOrmRoleRepository;
        this.mikroOrmRoleRepository = mikroOrmRoleRepository;
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.mikroOrmUserRepository = mikroOrmUserRepository;
        this.commandBus = commandBus;
        this.configService = configService;
    }
    /**
     * Onboards a tenant and assigns roles to a user. This involves tenant creation,
     * executing update tasks, assigning the SUPER_ADMIN role, and handling import records.
     *
     * @param entity Tenant creation details.
     * @param user User to be associated with the tenant.
     * @returns The created ITenant entity.
     */
    async onboardTenant(entity, user) {
        console.time('On Boarding Tenant');
        // Creates and saves a tenant entity from the given details.
        const tenant = await this.create(entity);
        // Create Role/Permissions to relative tenants.
        await this.commandBus.execute(new commands_2.TenantRoleBulkCreateCommand([tenant]));
        // Executes Runs update tasks for the newly created tenant.
        this.executeTenantUpdateTasks(tenant);
        // Store the unique identifier of the tenant for easy access in subsequent operations.
        const tenantId = tenant.id;
        // Find SUPER_ADMIN role to relative tenant.
        const role = await this.typeOrmRoleRepository.findOneBy({
            tenantId,
            name: index_1.RolesEnum.SUPER_ADMIN,
        });
        // Update the user entity to assign the specified tenant and role.
        await this.typeOrmUserRepository.update(user.id, {
            tenant: { id: tenantId },
            role: { id: role.id },
        });
        // Create Import Records while migrating for relative tenant.
        await this.importRecords(entity, tenant, user);
        console.timeEnd('On Boarding Tenant');
        return tenant;
    }
    /**
     * Executes a set of update tasks for a given tenant in parallel.
     *
     * @param tenant An instance of the Tenant class.
     * @returns Promise<void>
     */
    async executeTenantUpdateTasks(tenant) {
        try {
            // 2. Create Enabled/Disabled features for relative tenants.
            await this.commandBus.execute(new commands_1.TenantFeatureOrganizationCreateCommand([tenant]));
            // 3. Create Default task statuses for relative tenants.
            await this.commandBus.execute(new commands_3.TenantStatusBulkCreateCommand([tenant]));
            // 4. Create default task sizes for relative tenants.
            await this.commandBus.execute(new commands_5.TenantTaskSizeBulkCreateCommand([tenant]));
            // 5. Create default task priorities for relative tenants.
            await this.commandBus.execute(new commands_6.TenantTaskPriorityBulkCreateCommand([tenant]));
            // 6. Create default issue types for relative tenants.
            await this.commandBus.execute(new commands_7.TenantIssueTypeBulkCreateCommand([tenant]));
            // 7. Initializes and sets up the default settings for the new tenant, including configuring the file storage provider. This operation waits for completion before moving to the next step.
            await this.initializeTenantSettings(tenant);
        }
        catch (error) {
            console.log(error, 'Error occurred while executing tenant create tasks:', error.message);
        }
    }
    /**
     * Initializes settings for a new tenant, particularly setting up the file storage provider.
     * It retrieves the file system configuration and defaults to LOCAL storage if no specific
     * setting is found. Then, it executes a TenantSettingSaveCommand to save these settings for the tenant.
     *
     * @param tenant The tenant entity for which settings are being initialized.
     */
    async initializeTenantSettings(tenant) {
        const filesystem = this.configService.get('fileSystem');
        const fileStorageProvider = filesystem.name.toUpperCase();
        await this.commandBus.execute(new commands_4.TenantSettingSaveCommand({ fileStorageProvider }, tenant.id));
    }
    /**
     * Handles the creation of import records for a tenant and associated user based on migration data.
     * It checks the tenant creation input for import requirements and processes accordingly.
     *
     * @param entity Details about the tenant import.
     * @param tenant The tenant entity.
     * @param user The associated user entity.
     */
    async importRecords(entity, tenant, user) {
        const { isImporting = false, sourceId = null, userSourceId = null } = entity;
        const { id: tenantId } = tenant;
        if (isImporting && sourceId) {
            // Executes a command to either update an existing import record or create a new one for the tenant entity.
            await this.commandBus.execute(new import_record_1.ImportRecordUpdateOrCreateCommand({
                entityType: this.typeOrmTenantRepository.metadata.tableName,
                sourceId,
                destinationId: tenantId,
                tenantId
            }));
            // If a user source ID is provided, execute a command to update or create an import record for the user entity.
            if (userSourceId) {
                await this.commandBus.execute(new import_record_1.ImportRecordUpdateOrCreateCommand({
                    entityType: this.typeOrmUserRepository.metadata.tableName,
                    sourceId: userSourceId,
                    destinationId: user.id
                }, {
                    tenantId
                }));
            }
        }
    }
};
exports.TenantService = TenantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmTenantRepository,
        repository_1.MikroOrmTenantRepository,
        repository_3.TypeOrmRoleRepository,
        repository_3.MikroOrmRoleRepository,
        repository_2.TypeOrmUserRepository,
        repository_2.MikroOrmUserRepository,
        cqrs_1.CommandBus,
        index_2.ConfigService])
], TenantService);
//# sourceMappingURL=tenant.service.js.map