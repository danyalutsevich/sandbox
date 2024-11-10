import { EmployeeBulkCreateHandler } from './employee.bulk.create.handler';
import { EmployeeCreateHandler } from './employee.create.handler';
import { EmployeeGetHandler } from './employee.get.handler';
import { EmployeeUpdateHandler } from './employee.update.handler';
import { GetEmployeeJobStatisticsHandler } from './get-employee-job-statistics.handler';
import { UpdateEmployeeJobSearchStatusHandler } from './update-employee-job-search-status.handler';
import { UpdateEmployeeTotalWorkedHoursHandler } from './update-employee-total-worked-hours.handler';
import { WorkingEmployeeGetHandler } from './workig-employee.get.handler';
export declare const CommandHandlers: (typeof EmployeeBulkCreateHandler | typeof EmployeeCreateHandler | typeof EmployeeGetHandler | typeof EmployeeUpdateHandler | typeof GetEmployeeJobStatisticsHandler | typeof UpdateEmployeeJobSearchStatusHandler | typeof UpdateEmployeeTotalWorkedHoursHandler | typeof WorkingEmployeeGetHandler)[];
