import { TenantAwareCrudService } from './../core/crud';
import { Deal } from './deal.entity';
import { TypeOrmDealRepository } from './repository/type-orm-deal.repository';
import { MikroOrmDealRepository } from './repository/mikro-orm-deal.repository';
export declare class DealService extends TenantAwareCrudService<Deal> {
    readonly typeOrmDealRepository: TypeOrmDealRepository;
    readonly mikroOrmDealRepository: MikroOrmDealRepository;
    constructor(typeOrmDealRepository: TypeOrmDealRepository, mikroOrmDealRepository: MikroOrmDealRepository);
}
