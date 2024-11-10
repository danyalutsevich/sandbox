import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
/**
 * UUID Validation Pipe
 *
 * Validates UUID passed in request parameters.
 */
export declare class UUIDValidationPipe implements PipeTransform<string> {
    /**
    * Instance of class-validator
    *
    * Can not be easily injected, and there's no need to do so as we
    * only use it for uuid validation method.
    */
    /**
    * When user requests an entity with invalid UUID we must return 404
    * error before reaching into the database.
    */
    transform(value: string, metadata: ArgumentMetadata): string;
}
