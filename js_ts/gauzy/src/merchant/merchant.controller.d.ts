import { IMerchant, IPagination } from '../../plugins/contracts/dist/index';
import { FindOptionsWhere } from 'typeorm';
import { CrudController, PaginationParams } from './../core/crud';
import { Merchant } from './merchant.entity';
import { MerchantService } from './merchant.service';
import { RelationsQueryDTO } from './../shared/dto';
import { CreateMerchantDTO, UpdateMerchantDTO } from './dto';
export declare class MerchantController extends CrudController<Merchant> {
    private readonly merchantService;
    constructor(merchantService: MerchantService);
    /**
     * GET merchant stores count
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<Merchant>): Promise<IPagination<Merchant>['total']>;
    /**
     * GET merchant stores by pagination
     *
     * @param params
     * @returns
     */
    pagination(params: PaginationParams<Merchant>): Promise<IPagination<IMerchant>>;
    /**
     * GET merchant stores
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<Merchant>): Promise<IPagination<IMerchant>>;
    /**
     * GET merchant by id
     *
     * @param id
     * @param query
     * @returns
     */
    findById(id: IMerchant['id'], query: RelationsQueryDTO): Promise<IMerchant>;
    /**
     * CREATE new merchant store
     *
     * @param entity
     * @returns
     */
    create(entity: CreateMerchantDTO): Promise<IMerchant>;
    /**
     * UPDATE merchant store by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: IMerchant['id'], entity: UpdateMerchantDTO): Promise<IMerchant>;
}
