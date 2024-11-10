import { ICommandHandler } from '@nestjs/cqrs';
import { FeatureOrganizationService } from 'feature/feature-organization.service';
import { FeatureToggleUpdateCommand } from '../feature-toggle.update.command';
export declare class FeatureToggleUpdateHandler implements ICommandHandler<FeatureToggleUpdateCommand> {
    private readonly _featureOrganizationService;
    constructor(_featureOrganizationService: FeatureOrganizationService);
    execute(command: FeatureToggleUpdateCommand): Promise<boolean>;
}
