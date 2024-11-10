import { ICommandHandler } from '@nestjs/cqrs';
import { EmailTemplateSaveCommand } from '../email-template.save.command';
import { EmailTemplateService } from '../../email-template.service';
import { IEmailTemplate } from '../../../../plugins/contracts';
export declare class EmailTemplateSaveHandler implements ICommandHandler<EmailTemplateSaveCommand> {
    private readonly emailTemplateService;
    constructor(emailTemplateService: EmailTemplateService);
    execute(command: EmailTemplateSaveCommand): Promise<IEmailTemplate>;
    private _saveTemplate;
}
