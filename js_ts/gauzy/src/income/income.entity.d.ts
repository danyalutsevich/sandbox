import { IIncome, IEmployee, ITag, IOrganizationContact } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class Income extends TenantOrganizationBaseEntity implements IIncome {
    amount: number;
    currency: string;
    valueDate?: Date;
    notes?: string;
    isBonus: boolean;
    reference?: string;
    /**
     * Employee
     */
    employee?: IEmployee;
    employeeId?: string;
    /**
     * Client
     */
    client?: IOrganizationContact;
    clientId?: string;
    /**
    * Tag
    */
    tags: ITag[];
}
