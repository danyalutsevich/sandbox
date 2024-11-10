import { ICommandHandler } from '@nestjs/cqrs';
import { ConfigService } from '../../../../plugins/config/dist/index';
import { IAvailabilitySlot } from '../../../../plugins/contracts/dist/index';
import { GetConflictAvailabilitySlotsCommand } from '../get-conflict-availability-slots.command';
import { TypeOrmAvailabilitySlotRepository } from '../../repository/type-orm-availability-slot.repository';
import { MikroOrmAvailabilitySlotRepository } from '../../repository/mikro-orm-availability-slot.repository';
export declare class GetConflictAvailabilitySlotsHandler implements ICommandHandler<GetConflictAvailabilitySlotsCommand> {
    readonly typeOrmAvailabilitySlotRepository: TypeOrmAvailabilitySlotRepository;
    readonly mikroOrmAvailabilitySlotRepository: MikroOrmAvailabilitySlotRepository;
    private readonly configService;
    constructor(typeOrmAvailabilitySlotRepository: TypeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository: MikroOrmAvailabilitySlotRepository, configService: ConfigService);
    execute(command: GetConflictAvailabilitySlotsCommand): Promise<IAvailabilitySlot[]>;
}
