import { IOrganization } from '../../../plugins/contracts';
import { ICommand } from '@nestjs/cqrs';
export declare class ReportOrganizationCreateCommand implements ICommand {
    readonly input: IOrganization;
    static readonly type = "[Report] Organization Create";
    constructor(input: IOrganization);
}
