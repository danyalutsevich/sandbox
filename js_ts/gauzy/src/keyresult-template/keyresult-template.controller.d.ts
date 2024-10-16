import { IKeyResultTemplate, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { KeyResultTemplate } from './keyresult-template.entity';
import { KeyresultTemplateService } from './keyresult-template.service';
import { CreateKeyresultTemplateDTO } from './dto';
export declare class KeyresultTemplateController extends CrudController<KeyResultTemplate> {
    private readonly keyResultTemplateService;
    constructor(keyResultTemplateService: KeyresultTemplateService);
    /**
     * GET key result templates
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IKeyResultTemplate>>;
    /**
     * CREATE key result template
     *
     * @param entity
     * @returns
     */
    create(entity: CreateKeyresultTemplateDTO): Promise<IKeyResultTemplate>;
}
