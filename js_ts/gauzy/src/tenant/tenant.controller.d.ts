import { ITenant } from '../../plugins/contracts/dist/index';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateTenantDTO, UpdateTenantDTO } from './dto';
import { TenantService } from './tenant.service';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    /**
     * GET Owner Tenant
     *
     * @returns
     */
    findById(): Promise<ITenant>;
    /**
     * CREATE Owner Tenant
     *
     * @returns
     */
    create(entity: CreateTenantDTO): Promise<ITenant>;
    /**
     * UPDATE Owner Tenant
     *
     * @returns
     */
    update(entity: UpdateTenantDTO): Promise<ITenant | UpdateResult>;
    /**
     * DELETE Owner Tenant
     *
     * @returns
     */
    delete(): Promise<DeleteResult>;
}
