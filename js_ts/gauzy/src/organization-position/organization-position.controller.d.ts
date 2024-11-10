import { IOrganizationPosition, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { OrganizationPositionService } from './organization-position.service';
import { OrganizationPosition } from './organization-position.entity';
import { UpdateOrganizationPositionDTO } from './dto';
export declare class OrganizationPositionController extends CrudController<OrganizationPosition> {
    private readonly organizationPositionService;
    constructor(organizationPositionService: OrganizationPositionService);
    /**
     * GET organization positions recurring expense
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationPosition>>;
    /**
     * UPDATE organization position by id
     *
     * @param id
     * @param body
     * @returns
     */
    update(id: string, body: UpdateOrganizationPositionDTO): Promise<IOrganizationPosition>;
}
