import { Repository } from 'typeorm';
import { Invite } from '../invite.entity';
export declare class TypeOrmInviteRepository extends Repository<Invite> {
    readonly repository: Repository<Invite>;
    constructor(repository: Repository<Invite>);
}
