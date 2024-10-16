import { IMerchant } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { Merchant } from './merchant.entity';
import { MikroOrmMerchantRepository } from './repository/mikro-orm-merchant.repository';
import { TypeOrmMerchantRepository } from './repository/type-orm-merchant.repository';
export declare class MerchantService extends TenantAwareCrudService<Merchant> {
    constructor(typeOrmMerchantRepository: TypeOrmMerchantRepository, mikroOrmMerchantRepository: MikroOrmMerchantRepository);
    findById(id: IMerchant['id'], relations?: string[]): Promise<IMerchant>;
    update(id: IMerchant['id'], merchant: Merchant): Promise<IMerchant>;
}
