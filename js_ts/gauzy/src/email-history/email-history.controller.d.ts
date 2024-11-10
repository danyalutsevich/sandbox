import { UpdateResult } from 'typeorm';
import { IEmailHistory, IPagination, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { EmailHistory } from './email-history.entity';
import { EmailHistoryService } from './email-history.service';
import { UpdateEmailHistoryDTO } from './dto';
import { PaginationParams } from './../core/crud';
import { ResendEmailHistoryDTO } from './dto/resend-email-history.dto';
import { CommandBus } from '@nestjs/cqrs';
export declare class EmailHistoryController {
    private readonly _emailHistoryService;
    private readonly commandBus;
    constructor(_emailHistoryService: EmailHistoryService, commandBus: CommandBus);
    findAll(params: PaginationParams<EmailHistory>): Promise<IPagination<IEmailHistory>>;
    update(id: IEmailHistory['id'], entity: UpdateEmailHistoryDTO): Promise<IEmailHistory | UpdateResult>;
    resendInvite(entity: ResendEmailHistoryDTO, languageCode: LanguagesEnum): Promise<UpdateResult | IEmailHistory>;
}
