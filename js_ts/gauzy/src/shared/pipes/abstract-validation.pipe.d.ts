import { ArgumentMetadata, Type, ValidationPipe, ValidationPipeOptions } from "@nestjs/common";
export declare class AbstractValidationPipe extends ValidationPipe {
    protected readonly options: ValidationPipeOptions;
    private readonly targetTypes;
    constructor(options: ValidationPipeOptions, targetTypes: {
        body?: Type<any>;
        query?: Type<any>;
        param?: Type<any>;
        custom?: Type<any>;
    });
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
