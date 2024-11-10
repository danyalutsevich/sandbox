import { DefaultValueDateTypeEnum, WeekDaysEnum } from '../../../plugins/contracts';
/**
 * Organization Setting DTO validation
 */
export declare class OrganizationSettingDTO {
    readonly defaultValueDateType: DefaultValueDateTypeEnum;
    readonly startWeekOn: WeekDaysEnum;
    readonly regionCode: string;
    /**
     * Default Organization Invite Expiry Period
     */
    readonly inviteExpiryPeriod: number;
}
