import { FindOptionsWhere } from 'typeorm';
import { IEstimateEmail } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { EstimateEmail } from './estimate-email.entity';
import { TypeOrmEstimateEmailRepository } from './repository/type-orm-estimate-email.repository';
import { MikroOrmEstimateEmailRepository } from './repository/mikro-orm-estimate-email.repository';
import { TypeOrmInvoiceRepository } from './../invoice/repository/type-orm-invoice.repository';
import { MikroOrmInvoiceRepository } from './../invoice/repository/mikro-orm-invoice.repository';
import { TypeOrmOrganizationRepository } from './../organization/repository/type-orm-organization.repository';
import { MikroOrmOrganizationRepository } from './../organization/repository/mikro-orm-organization.repository';
export declare class EstimateEmailService extends TenantAwareCrudService<EstimateEmail> {
    private typeOrmInvoiceRepository;
    private typeOrmOrganizationRepository;
    constructor(typeOrmEstimateEmailRepository: TypeOrmEstimateEmailRepository, mikroOrmEstimateEmailRepository: MikroOrmEstimateEmailRepository, typeOrmInvoiceRepository: TypeOrmInvoiceRepository, mikroOrmInvoiceRepository: MikroOrmInvoiceRepository, typeOrmOrganizationRepository: TypeOrmOrganizationRepository, mikroOrmOrganizationRepository: MikroOrmOrganizationRepository);
    createEstimateEmail(id: string, email: string): Promise<IEstimateEmail>;
    /**
     * Validate estimate email
     *
     * @param params
     * @param relations
     * @returns
     */
    validate(params: FindOptionsWhere<EstimateEmail>, relations?: string[]): Promise<IEstimateEmail>;
}
