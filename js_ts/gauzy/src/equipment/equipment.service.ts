import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { IPagination } from '../../plugins/contracts/dist/index';
import { isNotEmpty } from '../../plugins/common/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmEquipmentRepository } from './repository/type-orm-equipment.repository';
import { MikroOrmEquipmentRepository } from './repository/mikro-orm-equipment.repository';
import { Equipment } from './equipment.entity';

@Injectable()
export class EquipmentService extends TenantAwareCrudService<Equipment> {
	constructor(
		@InjectRepository(Equipment)
		typeOrmEquipmentRepository: TypeOrmEquipmentRepository,

		mikroOrmEquipmentRepository: MikroOrmEquipmentRepository
	) {
		super(typeOrmEquipmentRepository, mikroOrmEquipmentRepository);
	}

	/**
	 *
	 * @returns
	 */
	async getAll(): Promise<IPagination<Equipment>> {
		return await this.findAll({
			relations: {
				image: true,
				equipmentSharings: true,
				tags: true
			}
		});
	}

	/**
	 *
	 * @param filter
	 * @returns
	 */
	public pagination(filter: any) {
		if ('where' in filter) {
			const { where } = filter;
			['name', 'type', 'serialNumber'].forEach((param) => {
				if (param in where) {
					const value = where[param];
					if (isNotEmpty(value)) filter.where[param] = Like(`%${value}%`);
				}
			});
		}
		return super.paginate(filter);
	}
}
