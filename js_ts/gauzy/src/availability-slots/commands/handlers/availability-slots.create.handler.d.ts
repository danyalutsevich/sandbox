import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IAvailabilitySlot } from '../../../../plugins/contracts/dist/index';
import { AvailabilitySlotsCreateCommand } from '../availability-slots.create.command';
import { AvailabilitySlotsService } from '../../availability-slots.service';
export declare class AvailabilitySlotsCreateHandler implements ICommandHandler<AvailabilitySlotsCreateCommand> {
    private readonly availabilitySlotsService;
    private readonly commandBus;
    constructor(availabilitySlotsService: AvailabilitySlotsService, commandBus: CommandBus);
    execute(command: AvailabilitySlotsCreateCommand): Promise<IAvailabilitySlot>;
}
