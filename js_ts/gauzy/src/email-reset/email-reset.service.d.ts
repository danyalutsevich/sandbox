import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IEmailResetFindInput, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { UserService } from '../user/user.service';
import { TenantAwareCrudService } from '../core/crud';
import { EmailReset } from './email-reset.entity';
import { UserEmailDTO } from '../user/dto';
import { VerifyEmailResetRequestDTO } from './dto/verify-email-reset-request.dto';
import { EmailService } from './../email-send/email.service';
import { EmployeeService } from './../employee/employee.service';
import { AuthService } from './../auth/auth.service';
import { TypeOrmEmailResetRepository } from './repository/type-orm-email-reset.repository';
import { MikroOrmEmailResetRepository } from './repository/mikro-orm-email-reset.repository';
export declare class EmailResetService extends TenantAwareCrudService<EmailReset> {
    private readonly userService;
    private readonly commandBus;
    private readonly queryBus;
    private readonly emailService;
    private readonly employeeService;
    private readonly authService;
    constructor(typeOrmEmailResetRepository: TypeOrmEmailResetRepository, mikroOrmEmailResetRepository: MikroOrmEmailResetRepository, userService: UserService, commandBus: CommandBus, queryBus: QueryBus, emailService: EmailService, employeeService: EmployeeService, authService: AuthService);
    requestChangeEmail(request: UserEmailDTO, languageCode: LanguagesEnum): Promise<Object>;
    verifyCode(request: VerifyEmailResetRequestDTO): Promise<Object>;
    getEmailResetIfCodeMatches(input: IEmailResetFindInput): Promise<EmailReset>;
}
