import { Repository } from 'typeorm';
import { AppointmentEmployee } from '../appointment-employees.entity';
export declare class TypeOrmAppointmentEmployeeRepository extends Repository<AppointmentEmployee> {
    readonly repository: Repository<AppointmentEmployee>;
    constructor(repository: Repository<AppointmentEmployee>);
}
