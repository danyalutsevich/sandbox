import { CommandBus } from '@nestjs/cqrs';
import { FeatureInterface } from 'unleash-client/lib/feature';
import { IFeature, IFeatureOrganization, IPagination } from '../../plugins/contracts/dist/index';
import { FeatureService } from './feature.service';
import { FeatureOrganizationService } from './feature-organization.service';
import { RelationsQueryDTO } from './../shared/dto';
import { CreateFeatureToggleDTO } from './dto';
import { FeatureOrganizationQueryDTO } from './dto/feature-organization-query.dto';
export declare class FeatureToggleController {
    private readonly _featureService;
    private readonly _featureOrganizationService;
    private readonly _commandBus;
    constructor(_featureService: FeatureService, _featureOrganizationService: FeatureOrganizationService, _commandBus: CommandBus);
    getFeatureToggleDefinitions(): Promise<FeatureInterface[]>;
    getParentFeatureList(options: RelationsQueryDTO): Promise<IPagination<IFeature>>;
    getFeaturesOrganization(params: FeatureOrganizationQueryDTO): Promise<IPagination<IFeatureOrganization>>;
    findAll(): Promise<IPagination<IFeature>>;
    enabledDisabledFeature(input: CreateFeatureToggleDTO): Promise<boolean>;
}
