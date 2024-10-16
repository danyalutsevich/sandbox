import {
	Controller,
	UseGuards,
	Get,
	Query,
	HttpStatus,
	Delete,
	Param,
	Post,
	Body,
	Put,
	ValidationPipe,
	UsePipes
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import * as typeorm from 'typeorm';
import * as contracts from '../../../plugins/contracts';
import { CreateTimeSlotCommand, DeleteTimeSlotCommand, UpdateTimeSlotCommand } from './commands';
import { TimeSlotService } from './time-slot.service';
import { TimeSlot } from './time-slot.entity';
import { OrganizationPermissionGuard, PermissionGuard, TenantPermissionGuard } from '../../shared/guards';
import { UUIDValidationPipe, UseValidationPipe } from './../../shared/pipes';
import { Permissions } from './../../shared/decorators';
import { DeleteTimeSlotDTO } from './dto';
import { TimeSlotQueryDTO } from './dto/query';

@ApiTags('TimeSlot')
@UseGuards(TenantPermissionGuard, PermissionGuard)
@Permissions(contracts.PermissionsEnum.TIME_TRACKER, contracts.PermissionsEnum.ALL_ORG_EDIT, contracts.PermissionsEnum.ALL_ORG_VIEW)
@Controller()
export class TimeSlotController {
	constructor(private readonly timeSlotService: TimeSlotService, private readonly commandBus: CommandBus) {}

	/**
	 *
	 * @param options
	 * @returns
	 */
	@ApiOperation({ summary: 'Get Time Slots' })
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input, The response body may contain clues as to what went wrong'
	})
	@Get()
	@UseValidationPipe({ whitelist: true, transform: true })
	async findAll(@Query() options: TimeSlotQueryDTO): Promise<contracts.ITimeSlot[]> {
		return await this.timeSlotService.getTimeSlots(options);
	}

	/**
	 *
	 * @param id
	 * @param options
	 * @returns
	 */
	@ApiOperation({ summary: 'Get Time Slot By Id' })
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input, The response body may contain clues as to what went wrong'
	})
	@Get(':id')
	async findById(
		@Param('id', UUIDValidationPipe) id: contracts.ITimeSlot['id'],
		@Query() options: typeorm.FindOneOptions
	): Promise<contracts.ITimeSlot> {
		return await this.timeSlotService.findOneByIdString(id, options);
	}

	/**
	 *
	 * @param entity
	 * @returns
	 */
	@ApiOperation({ summary: 'Create Time Slot' })
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input, The response body may contain clues as to what went wrong'
	})
	@Post()
	async create(@Body() requst: contracts.ITimeSlot): Promise<contracts.ITimeSlot> {
		return await this.commandBus.execute(new CreateTimeSlotCommand(requst));
	}

	/**
	 *
	 * @param id
	 * @param entity
	 * @returns
	 */
	@ApiOperation({ summary: 'Update Time Slot' })
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(OrganizationPermissionGuard)
	@Permissions(contracts.PermissionsEnum.ALLOW_MODIFY_TIME)
	@Put(':id')
	async update(@Param('id', UUIDValidationPipe) id: contracts.ITimeSlot['id'], @Body() request: TimeSlot): Promise<contracts.ITimeSlot> {
		return await this.commandBus.execute(new UpdateTimeSlotCommand(id, request));
	}

	/**
	 *
	 * @param query
	 * @returns
	 */
	@ApiOperation({ summary: 'Delete TimeSlot' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'The time slot has been successfully deleted.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input, The response body may contain clues as to what went wrong'
	})
	@UseGuards(OrganizationPermissionGuard)
	@Permissions(contracts.PermissionsEnum.ALLOW_DELETE_TIME)
	@Delete()
	@UseValidationPipe({ transform: true })
	async deleteTimeSlot(@Query() query: DeleteTimeSlotDTO): Promise<typeorm.DeleteResult | typeorm.UpdateResult> {
		return await this.commandBus.execute(new DeleteTimeSlotCommand(query));
	}
}
