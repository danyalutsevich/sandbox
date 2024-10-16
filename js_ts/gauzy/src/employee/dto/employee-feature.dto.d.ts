import { IEmployee, IRelationalEmployee } from '../../../plugins/contracts';
export declare class EmployeeFeatureDTO implements IRelationalEmployee {
    readonly employee: IEmployee;
    readonly employeeId: IEmployee['id'];
}
