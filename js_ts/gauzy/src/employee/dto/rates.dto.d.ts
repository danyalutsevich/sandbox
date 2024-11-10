import { PayPeriodEnum } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from './../../core/dto';
/**
 * Update Employee/Candidate Rates DTO
 */
export declare class RatesDTO extends TenantOrganizationBaseDTO {
    readonly payPeriod?: PayPeriodEnum;
    readonly billRateValue?: number;
    readonly minimumBillingRate?: number;
    readonly reWeeklyLimit?: number;
    readonly billRateCurrency?: string;
}
