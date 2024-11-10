import { ICommandHandler } from '@nestjs/cqrs';
import { IOrganization, ITag, ITagCreateInput, ITagUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TagService } from './../../tag.service';
import { AutomationLabelSyncCommand } from './../automation-label.sync.command';
import { TypeOrmTagRepository } from '../../repository/type-orm-tag.repository';
import { TypeOrmIntegrationMapRepository } from '../../../integration-map/repository/type-orm-integration-map.repository';
export declare class AutomationLabelSyncHandler implements ICommandHandler<AutomationLabelSyncCommand> {
    private readonly typeOrmTagRepository;
    private readonly typeOrmIntegrationMapRepository;
    private readonly _tagService;
    constructor(typeOrmTagRepository: TypeOrmTagRepository, typeOrmIntegrationMapRepository: TypeOrmIntegrationMapRepository, _tagService: TagService);
    execute(command: AutomationLabelSyncCommand): Promise<ITag>;
    /**
     * Creates a new tag within a organization.
     *
     * @param options - An object containing parameters for tag creation.
     * @returns A Promise that resolves to the newly created tag.
     */
    createTag(options: {
        organizationId: IOrganization['id'];
        tenantId: IOrganization['tenantId'];
    }, entity: ITagCreateInput | ITagUpdateInput): Promise<ITag>;
    /**
     * Updates a tag with new data.
     *
     * @param id - The ID of the tag to update.
     * @param entity - The new data for the tag.
     * @returns A Promise that resolves to the updated tag.
     */
    updateTag(id: ITagUpdateInput['id'], entity: ITagUpdateInput): Promise<ITag>;
}
