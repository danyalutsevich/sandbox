import { Repository } from 'typeorm';
import { IssueType } from '../issue-type.entity';
export declare class TypeOrmIssueTypeRepository extends Repository<IssueType> {
    readonly repository: Repository<IssueType>;
    constructor(repository: Repository<IssueType>);
}
