import { ICommandHandler } from "@nestjs/cqrs";
import { ITag, ITagCreateInput } from '../../../../plugins/contracts/dist/index';
import { TagCreateCommand } from "./../tag-create.command";
import { TagService } from "./../../tag.service";
export declare class TagCreateHandler implements ICommandHandler<TagCreateCommand> {
    private readonly _tagService;
    constructor(_tagService: TagService);
    /**
    * Execute the creation of a new tag based on the provided input data.
    *
    * @param command - The command object containing the tag creation input.
    * @returns A promise that resolves to the newly created tag.
    * @throws An error if the tag creation fails.
    */
    execute(command: TagCreateCommand): Promise<ITag>;
    /**
     * Create a new tag based on the provided input data.
     *
     * @param request - The input data for creating a new tag.
     * @returns A promise that resolves to the newly created tag.
     * @throws An error if the tag creation fails.
     */
    create(request: ITagCreateInput): Promise<ITag>;
}
