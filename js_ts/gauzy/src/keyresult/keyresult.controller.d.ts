import { KeyResult } from './keyresult.entity';
import { CrudController } from './../core/crud';
import { KeyResultService } from './keyresult.service';
import { IKeyResult } from '../../plugins/contracts/dist/index';
import { CreateKeyresultDTO, KeyresultBultInputDTO, UpdateKeyresultDTO } from './dto';
export declare class KeyResultController extends CrudController<KeyResult> {
    private readonly keyResultService;
    constructor(keyResultService: KeyResultService);
    create(entity: CreateKeyresultDTO): Promise<KeyResult>;
    createBulkKeyResults(entity: KeyresultBultInputDTO): Promise<KeyResult[]>;
    getAll(findInput: string): Promise<import("../../plugins/contracts/dist/core.model").IPagination<KeyResult>>;
    update(id: string, entity: UpdateKeyresultDTO): Promise<IKeyResult>;
    delete(id: string): Promise<any>;
}
