import { ICommandHandler } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { ImportEntityFieldMapOrCreateCommand } from './../import-entity-field-map-or-create.command';
export declare class ImportEntityFieldMapOrCreateHandler implements ICommandHandler<ImportEntityFieldMapOrCreateCommand> {
    private readonly _commandBus;
    constructor(_commandBus: CommandBus);
    execute(event: ImportEntityFieldMapOrCreateCommand): Promise<any>;
    private _create;
}
