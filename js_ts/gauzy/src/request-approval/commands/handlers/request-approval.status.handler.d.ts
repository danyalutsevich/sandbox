import { ICommandHandler } from '@nestjs/cqrs';
import { RequestApprovalStatusCommand } from '../request-approval.status.command';
import { RequestApproval } from '../../request-approval.entity';
import { RequestApprovalService } from '../../request-approval.service';
import { EquipmentSharingService } from '../../../equipment-sharing';
import { TimeOffRequestService } from '../../../time-off-request/time-off-request.service';
export declare class RequestApprovalStatusHandler implements ICommandHandler<RequestApprovalStatusCommand> {
    private requestApprovalService;
    private equipmentSharingService;
    private timeOffRequestService;
    constructor(requestApprovalService: RequestApprovalService, equipmentSharingService: EquipmentSharingService, timeOffRequestService: TimeOffRequestService);
    execute(command?: RequestApprovalStatusCommand): Promise<RequestApproval>;
}
