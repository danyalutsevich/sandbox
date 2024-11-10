import { ICandidate, IContact, IEmployee, IOrganizationContact } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Contact extends TenantOrganizationBaseEntity implements IContact {
    name?: string;
    firstName?: string;
    lastName?: string;
    country?: string;
    city?: string;
    address?: string;
    address2?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    regionCode?: string;
    fax?: string;
    fiscalInformation?: string;
    website?: string;
    /**
     * Employee
     */
    employee?: IEmployee;
    /**
     * Employee
     */
    candidate?: ICandidate;
    /**
     * Organization Contact
     */
    organizationContact?: IOrganizationContact;
}
