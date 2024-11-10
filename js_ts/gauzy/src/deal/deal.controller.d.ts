import { IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { Deal } from './deal.entity';
import { DealService } from './deal.service';
export declare class DealController extends CrudController<Deal> {
    private readonly dealService;
    constructor(dealService: DealService);
    findAll(data: any): Promise<IPagination<Deal>>;
    getOne(id: string, data: any): Promise<Deal>;
}
