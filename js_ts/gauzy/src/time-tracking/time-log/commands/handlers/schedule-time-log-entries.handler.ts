import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import moment from 'moment';
import { isEmpty, isNotEmpty } from '../../../../../plugins/common/dist/index';
import { DatabaseTypeEnum, getConfig } from '../../../../../plugins/config/dist/index';
import { prepareSQLQuery as p } from './../../../../database/database.helper';
import { ITimeLog } from '../../../../../plugins/contracts/dist/index';;
import { TimeLog } from './../../time-log.entity';
import { ScheduleTimeLogEntriesCommand } from '../schedule-time-log-entries.command';
import { RequestContext } from './../../../../core/context';
import { TypeOrmTimeLogRepository } from '../../repository/type-orm-time-log.repository';

@CommandHandler(ScheduleTimeLogEntriesCommand)
export class ScheduleTimeLogEntriesHandler implements ICommandHandler<ScheduleTimeLogEntriesCommand> {

	constructor(
		@InjectRepository(TimeLog)
		private readonly typeOrmTimeLogRepository: TypeOrmTimeLogRepository,
	) { }

	public async execute(command: ScheduleTimeLogEntriesCommand) {
		const { timeLog } = command;
		let timeLogs: ITimeLog[] = [];
		if (timeLog) {
			const { organizationId, employeeId } = timeLog;
			const tenantId = RequestContext.currentTenantId();

			const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
			query.setFindOptions({
				relations: {
					timeSlots: true
				}
			});
			query.where((qb: SelectQueryBuilder<TimeLog>) => {
				qb.andWhere(
					new Brackets((web: WhereExpressionBuilder) => {
						web.andWhere(p(`"${qb.alias}"."employeeId" = :employeeId`), { employeeId });
						web.andWhere(p(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
						web.andWhere(p(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
					})
				);
				qb.andWhere(
					new Brackets((web: WhereExpressionBuilder) => {
						web.andWhere(
							new Brackets((web: WhereExpressionBuilder) => {
								web.andWhere(p(`"${qb.alias}"."stoppedAt" IS NOT NULL`));
								web.andWhere(p(`"${qb.alias}"."isRunning" = :isRunning`), { isRunning: true });
							})
						);
						web.orWhere(
							new Brackets((web: WhereExpressionBuilder) => {
								web.andWhere(p(`"${qb.alias}"."stoppedAt" IS NULL`));
							})
						);
					})
				);
				console.log('Schedule Time Log Query For Tenant Organization Entries', qb.getQueryAndParameters());
			});
			timeLogs = await query.getMany();
		} else {
			const query = this.typeOrmTimeLogRepository.createQueryBuilder('time_log');
			query.setFindOptions({
				relations: {
					timeSlots: true
				}
			});
			query.where((qb: SelectQueryBuilder<TimeLog>) => {
				qb.andWhere(
					new Brackets((web: WhereExpressionBuilder) => {
						web.andWhere(p(`"${qb.alias}"."stoppedAt" IS NOT NULL`));
						web.andWhere(p(`"${qb.alias}"."isRunning" = :isRunning`), { isRunning: true });
					})
				);
				qb.orWhere(
					new Brackets((web: WhereExpressionBuilder) => {
						web.andWhere(p(`"${qb.alias}"."stoppedAt" IS NULL`));
					})
				);
				console.log('Schedule Time Log Query For All Entries', query.getQueryAndParameters());
			});
			timeLogs = await query.getMany();
		}

		for await (const timeLog of timeLogs) {
			console.log('Schedule Time Log Entry', timeLog);
			const logDifference = moment().diff(moment.utc(timeLog.startedAt), 'minutes');
			if (
				isEmpty(timeLog.timeSlots) &&
				logDifference > 10
			) {
				console.log('Schedule Time Log Entry Updated StoppedAt Using StartedAt', timeLog.startedAt);
				await this.typeOrmTimeLogRepository.save({
					id: timeLog.id,
					stoppedAt: moment(timeLog.startedAt).add(10, 'seconds').toDate()
				});
			} else if (isNotEmpty(timeLog.timeSlots)) {
				let stoppedAt: any;
				let slotDifference: any;

				const duration = timeLog.timeSlots.reduce(
					(sum: number, current: any) => sum + current.duration, 0
				);
				/**
				 * Adjust stopped date as per database selection
				 */
				switch (getConfig().dbConnectionOptions.type) {
					case DatabaseTypeEnum.sqlite:
					case DatabaseTypeEnum.betterSqlite3:
						stoppedAt = moment.utc(timeLog.startedAt).add(duration, 'seconds').format('YYYY-MM-DD HH:mm:ss.SSS');
						slotDifference = moment.utc(moment()).diff(stoppedAt, 'minutes');
						break;
					case DatabaseTypeEnum.postgres:
					case DatabaseTypeEnum.mysql:
						stoppedAt = moment(timeLog.startedAt).add(duration, 'seconds').toDate();
						slotDifference = moment().diff(moment.utc(stoppedAt), 'minutes');
						break;
					default:
						throw Error(`cannot format startedAt, slotDifference due to unsupported database type: ${getConfig().dbConnectionOptions.type}`);
				}

				console.log('Schedule Time Log Entry Updated StoppedAt Using StoppedAt', stoppedAt);
				if (slotDifference > 10) {
					await this.typeOrmTimeLogRepository.save({
						id: timeLog.id,
						stoppedAt: stoppedAt
					});
				}
			}
			/**
			 * Stop previous pending timer anyway.
			 * If we have any pending TimeLog entry
			 */
			await this.typeOrmTimeLogRepository.save({
				id: timeLog.id,
				isRunning: false
			});
			console.log('Schedule Time Log Entry Updated Entry', timeLog);
		}
	}
}
