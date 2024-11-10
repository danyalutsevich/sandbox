import { ContactOrganizationInviteStatus, ContactType, OrganizationContactBudgetTypeEnum } from '../../../plugins/contracts';
import { OrganizationContact } from "./../organization-contact.entity";
import { TenantOrganizationBaseDTO } from "../../core/dto";
declare const OrganizationContactDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Pick<OrganizationContact, "imageId">>;
export declare class OrganizationContactDTO extends OrganizationContactDTO_base {
    readonly name: string;
    readonly primaryEmail: string;
    readonly primaryPhone: string;
    readonly inviteStatus: ContactOrganizationInviteStatus;
    readonly notes: string;
    readonly contactType: ContactType;
    readonly imageUrl: string;
    readonly budget: number;
    readonly budgetType: OrganizationContactBudgetTypeEnum;
    readonly createdBy: string;
}
export {};
