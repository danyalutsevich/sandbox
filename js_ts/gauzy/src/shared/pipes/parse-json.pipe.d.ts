import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';
export interface ParseJsonPipeOptions {
    throwInvalidError?: boolean;
    errorHttpStatusCode?: ErrorHttpStatusCode;
    exceptionFactory?: (error: string) => any;
}
/**
 * JSON Parse Pipe
 * Validates UUID passed in request parameters.
 */
export declare class ParseJsonPipe implements PipeTransform<string> {
    /**
     * Throw invalid JSON error or not ? default to "false"
     */
    protected throwInvalidError: boolean;
    protected exceptionFactory: (error: string) => any;
    /**
     * Instance of class-validator
     * Can not be easily injected, and there's no need to do so as we
     * only use it for json validation method.
     */
    constructor(options?: ParseJsonPipeOptions);
    /**
     * @param value currently processed route argument
     * @param metadata contains metadata about the currently processed route argument
     */
    transform(value: string, metadata: ArgumentMetadata): Promise<any>;
}
