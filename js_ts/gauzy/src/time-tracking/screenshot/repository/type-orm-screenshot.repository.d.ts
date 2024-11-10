import { Repository } from 'typeorm';
import { Screenshot } from '../screenshot.entity';
export declare class TypeOrmScreenshotRepository extends Repository<Screenshot> {
    readonly repository: Repository<Screenshot>;
    constructor(repository: Repository<Screenshot>);
}
