import { Employee } from './employee.entity';
import { BaseEntityEventSubscriber } from '../core/entities/subscribers/base-entity-event.subscriber';
import { MultiOrmEntityManager } from '../core/entities/subscribers/entity-event-subscriber.types';
export declare class EmployeeSubscriber extends BaseEntityEventSubscriber<Employee> {
    /**
     * Indicates that this subscriber only listen to Employee events.
     */
    listenTo(): typeof Employee;
    /**
     * Called after an Employee entity is loaded from the database.
     *
     * @param entity - The loaded Employee entity.
     * @param event - The LoadEvent associated with the entity loading.
     */
    afterEntityLoad(entity: Employee): Promise<void>;
    /**
     * Called before entity is inserted/created to the database.
     *
     * @param entity
     */
    beforeEntityCreate(entity: Employee): Promise<void>;
    /**
     * Called before the entity is updated in the database.
     *
     * @param entity - The employee entity to be updated.
     */
    beforeEntityUpdate(entity: Employee): Promise<void>;
    /**
     * Called after entity is inserted/created to the database.
     *
     * @param entity
     * @param em
     */
    afterEntityCreate(entity: Employee, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Called after entity is removed from the database.
     *
     * @param entity
     * @param em
     */
    afterEntityDelete(entity: Employee, em?: MultiOrmEntityManager): Promise<void>;
    /**
     * Creates a slug for an Employee entity based on the associated User's information.
     * The slug is generated using the first and last name, username, or email, in that order of preference.
     *
     * @param {Employee} entity - The Employee entity for which to create the slug.
     * @throws {Error} If neither entity nor entity.user is defined, or if slug creation fails.
     */
    createSlug(entity: Employee): Promise<void>;
    /**
     * Calculates and updates the total number of employees for an organization.
     * Handles both TypeORM and MikroORM environments.
     *
     * @param entity The employee entity with organizationId and tenantId.
     * @param em The entity manager, either TypeORM's or MikroORM's.
     */
    calculateTotalEmployees(entity: Employee, em: MultiOrmEntityManager): Promise<void>;
    /**
     * Updates the employee's status based on the start and end work dates.
     *
     * @param entity - The employee entity to be updated.
     */
    private updateEmployeeStatus;
    /**
     * Sets the employee's status flags.
     *
     * @param entity - The employee entity.
     * @param isActive - The active status of the employee.
     * @param isArchived - The archived status of the employee.
     */
    private setEmployeeStatus;
}
