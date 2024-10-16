import { IQuery } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { Invite } from './../../core/entities/internal';
export declare class FindInviteByEmailTokenQuery implements IQuery {
    readonly params: FindOptionsWhere<Invite>;
    constructor(params: FindOptionsWhere<Invite>);
}
