import { IGetPaymentInput, IInvoice, IPayment, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { Payment } from './payment.entity';
import { TenantAwareCrudService } from './../core/crud';
import { EmailService } from './../email-send/email.service';
import { MikroOrmPaymentRepository } from './repository/mikro-orm-payment.repository';
import { TypeOrmPaymentRepository } from './repository/type-orm-payment.repository';
export declare class PaymentService extends TenantAwareCrudService<Payment> {
    readonly typeOrmPaymentRepository: TypeOrmPaymentRepository;
    readonly mikroOrmPaymentRepository: MikroOrmPaymentRepository;
    private readonly emailService;
    constructor(typeOrmPaymentRepository: TypeOrmPaymentRepository, mikroOrmPaymentRepository: MikroOrmPaymentRepository, emailService: EmailService);
    /**
     * Retrieves payments based on the provided request parameters.
     *
     * @param request - Request parameters for filtering payments.
     * @returns A Promise that resolves to an array of payments.
     */
    getPayments(request: IGetPaymentInput): Promise<Payment[]>;
    /**
     * Retrieves daily payment report charts based on the provided request parameters.
     *
     * @param request - Request parameters for filtering data.
     * @returns A Promise that resolves to an array of daily payment report charts.
     */
    getDailyReportCharts(request: IGetPaymentInput): Promise<{
        date: string;
        value: {
            payment: any;
        };
    }[]>;
    /**
     *
     * @param query
     * @param request
     * @returns
     */
    private getFilterQuery;
    /**
     *
     * @param languageCode
     * @param params
     * @param origin
     */
    sendReceipt(languageCode: LanguagesEnum, invoice: IInvoice, payment: IPayment, origin: string): Promise<boolean>;
    pagination(filter: any): Promise<import("../../plugins/contracts/dist/core.model").IPagination<Payment>>;
}
