import { Controller, HttpStatus, Get, Query, UseGuards, HttpCode, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Not } from 'typeorm';
import { I18nLang } from 'nestjs-i18n';
import * as dist from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { UUIDValidationPipe } from './../shared/pipes';
import { TenantPermissionGuard } from './../shared/guards';
import { UserDecorator } from './../shared/decorators';
import { UserOrganizationService } from './user-organization.services';
import { UserOrganization } from './user-organization.entity';
import { UserOrganizationDeleteCommand } from './commands';
import { FindMeUserOrganizationDTO } from './dto/find-me-user-organization.dto';

@ApiTags('UserOrganization')
@UseGuards(TenantPermissionGuard)
@Controller()
export class UserOrganizationController extends CrudController<UserOrganization> {
	constructor(
		private readonly userOrganizationService: UserOrganizationService,
		private readonly commandBus: CommandBus
	) {
		super(userOrganizationService);
	}

	/**
	 *
	 * @param params
	 * @returns
	 */
	@ApiOperation({ summary: 'Find all UserOrganizations.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found UserOrganizations',
		type: UserOrganization
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get()
	async findAll(
		@Query() params: PaginationParams<UserOrganization>,
		@Query() query: FindMeUserOrganizationDTO,
	): Promise<dist.IPagination<dist.IUserOrganization>> {
		return await this.userOrganizationService.findAllUserOrganizations(
			params,
			query.includeEmployee
		);
	}

	@ApiOperation({ summary: 'Delete user from organization' })
	@ApiResponse({
		status: HttpStatus.NO_CONTENT,
		description: 'The user has been successfully deleted'
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@HttpCode(HttpStatus.ACCEPTED)
	@Delete(':id')
	async delete(
		@Param('id', UUIDValidationPipe) id: string,
		@UserDecorator() user: dist.IUser,
		@I18nLang() language: dist.LanguagesEnum
	): Promise<dist.IUserOrganization> {
		return this.commandBus.execute(
			new UserOrganizationDeleteCommand({
				userOrganizationId: id,
				requestingUser: user,
				language
			})
		);
	}

	@ApiOperation({ summary: 'Find number of Organizations user belongs to' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Count of Organizations given user belongs to',
		type: Number
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get(':id')
	async findOrganizationCount(@Param('id', UUIDValidationPipe) id: string): Promise<number> {
		const { userId } = await this.findById(id);
		const { total } = await this.userOrganizationService.findAll({
			where: {
				userId,
				isActive: true,
				user: {
					role: { name: Not(dist.RolesEnum.EMPLOYEE) }
				}
			},
			relations: ['user', 'user.role']
		});
		return total;
	}
}
