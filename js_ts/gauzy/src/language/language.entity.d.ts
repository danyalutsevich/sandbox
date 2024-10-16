import { ILanguage, IOrganizationLanguage } from '../../plugins/contracts/dist/index';
import { BaseEntity } from '../core/entities/internal';
export declare class Language extends BaseEntity implements ILanguage {
    name?: string;
    code?: string;
    is_system?: boolean;
    description?: string;
    color?: string;
    organizationLanguages?: IOrganizationLanguage[];
}
