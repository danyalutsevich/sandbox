"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntityByMembersHandler = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
class UpdateEntityByMembersHandler {
    crudService;
    //TODO: Change CrudService<any> to be more specific
    constructor(crudService) {
        this.crudService = crudService;
    }
    async executeCommand(input) {
        try {
            const { organizationId, addedEntityIds = [], removedEntityIds = [], member } = input;
            console.log('UpdateEntityByMembersHandler called for Employee: ', member?.id, 'for organizationId: ', organizationId);
            if (addedEntityIds && addedEntityIds.length > 0) {
                const entitiesToAdd = await this.crudService.find({
                    where: {
                        id: (0, typeorm_1.In)(addedEntityIds),
                        organizationId
                    },
                    relations: {
                        members: true
                    }
                });
                for await (const entity of entitiesToAdd) {
                    const existingMembers = entity.members || [];
                    //Note: This does not really create anything, just calls repository.save on the given id.
                    //Cannot call update here because update will not update relations (members)
                    await this.crudService.create({
                        id: entity.id,
                        members: [...existingMembers, member]
                    });
                }
            }
            if (removedEntityIds && removedEntityIds.length > 0) {
                const entitiesToRemove = await this.crudService.find({
                    where: {
                        id: (0, typeorm_1.In)(removedEntityIds),
                        organizationId
                    },
                    relations: {
                        members: true
                    }
                });
                for await (const entity of entitiesToRemove) {
                    //Note: This does not really create anything, just calls repository.save on the given id.
                    //Cannot call update here because update will not update relations (members)
                    const members = (entity.members || []).filter((e) => e.id !== member.id);
                    await this.crudService.create({
                        id: entity.id,
                        members
                    });
                }
            }
            return true;
        }
        catch (error) {
            console.log('Error while updating entity by member', error);
            throw new common_1.BadRequestException(error);
        }
    }
}
exports.UpdateEntityByMembersHandler = UpdateEntityByMembersHandler;
//# sourceMappingURL=update-entity.by-member.handler.js.map