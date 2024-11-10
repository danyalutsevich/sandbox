import { ITagCreateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from './../../core/dto';
import { Tag } from './../tag.entity';
declare const CreateTagDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Pick<Tag, "name" | "description" | "color" | "textColor" | "icon" | "organizationTeamId">>;
export declare class CreateTagDTO extends CreateTagDTO_base implements ITagCreateInput {
}
export {};
