import { IOrganizationContact, IPagination } from '../../../../../plugins/contracts/dist/index';
import { IQueryHandler } from '@nestjs/cqrs';
import { FindPublicClientsByOrganizationQuery } from './../find-public-clients-by-organization.query';
import { PublicOrganizationService } from './../../public-organization.service';
export declare class FindPublicClientsByOrganizationHandler implements IQueryHandler<FindPublicClientsByOrganizationQuery> {
    private readonly publicOrganizationService;
    constructor(publicOrganizationService: PublicOrganizationService);
    execute(query: FindPublicClientsByOrganizationQuery): Promise<IPagination<IOrganizationContact>>;
}
