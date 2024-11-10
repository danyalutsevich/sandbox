import { ICommandHandler } from '@nestjs/cqrs';
import { ITag, ITagUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TagUpdateCommand } from './../tag-update.command';
import { TagService } from './../../tag.service';
export declare class TagUpdateHandler implements ICommandHandler<TagUpdateCommand> {
    private readonly _tagService;
    constructor(_tagService: TagService);
    /**
     * Execute the update of an existing tag based on the provided ID and input data.
     *
     * @param command - The command object containing the tag ID and update input.
     * @returns A promise that resolves to the updated tag.
     * @throws An error if the tag update fails.
     */
    execute(command: TagUpdateCommand): Promise<ITag>;
    /**
     * Update an existing tag with the specified ID and provided update data.
     *
     * @param id - The ID of the tag to update.
     * @param request - The update data for the tag.
     * @returns A promise that resolves to the updated tag.
     * @throws An error if the tag update fails.
     */
    update(id: string, request: ITagUpdateInput): Promise<ITag>;
}
