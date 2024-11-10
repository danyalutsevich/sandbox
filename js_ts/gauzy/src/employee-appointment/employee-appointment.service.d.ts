import { IEmployeeAppointmentCreateInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmEmployeeAppointmentRepository } from './repository/type-orm-employee-appointment.repository';
import { MikroOrmEmployeeAppointmentRepository } from './repository/mikro-orm-employee-appointment.repository';
import { EmployeeAppointment } from './employee-appointment.entity';
export declare class EmployeeAppointmentService extends TenantAwareCrudService<EmployeeAppointment> {
    constructor(typeOrmEmployeeAppointmentRepository: TypeOrmEmployeeAppointmentRepository, mikroOrmEmployeeAppointmentRepository: MikroOrmEmployeeAppointmentRepository);
    /**
     *
     * @param employeeAppointmentRequest
     * @returns
     */
    saveAppointment(employeeAppointmentRequest: IEmployeeAppointmentCreateInput): Promise<EmployeeAppointment>;
    /**
     *
     * @param id
     * @returns
     */
    signAppointmentId(id: string): string;
    /**
     *
     * @param token
     * @returns
     */
    decode(token: string): string | import("jsonwebtoken").JwtPayload;
}
