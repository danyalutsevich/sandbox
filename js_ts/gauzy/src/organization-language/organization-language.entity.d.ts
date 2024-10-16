import { IOrganizationLanguage } from '../../plugins/contracts/dist/index';
import { Language, TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class OrganizationLanguage extends TenantOrganizationBaseEntity implements IOrganizationLanguage {
    language: Language;
    languageCode: string;
    name: string;
    level: string;
}
