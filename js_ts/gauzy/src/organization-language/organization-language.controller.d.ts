import { DeepPartial, DeleteResult } from 'typeorm';
import { IOrganizationLanguage, IPagination } from '../../plugins/contracts/dist/index';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CrudController } from './../core/crud';
import { OrganizationLanguageService } from './organization-language.service';
import { OrganizationLanguage } from './organization-language.entity';
export declare class OrganizationLanguageController extends CrudController<OrganizationLanguage> {
    private readonly organizationLanguageService;
    constructor(organizationLanguageService: OrganizationLanguageService);
    /**
     * GET all organization language
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationLanguage>>;
    /**
     * CREATE organization language
     *
     * @param entity
     * @returns
     */
    create(entity: DeepPartial<OrganizationLanguage>): Promise<OrganizationLanguage>;
    /**
     * UPDATE organization language by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: QueryDeepPartialEntity<OrganizationLanguage>): Promise<any>;
    /**
     * DELETE organization language by id
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<DeleteResult>;
}
