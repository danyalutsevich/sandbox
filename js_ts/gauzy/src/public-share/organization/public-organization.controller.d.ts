import { QueryBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { IOrganization, IOrganizationContact, IPagination } from '../../../plugins/contracts';
import { Organization } from './../../core/entities/internal';
import { TenantOrganizationBaseDTO } from './../../core/dto';
import { PublicOrganizationQueryDTO } from './dto/public-organization-query.dto';
import { PublicOrganizationService } from './public-organization.service';
export declare class PublicOrganizationController {
    private readonly queryBus;
    private readonly publicOrganizationService;
    constructor(queryBus: QueryBus, publicOrganizationService: PublicOrganizationService);
    /**
     * GET public clients in the specific organization
     *
     * @param options
     * @returns
     */
    findPublicClientsByOrganization(options: TenantOrganizationBaseDTO): Promise<IPagination<IOrganizationContact>>;
    /**
     * GET public clients counts in the specific organization
     *
     * @param options
     * @returns
     */
    findPublicClientCountsByOrganization(options: TenantOrganizationBaseDTO): Promise<Number>;
    /**
     * GET public clients counts in the specific organization
     *
     * @param options
     * @returns
     */
    findPublicProjectCountsByOrganization(options: TenantOrganizationBaseDTO): Promise<Number>;
    /**
     * GET organization by profile link
     *
     * @param profile_link
     * @returns
     */
    findOneByProfileLink(params: FindOptionsWhere<Organization>, options: PublicOrganizationQueryDTO): Promise<IOrganization>;
}
