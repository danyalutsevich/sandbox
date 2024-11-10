import { IAvailabilitySlot, IAvailabilitySlotsCreateInput, IPagination } from '../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
import { CrudController } from './../core/crud';
import { AvailabilitySlot } from './availability-slots.entity';
import { AvailabilitySlotsService } from './availability-slots.service';
export declare class AvailabilitySlotsController extends CrudController<AvailabilitySlot> {
    private readonly availabilitySlotsService;
    private readonly commandBus;
    constructor(availabilitySlotsService: AvailabilitySlotsService, commandBus: CommandBus);
    /**
     * CREATE slots in bulk
     *
     * @param entity
     * @returns
     */
    createBulkAvailabilitySlot(entity: IAvailabilitySlotsCreateInput[]): Promise<IAvailabilitySlot[]>;
    /**
     * GET all availability slots
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IAvailabilitySlot>>;
    /**
     * CREATE new availability slot
     *
     * @param entity
     * @param options
     * @returns
     */
    create(entity: IAvailabilitySlotsCreateInput): Promise<IAvailabilitySlot>;
    /**
     * UPDATE availability slot by id
     *
     * @param id
     * @param entity
     * @param options
     * @returns
     */
    update(id: string, entity: IAvailabilitySlot): Promise<IAvailabilitySlot>;
}
