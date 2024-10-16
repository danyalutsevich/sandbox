import { Relation, BaseEntity } from 'typeorm';
import { ServiceEntity } from './Service.entity.js';
export declare class UserEntity extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    services: Relation<ServiceEntity>[];
}
