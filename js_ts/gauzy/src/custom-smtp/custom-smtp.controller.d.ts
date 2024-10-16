import { CommandBus } from '@nestjs/cqrs';
import { ICustomSmtp } from '../../plugins/contracts/dist/index';
import { ISMTPConfig } from '../../plugins/common/dist/index';
import { CustomSmtp } from './custom-smtp.entity';
import { CustomSmtpService } from './custom-smtp.service';
import { CrudController } from './../core/crud';
import { CreateCustomSmtpDTO, CustomSmtpQueryDTO, UpdateCustomSmtpDTO, ValidateCustomSmtpDTO } from './dto';
export declare class CustomSmtpController extends CrudController<CustomSmtp> {
    private readonly _customSmtpService;
    private readonly _commandBus;
    constructor(_customSmtpService: CustomSmtpService, _commandBus: CommandBus);
    /**
     * GET smtp setting for tenant
     *
     * @param query
     * @returns
     */
    getSmtpSetting(query: CustomSmtpQueryDTO): Promise<ICustomSmtp | ISMTPConfig>;
    /**
     * CREATE verify smtp transporter
     *
     * @param entity
     * @returns
     */
    validateSmtpSetting(entity: ValidateCustomSmtpDTO): Promise<boolean>;
    /**
     * CREATE custom smtp for tenant/organization
     *
     * @param entity
     * @returns
     */
    create(entity: CreateCustomSmtpDTO): Promise<ICustomSmtp>;
    /**
     * UPDATE smtp by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: ICustomSmtp['id'], entity: UpdateCustomSmtpDTO): Promise<ICustomSmtp>;
}
