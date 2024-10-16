import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectQueryBuilder } from 'typeorm';
import { isNotEmpty } from '../../../../../plugins/common/dist/index';
import { TimeSlot } from '../../time-slot.entity';
import { TimeSlotBulkDeleteCommand } from '../time-slot-bulk-delete.command';
import { RequestContext } from '../../../../core/context';
import { prepareSQLQuery as p } from './../../../../database/database.helper';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';

@CommandHandler(TimeSlotBulkDeleteCommand)
export class TimeSlotBulkDeleteHandler implements ICommandHandler<TimeSlotBulkDeleteCommand> {

	constructor(
		@InjectRepository(TimeSlot)
		private readonly typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository,
	) { }

	public async execute(
		command: TimeSlotBulkDeleteCommand
	): Promise<boolean> {
		const tenantId = RequestContext.currentTenantId();

		const { input, forceDirectDelete } = command;
		const { organizationId, employeeId, timeLog, timeSlotsIds = [] } = input;

		const query = this.typeOrmTimeSlotRepository.createQueryBuilder('time_slot');
		query.setFindOptions({
			relations: {
				timeLogs: true,
				screenshots: true
			}
		});
		query.where((qb: SelectQueryBuilder<TimeSlot>) => {
			if (isNotEmpty(timeSlotsIds)) {
				qb.andWhere(p(`"${qb.alias}"."id" IN (:...timeSlotsIds)`), {
					timeSlotsIds
				});
			}
			qb.andWhere(p(`"${qb.alias}"."employeeId" = :employeeId`), {
				employeeId
			});
			qb.andWhere(p(`"${qb.alias}"."organizationId" = :organizationId`), {
				organizationId
			});
			qb.andWhere(p(`"${qb.alias}"."tenantId" = :tenantId`), {
				tenantId
			});
			console.log('Time Slots Delete Range Query', qb.getQueryAndParameters());
		});
		const timeSlots = await query.getMany();
		console.log({ timeSlots, forceDirectDelete }, 'Time Slots Delete Range');

		if (isNotEmpty(timeSlots)) {
			if (forceDirectDelete) {
				await this.typeOrmTimeSlotRepository.remove(timeSlots);
				return true;
			} else {
				for await (const timeSlot of timeSlots) {
					const { timeLogs } = timeSlot;
					if (timeLogs.length === 1) {
						const [firstTimeLog] = timeLogs;
						if (firstTimeLog.id === timeLog.id) {
							await this.typeOrmTimeSlotRepository.remove(timeSlot);
						}
					}
				}
				return true;
			}
		}
		return false;
	}
}
