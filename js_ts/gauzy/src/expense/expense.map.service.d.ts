import { IExpense, IExpenseReportGroupByDate, IExpenseReportGroupByEmployee, IExpenseReportGroupByProject } from '../../plugins/contracts/dist/index';
export declare class ExpenseMapService {
    constructor();
    mapByDate(expenses: IExpense[]): IExpenseReportGroupByDate[];
    mapByEmployee(expenses: IExpense[]): IExpenseReportGroupByEmployee[];
    mapByProject(expenses: IExpense[]): IExpenseReportGroupByProject[];
    private groupByProject;
    private groupByDate;
    private groupByEmployee;
    private mapExpensePercentage;
    private getDurationSum;
}
