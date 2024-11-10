import { ITagUpdateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from './../../core/dto';
import { Tag } from './../tag.entity';
declare const UpdateTagDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Partial<Pick<Tag, keyof Tag>>>;
export declare class UpdateTagDTO extends UpdateTagDTO_base implements ITagUpdateInput {
}
export {};
