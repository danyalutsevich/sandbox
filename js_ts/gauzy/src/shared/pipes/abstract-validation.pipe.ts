import { ArgumentMetadata, Injectable, Type, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

@Injectable()
export class AbstractValidationPipe {
    private readonly validationPipe: ValidationPipe;

    constructor(
        protected readonly options: ValidationPipeOptions,
        private readonly targetTypes: {
            body?: Type<any>;
            query?: Type<any>;
            param?: Type<any>;
            custom?: Type<any>;
        }
    ) {
        this.validationPipe = new ValidationPipe(options);
    }

    async transform(value: any, metadata: ArgumentMetadata) {
        const targetType = this.targetTypes[metadata.type];
        if (!targetType) {
            return await this.validationPipe.transform(value, metadata);
        }
        return await this.validationPipe.transform(value, { ...metadata, metatype: targetType });
    }
}
