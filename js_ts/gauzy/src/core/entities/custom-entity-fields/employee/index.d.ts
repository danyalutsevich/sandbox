import { MikroOrmEmployeeEntityCustomFields } from './mikro-orm-employee-entity-custom-fields';
import { TypeOrmEmployeeEntityCustomFields } from './type-orm-employee-entity-custom-fields';
export * from './mikro-orm-employee-entity-custom-fields';
export * from './type-orm-employee-entity-custom-fields';
export type EmployeeEntityCustomFields = TypeOrmEmployeeEntityCustomFields | MikroOrmEmployeeEntityCustomFields;
