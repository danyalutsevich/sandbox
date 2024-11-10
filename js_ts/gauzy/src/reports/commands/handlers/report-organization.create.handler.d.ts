import { ICommandHandler } from '@nestjs/cqrs';
import { ReportOrganizationCreateCommand } from '../report-organization-create.command';
import { ReportOrganizationService } from '../../report-organization.service';
export declare class ReportOrganizationCreateHandler implements ICommandHandler<ReportOrganizationCreateCommand> {
    private readonly _reportOrganizationService;
    constructor(_reportOrganizationService: ReportOrganizationService);
    /**
     * Executes the creation of multiple report organization entries.
     *
     * @param event The event containing input data for creating report organization entries.
     * @returns A promise that resolves to the result of bulk creation of report organization entries.
     */
    execute(event: ReportOrganizationCreateCommand): Promise<import("../../report-organization.entity").ReportOrganization[]>;
}
