import { IQuery } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { Organization } from '../../../core/entities/internal';
export declare class FindPublicOrganizationQuery implements IQuery {
    readonly params: FindOptionsWhere<Organization>;
    readonly relations: string[];
    constructor(params: FindOptionsWhere<Organization>, relations: string[]);
}
