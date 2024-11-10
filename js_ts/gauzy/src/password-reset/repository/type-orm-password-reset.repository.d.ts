import { Repository } from 'typeorm';
import { PasswordReset } from '../password-reset.entity';
export declare class TypeOrmPasswordResetRepository extends Repository<PasswordReset> {
    readonly repository: Repository<PasswordReset>;
    constructor(repository: Repository<PasswordReset>);
}
