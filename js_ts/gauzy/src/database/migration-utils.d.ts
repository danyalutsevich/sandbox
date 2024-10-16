/**
 * Migration utils functions.
 * From https://github.com/typeorm/typeorm/blob/2bb0e398f922561f1cbb8ebbb19d20aa093e8bc2/src/commands/MigrationGenerateCommand.ts
 */
export declare class MigrationUtils {
    /**
     * Creates directories recursively.
     */
    static createDirectories(directory: string): Promise<void>;
    /**
     * Creates a file with the given content in the given path.
     */
    static createFile(filePath: string, content: string, override?: boolean): Promise<void>;
    /**
     * Reads everything from a given file and returns its content as a string.
     */
    static readFile(filePath: string): Promise<string>;
    static fileExists(filePath: string): Promise<boolean>;
}
