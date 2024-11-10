import { CommandBus } from '@nestjs/cqrs';
import { EmployeeService } from '../employee/employee.service';
import { UserService } from '../user/user.service';
import { OrganizationVendorService } from '../organization-vendor/organization-vendor.service';
import { OrganizationContactService } from '../organization-contact/organization-contact.service';
import { ExpenseCategoriesService } from '../expense-categories/expense-categories.service';
export declare class UpworkTransactionService {
    private _userService;
    private _employeeService;
    private _orgVendorService;
    private _orgClientService;
    private _expenseCategoryService;
    private commandBus;
    private commandBusMapper;
    constructor(_userService: UserService, _employeeService: EmployeeService, _orgVendorService: OrganizationVendorService, _orgClientService: OrganizationContactService, _expenseCategoryService: ExpenseCategoriesService, commandBus: CommandBus);
    handleTransactions(file: any, { organizationId }: {
        organizationId: any;
    }): Promise<unknown>;
    private _formatErrorMesage;
    private _proccessTransactions;
    private _findRecordOrThrow;
}
