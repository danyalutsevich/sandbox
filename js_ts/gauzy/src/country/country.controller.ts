import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IPagination } from '../../plugins/contracts/dist/index';
import { Public } from '../../plugins/common/dist/index';
import { Country } from './country.entity';
import { CountryService } from './country.service';

@ApiTags('Country')
@Controller()
@Public()
export class CountryController {
	constructor(
		private readonly countryService: CountryService
	) {}

	@ApiOperation({ summary: 'Find all countries.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found countries',
		type: Country
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get()
	async findAll(): Promise<IPagination<Country>> {
		return this.countryService.findAll();
	}
}
