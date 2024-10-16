import { CommandBus } from '@nestjs/cqrs';
import { LanguagesEnum, IEmployeeAppointmentCreateInput, IEmployeeAppointmentUpdateInput, IEmployeeAppointment, IPagination } from '../../plugins/contracts/dist/index';
import { EmployeeAppointmentService } from './employee-appointment.service';
import { EmployeeAppointment } from './employee-appointment.entity';
import { CrudController, PaginationParams } from './../core/crud';
export declare class EmployeeAppointmentController extends CrudController<EmployeeAppointment> {
    private readonly employeeAppointmentService;
    private readonly commandBus;
    constructor(employeeAppointmentService: EmployeeAppointmentService, commandBus: CommandBus);
    /**
     * GET sign appointment
     *
     * @param id
     * @returns
     */
    signAppointment(id: string): Promise<string>;
    /**
     * GET verify token
     *
     * @param token
     * @returns
     */
    decodeToken(token: string): Promise<string>;
    /**
     * GET employee appointment by pagination
     *
     * @param filter
     * @returns
     */
    pagination(filter: PaginationParams<EmployeeAppointment>): Promise<IPagination<IEmployeeAppointment>>;
    /**
     * GET all employee appointments
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IEmployeeAppointment>>;
    /**
     * GET employee appointment by id
     *
     * @param id
     * @returns
     */
    findById(id: string): Promise<IEmployeeAppointment>;
    /**
     * CREATE employee create
     *
     * @param entity
     * @param languageCode
     * @returns
     */
    create(entity: IEmployeeAppointmentCreateInput, languageCode: LanguagesEnum): Promise<IEmployeeAppointment>;
    /**
     * UPDATE employee appointment
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: IEmployeeAppointmentUpdateInput): Promise<IEmployeeAppointment>;
}
