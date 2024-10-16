import { OnModuleInit } from '@nestjs/common';
export declare class EmailTemplateReaderService implements OnModuleInit {
    private _folderPath;
    get folderPath(): string;
    set folderPath(value: string);
    constructor();
    onModuleInit(): void;
    /**
     * Read email template from core folder using name
     *
     * @param name
     */
    readEmailTemplate(folder: string): Array<Object>;
}
