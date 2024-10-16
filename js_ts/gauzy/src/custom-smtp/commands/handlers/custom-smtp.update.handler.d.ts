import { ICommandHandler } from '@nestjs/cqrs';
import { ICustomSmtp } from '../../../../plugins/contracts/dist/index';
import { CustomSmtpService } from '../../custom-smtp.service';
import { CustomSmtpUpdateCommand } from '../custom-smtp.update.command';
export declare class CustomSmtpUpdateHandler implements ICommandHandler<CustomSmtpUpdateCommand> {
    private readonly _customSmtpService;
    constructor(_customSmtpService: CustomSmtpService);
    execute(command: CustomSmtpUpdateCommand): Promise<ICustomSmtp>;
}
