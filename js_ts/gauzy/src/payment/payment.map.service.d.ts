import { IPayment, IPaymentReportGroupByClient, IPaymentReportGroupByDate, IPaymentReportGroupByProject } from '../../plugins/contracts/dist/index';
export declare class PaymentMapService {
    constructor();
    mapByDate(payments: IPayment[]): IPaymentReportGroupByDate[];
    mapByClient(payments: IPayment[]): IPaymentReportGroupByClient[];
    mapByProject(payments: IPayment[]): IPaymentReportGroupByProject[];
    private groupByProject;
    private groupByDate;
    private groupByClient;
    private mapPaymentPercentage;
    private getDurationSum;
}
