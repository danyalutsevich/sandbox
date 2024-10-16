import { Repository } from 'typeorm';
import { EmployeeAppointment } from '../employee-appointment.entity';
export declare class TypeOrmEmployeeAppointmentRepository extends Repository<EmployeeAppointment> {
    readonly repository: Repository<EmployeeAppointment>;
    constructor(repository: Repository<EmployeeAppointment>);
}
