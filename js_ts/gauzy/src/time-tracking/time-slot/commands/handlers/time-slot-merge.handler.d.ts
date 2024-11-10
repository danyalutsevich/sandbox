import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { ITimeSlot } from '../../../../../plugins/contracts/dist/index';
import { TimeSlotMergeCommand } from '../time-slot-merge.command';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
export declare class TimeSlotMergeHandler implements ICommandHandler<TimeSlotMergeCommand> {
    private readonly typeOrmTimeSlotRepository;
    private readonly commandBus;
    constructor(typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, commandBus: CommandBus);
    /**
     *
     * @param command
     * @returns
     */
    execute(command: TimeSlotMergeCommand): Promise<ITimeSlot[]>;
    /**
     * Get time slots for the given date range.
     *
     * @param param0 - An object containing parameters like organizationId, employeeId, tenantId, startedAt, and stoppedAt.
     * @returns A promise that resolves to an array of TimeSlot instances.
     */
    private getTimeSlots;
    /**
     *
     * @param newTimeSlot
     */
    private updateTimeLogAndEmployeeTotalWorkedHours;
}
