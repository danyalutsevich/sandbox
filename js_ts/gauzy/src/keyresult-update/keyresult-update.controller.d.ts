import { CrudController } from './../core/crud';
import { KeyResultUpdate } from './keyresult-update.entity';
import { KeyResultUpdateService } from './keyresult-update.service';
import { IKeyResultUpdate } from '../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
import { CreateKeyresultUpdateDTO, UpdateKeyresultUpdateDTO } from './dto';
export declare class KeyResultUpdateController extends CrudController<KeyResultUpdate> {
    private readonly commandBus;
    private readonly keyResultUpdateService;
    constructor(commandBus: CommandBus, keyResultUpdateService: KeyResultUpdateService);
    create(entity: CreateKeyresultUpdateDTO): Promise<IKeyResultUpdate>;
    getAll(id: string): Promise<import("../../plugins/contracts/dist/core.model").IPagination<KeyResultUpdate>>;
    update(id: string, entity: UpdateKeyresultUpdateDTO): Promise<IKeyResultUpdate>;
    deleteBulkByKeyResultId(data: any): Promise<any>;
}
