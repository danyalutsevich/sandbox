import { BaseEntityModel as IBaseEntityModel } from '../../../plugins/contracts';
/**
 * Abstract base class for dynamically assigning properties.
 */
export declare abstract class Model {
    constructor(input?: any);
}
/**
 * Base entity class with soft-delete functionality.
 * All entities that extend this class will have soft-delete capability.
 */
export declare abstract class SoftDeletableBaseEntity extends Model {
    deletedAt?: Date;
}
/**
 * Abstract base entity with common fields for UUID, creation, update timestamps, soft-delete, and more.
 */
export declare abstract class BaseEntity extends SoftDeletableBaseEntity implements IBaseEntityModel {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    isArchived?: boolean;
}
