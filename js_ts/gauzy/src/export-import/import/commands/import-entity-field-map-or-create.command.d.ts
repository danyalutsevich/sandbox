import { ICommand } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
export declare class ImportEntityFieldMapOrCreateCommand implements ICommand {
    readonly repository: Repository<any>;
    readonly where: any;
    readonly entity: any;
    readonly sourceId: string;
    static readonly type = "[Import Entity] Map Or Create";
    constructor(repository: Repository<any>, where: any, entity: any, sourceId: string);
}
