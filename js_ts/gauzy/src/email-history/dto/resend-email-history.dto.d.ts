import { IEmailHistory, IResendEmailInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from '../../core/dto';
export declare class ResendEmailHistoryDTO extends TenantOrganizationBaseDTO implements IResendEmailInput {
    readonly id: IEmailHistory['id'];
}
