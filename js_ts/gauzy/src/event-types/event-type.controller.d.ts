import { IEventType, IEventTypeCreateInput, IPagination } from '../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { CrudController, PaginationParams } from './../core/crud';
import { EventType } from './event-type.entity';
import { EventTypeService } from './event-type.service';
export declare class EventTypeController extends CrudController<EventType> {
    private readonly eventTypeService;
    private readonly commandBus;
    constructor(eventTypeService: EventTypeService, commandBus: CommandBus);
    /**
     * GET event types counts
     *
     * @param filter
     * @returns
     */
    getCount(options: FindOptionsWhere<EventType>): Promise<number>;
    /**
     * GET event types pagination
     *
     * @param filter
     * @returns
     */
    pagination(filter: PaginationParams<EventType>): Promise<IPagination<IEventType>>;
    /**
     * GET all event types
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IEventType>>;
    /**
     * GET event type by id
     *
     * @param id
     * @param data
     * @returns
     */
    findById(id: string, data?: any): Promise<IEventType>;
    /**
     * CREATE new event type
     *
     * @param entity
     * @returns
     */
    create(entity: IEventTypeCreateInput): Promise<IEventType>;
    /**
     * UPDATE event type by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: EventType): Promise<IEventType>;
}
