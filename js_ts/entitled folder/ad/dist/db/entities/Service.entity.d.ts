import { Relation, BaseEntity } from 'typeorm';
import { UserEntity } from './User.entity.js';
export declare class ServiceEntity extends BaseEntity {
    id: number;
    title: string;
    description: string;
    owner: Relation<UserEntity>;
}
