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
exports.AutomationLabelSyncHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const internal_1 = require("core/entities/internal");
const context_1 = require("core/context");
const tag_entity_1 = require("./../../tag.entity");
const tag_service_1 = require("./../../tag.service");
const automation_label_sync_command_1 = require("./../automation-label.sync.command");
const type_orm_tag_repository_1 = require("../../repository/type-orm-tag.repository");
const type_orm_integration_map_repository_1 = require("../../../integration-map/repository/type-orm-integration-map.repository");
let AutomationLabelSyncHandler = exports.AutomationLabelSyncHandler = class AutomationLabelSyncHandler {
    typeOrmTagRepository;
    typeOrmIntegrationMapRepository;
    _tagService;
    constructor(typeOrmTagRepository, typeOrmIntegrationMapRepository, _tagService) {
        this.typeOrmTagRepository = typeOrmTagRepository;
        this.typeOrmIntegrationMapRepository = typeOrmIntegrationMapRepository;
        this._tagService = _tagService;
    }
    async execute(command) {
        try {
            const { input } = command;
            const { sourceId, integrationId, organizationId, entity } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            try {
                // Check if an integration map already exists for the tag
                const integrationMap = await this.typeOrmIntegrationMapRepository.findOneByOrFail({
                    entity: command.entity,
                    sourceId,
                    integrationId,
                    organizationId,
                    tenantId
                });
                // Try to find the corresponding tag
                try {
                    await this._tagService.findOneByIdString(integrationMap.gauzyId);
                    // Update the corresponding tag with the new input data
                    return await this.updateTag(integrationMap.gauzyId, {
                        ...entity,
                        organizationId,
                        tenantId
                    });
                }
                catch (error) {
                    // Create a new tag with the provided entity data
                    return await this.createTag({
                        organizationId,
                        tenantId
                    }, {
                        ...entity,
                        id: integrationMap.gauzyId
                    });
                }
            }
            catch (error) {
                // Create a tag tag with the provided entity data
                const tag = await this.createTag({ organizationId, tenantId }, entity);
                // Create a new integration map for the tag
                await this.typeOrmIntegrationMapRepository.save(this.typeOrmIntegrationMapRepository.create({
                    gauzyId: tag.id,
                    entity: command.entity,
                    integrationId,
                    sourceId,
                    organizationId,
                    tenantId
                }));
                return tag;
            }
        }
        catch (error) {
            console.log('Failed to sync in labels', error.message);
        }
    }
    /**
     * Creates a new tag within a organization.
     *
     * @param options - An object containing parameters for tag creation.
     * @returns A Promise that resolves to the newly created tag.
     */
    async createTag(options, entity) {
        try {
            // Create a new tag with the provided entity data
            const newTag = this.typeOrmTagRepository.create({
                ...entity,
                organizationId: options.organizationId,
                tenantId: options.tenantId
            });
            // Save the new tag
            const createdTag = await this.typeOrmTagRepository.save(newTag);
            return createdTag;
        }
        catch (error) {
            // Handle and log errors, and return a rejected promise or throw an exception.
            console.error('Error automation syncing a tag:', error);
        }
    }
    /**
     * Updates a tag with new data.
     *
     * @param id - The ID of the tag to update.
     * @param entity - The new data for the tag.
     * @returns A Promise that resolves to the updated tag.
     */
    async updateTag(id, entity) {
        try {
            // Find the existing tag by its ID
            const existingTag = await this._tagService.findOneByIdString(id);
            if (!existingTag) {
                return;
            }
            // Update the existing tag with the new entity data
            this.typeOrmTagRepository.merge(existingTag, entity);
            // Save the updated tag
            const updatedTag = await this.typeOrmTagRepository.save(existingTag);
            return updatedTag;
        }
        catch (error) {
            // Handle and log errors, and return a rejected promise or throw an exception.
            console.error('Error automation syncing a tag:', error);
        }
    }
};
exports.AutomationLabelSyncHandler = AutomationLabelSyncHandler = __decorate([
    (0, cqrs_1.CommandHandler)(automation_label_sync_command_1.AutomationLabelSyncCommand),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.IntegrationMap)),
    __metadata("design:paramtypes", [type_orm_tag_repository_1.TypeOrmTagRepository,
        type_orm_integration_map_repository_1.TypeOrmIntegrationMapRepository,
        tag_service_1.TagService])
], AutomationLabelSyncHandler);
//# sourceMappingURL=automation-label.sync.handler.js.map