import { Repository } from 'typeorm';
import { Activity } from '../activity.entity';
export declare class TypeOrmActivityRepository extends Repository<Activity> {
    readonly repository: Repository<Activity>;
    constructor(repository: Repository<Activity>);
}
