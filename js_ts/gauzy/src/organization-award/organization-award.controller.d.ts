import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IOrganizationAward, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { OrganizationAwardService } from './organization-award.service';
import { OrganizationAward } from './organization-award.entity';
export declare class OrganizationAwardController extends CrudController<OrganizationAward> {
    private readonly organizationAwardService;
    constructor(organizationAwardService: OrganizationAwardService);
    /**
     * GET organization award
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationAward>>;
    /**
     * CREATE organization award
     *
     * @param entity
     * @returns
     */
    create(entity: DeepPartial<OrganizationAward>): Promise<OrganizationAward>;
    /**
     * UPDATE organization award by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: QueryDeepPartialEntity<OrganizationAward>): Promise<any>;
    /**
     * DELETE organization award by id
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<any>;
}
