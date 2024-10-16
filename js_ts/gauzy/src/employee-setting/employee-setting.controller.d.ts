import { IEmployeeSetting, IPagination } from '../../plugins/contracts/dist/index';
import { EmployeeSettingService } from './employee-setting.service';
import { EmployeeSetting } from './employee-setting.entity';
import { CrudController } from './../core/crud';
export declare class EmployeeSettingController extends CrudController<EmployeeSetting> {
    private readonly employeeSettingService;
    constructor(employeeSettingService: EmployeeSettingService);
    /**
     * GET all employee settings
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IEmployeeSetting>>;
}
