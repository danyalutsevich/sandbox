import { ValueTransformer } from "typeorm";
/**
 * Convert Non-integer numbers string to integer
 * From https://github.com/typeorm/typeorm/issues/873#issuecomment-502294597
 */
export declare class ColumnNumericTransformerPipe implements ValueTransformer {
    /**
     * Transforms a number to the database value.
     *
     * @param data - The input number.
     * @returns The transformed number or null.
     */
    to(data?: number | null): number | null;
    /**
     * Transforms a string to the entity property value.
     *
     * @param data - The input string.
     * @returns The transformed number or null.
     */
    from(data?: string | null): number | null;
}
