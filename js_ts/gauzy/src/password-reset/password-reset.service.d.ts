import { CrudService } from './../core/crud';
import { PasswordReset } from './password-reset.entity';
import { TypeOrmPasswordResetRepository } from './repository/type-orm-password-reset.repository';
import { MikroOrmPasswordResetRepository } from './repository/mikro-orm-password-reset.repository';
export declare class PasswordResetService extends CrudService<PasswordReset> {
    constructor(typeOrmPasswordResetRepository: TypeOrmPasswordResetRepository, mikroOrmPasswordResetRepository: MikroOrmPasswordResetRepository);
}
