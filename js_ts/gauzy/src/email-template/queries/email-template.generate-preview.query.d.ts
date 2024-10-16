import { IQuery } from '@nestjs/cqrs';
export declare class EmailTemplateGeneratePreviewQuery implements IQuery {
    readonly input: string;
    static readonly type = "[EmailTemplate] GeneratePreview";
    constructor(input: string);
}
