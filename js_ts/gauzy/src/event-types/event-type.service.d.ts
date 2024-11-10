import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmEventTypeRepository } from './repository/type-orm-event-types.repository';
import { MikroOrmEventTypeRepository } from './repository/mikro-orm-event-type.repository';
import { EventType } from './event-type.entity';
export declare class EventTypeService extends TenantAwareCrudService<EventType> {
    constructor(typeOrmEventTypeRepository: TypeOrmEventTypeRepository, mikroOrmEventTypeRepository: MikroOrmEventTypeRepository);
}
