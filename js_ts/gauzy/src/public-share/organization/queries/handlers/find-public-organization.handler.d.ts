import { IQueryHandler } from '@nestjs/cqrs';
import { IOrganization } from '../../../../../plugins/contracts/dist/index';
import { FindPublicOrganizationQuery } from './../find-public-organization.query';
import { PublicOrganizationService } from './../../public-organization.service';
export declare class FindPublicOrganizationHandler implements IQueryHandler<FindPublicOrganizationQuery> {
    private readonly publicOrganizationService;
    constructor(publicOrganizationService: PublicOrganizationService);
    execute(query: FindPublicOrganizationQuery): Promise<IOrganization>;
}
