import { IQuery } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { OrganizationContact } from '../../../core/entities/internal';
export declare class FindPublicClientsByOrganizationQuery implements IQuery {
    readonly options: FindOptionsWhere<OrganizationContact>;
    constructor(options: FindOptionsWhere<OrganizationContact>);
}
