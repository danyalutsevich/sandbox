
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import moment from 'moment';
import { omit } from 'underscore';
import * as chalk from 'chalk';
import { ITimeSlot, PermissionsEnum, TimeLogSourceEnum, TimeLogType } from '../../../../../plugins/contracts/dist/index';
import { isEmpty } from '../../../../../plugins/common/dist/index';
import { RequestContext } from '../../../../core/context';
import {
	Employee,
	TimeLog
} from './../../../../core/entities/internal';
import { TimeSlot } from './../../time-slot.entity';
import { CreateTimeSlotCommand } from '../create-time-slot.command';
import { BulkActivitiesSaveCommand } from '../../../activity/commands';
import { TimeSlotMergeCommand } from './../time-slot-merge.command';
import { prepareSQLQuery as p } from './../../../../database/database.helper';
import { TypeOrmTimeSlotRepository } from '../../repository/type-orm-time-slot.repository';
import { TypeOrmTimeLogRepository } from '../../../time-log/repository/type-orm-time-log.repository';
import { TypeOrmEmployeeRepository } from '../../../../employee/repository/type-orm-employee.repository';

@CommandHandler(CreateTimeSlotCommand)
export class CreateTimeSlotHandler implements ICommandHandler<CreateTimeSlotCommand> {

	private logging: boolean = true;

	constructor(
		@InjectRepository(TimeSlot)
		private readonly typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository,

		@InjectRepository(TimeLog)
		private readonly typeOrmTimeLogRepository: TypeOrmTimeLogRepository,

		@InjectRepository(Employee)
		private readonly typeOrmEmployeeRepository: TypeOrmEmployeeRepository,

		private readonly commandBus: CommandBus
	) { }

	public async execute(command: CreateTimeSlotCommand): Promise<TimeSlot> {
		const { input } = command;
		let { organizationId, employeeId, activities = [] } = input;

		/** Get already running TimeLog based on source and logType */
		const source = input.source || TimeLogSourceEnum.DESKTOP;
		const logType = input.logType || TimeLogType.TRACKED;

		this.log(`Time Slot Interval Request: ${JSON.stringify(input)}`);

		const user = RequestContext.currentUser();
		const tenantId = RequestContext.currentTenantId();

		/**
		 * Check logged user does not have employee selection permission
		 */
		if (!RequestContext.hasPermission(PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
			try {
				const employee = await this.typeOrmEmployeeRepository.findOneByOrFail({
					userId: user.id,
					tenantId
				});
				employeeId = employee.id;
				organizationId = employee.organizationId;
			} catch (error) {
				console.error(`Error finding logged in employee for (${user.name}) create bulk activities`, error);
			}
		} else if (isEmpty(employeeId) && RequestContext.currentEmployeeId()) {
			/*
			* If employeeId not send from desktop timer request payload
			*/
			employeeId = RequestContext.currentEmployeeId();
		}

		/*
		 * If organization not found in request then assign current logged user organization
		 */
		if (isEmpty(organizationId)) {
			let employee = await this.typeOrmEmployeeRepository.findOneBy({
				id: employeeId
			});
			organizationId = employee ? employee.organizationId : null;
		}

		input.startedAt = moment(input.startedAt).utc().set('millisecond', 0).toDate();

		const minDate = input.startedAt;
		const maxDate = input.startedAt;

		let timeSlot: ITimeSlot;
		try {
			const query = this.typeOrmTimeSlotRepository.createQueryBuilder();
			query.leftJoinAndSelect(`${query.alias}.timeLogs`, 'timeLogs');
			query.where((qb: SelectQueryBuilder<TimeSlot>) => {
				qb.andWhere(p(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
				qb.andWhere(p(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
				qb.andWhere(p(`"${qb.alias}"."employeeId" = :employeeId`), { employeeId });
				qb.andWhere(p(`"${qb.alias}"."startedAt" = :startedAt`), { startedAt: input.startedAt });
			});
			this.log(`Get Time Slot Query & Parameters For employee (${user.name}): ${query.getQueryAndParameters()}`);
			timeSlot = await query.getOneOrFail();
		} catch (error) {
			if (!timeSlot) {
				timeSlot = new TimeSlot(omit(input, ['timeLogId']));
				timeSlot.tenantId = tenantId;
				timeSlot.organizationId = organizationId;
				timeSlot.employeeId = employeeId;
				timeSlot.timeLogs = [];
			}
		}

		this.log(`Find Time Slot For Time: ${input.startedAt} for employee (${user.name}): ${JSON.stringify(timeSlot)}`);

		try {
			/**
			 * Find TimeLog for TimeSlot Range
			 */
			const query = this.typeOrmTimeLogRepository.createQueryBuilder();
			query.andWhere(
				new Brackets((web: WhereExpressionBuilder) => {
					web.andWhere(p(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
					web.andWhere(p(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
					web.andWhere(p(`"${query.alias}"."employeeId" = :employeeId`), { employeeId });
					web.andWhere(p(`"${query.alias}"."source" = :source`), { source });
					web.andWhere(p(`"${query.alias}"."logType" = :logType`), { logType });
					web.andWhere(p(`"${query.alias}"."stoppedAt" IS NOT NULL`));
				})
			);
			query.addOrderBy(p(`"${query.alias}"."createdAt"`), 'DESC');
			this.log(`Find timelog for specific query: ${query.getQueryAndParameters()}`);
			const timeLog = await query.getOneOrFail();
			this.log(`Found timelog for specific timeLog: ${JSON.stringify(timeLog)}`);
			timeSlot.timeLogs.push(timeLog);
		} catch (error) {
			if (input.timeLogId) {
				let timeLogIds: string[] = Array.isArray(input.timeLogId) ? input.timeLogId : [input.timeLogId];
				/**
				 * Find TimeLog for TimeSlot Range
				 */
				const query = this.typeOrmTimeLogRepository.createQueryBuilder();
				query.where((qb: SelectQueryBuilder<TimeLog>) => {
					qb.andWhere(
						new Brackets((web: WhereExpressionBuilder) => {
							web.andWhere(p(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
							web.andWhere(p(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
							web.andWhere(p(`"${qb.alias}"."source" = :source`), { source });
							web.andWhere(p(`"${qb.alias}"."logType" = :logType`), { logType });
							web.andWhere(p(`"${qb.alias}"."employeeId" = :employeeId`), { employeeId });
							web.andWhere(p(`"${qb.alias}"."stoppedAt" IS NOT NULL`));
						})
					);
					qb.andWhere(p(`"${qb.alias}"."id" IN (:...timeLogIds)`), { timeLogIds });
				});
				this.log(`Timelog query for timeLog IDs for employee (${user.name}): ${query.getQueryAndParameters()}`);
				const timeLogs = await query.getMany();
				this.log(`Found recent time logs using timelog ids for employee (${user.name}): ${JSON.stringify(timeLogs)}`);
				timeSlot.timeLogs.push(...timeLogs);
			}
		}

		/**
		 * Update TimeLog Entry Every TimeSlot Request From Desktop Timer
		 */
		for await (const timeLog of timeSlot.timeLogs) {
			if (timeLog.isRunning) {
				await this.typeOrmTimeLogRepository.update(timeLog.id, {
					stoppedAt: moment.utc().toDate()
				});
			}
		}

		this.log(`Bulk activities save parameters employee (${user.name}): ${JSON.stringify({
			organizationId,
			employeeId,
			activities,
			projectId: input.projectId,
		})}`);

		timeSlot.activities = await this.commandBus.execute(
			new BulkActivitiesSaveCommand({
				organizationId,
				employeeId,
				activities,
				projectId: input.projectId,
			})
		);

		this.log(`Timeslot save first time before bulk activities save for employee (${user.name}): ${JSON.stringify(timeSlot)}`);
		await this.typeOrmTimeSlotRepository.save(timeSlot);
		/*
		* Merge timeSlots into 10 minutes slots
		*/
		let [mergedTimeSlot] = await this.commandBus.execute(
			new TimeSlotMergeCommand(
				organizationId,
				employeeId,
				minDate,
				maxDate
			)
		);
		if (mergedTimeSlot) {
			timeSlot = mergedTimeSlot;
		}

		this.log(`Final merged timeSlot for employee (${user.name}): ${JSON.stringify(timeSlot)}`);

		return await this.typeOrmTimeSlotRepository.findOne({
			where: {
				id: timeSlot.id
			},
			relations: {
				timeLogs: true,
				screenshots: true
			}
		});
	}

	/**
	 * Private method for logging messages.
	 * @param message - The message to be logged.
	 */
	private log(message: string): void {
		if (this.logging) {
			console.log(chalk.green(`${moment().format('DD.MM.YYYY HH:mm:ss')}`));
			console.log(chalk.green(message));
			console.log(chalk.white('--------------------------------------------------------'));
			console.log(); // Add an empty line as a divider
		}
	}
}
