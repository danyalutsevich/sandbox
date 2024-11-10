/// <reference types="node" />
import { ConfigService } from '../../plugins/config/dist/index';
export declare class PdfmakerService {
    private readonly configService;
    private readonly public_path;
    private _dirname;
    private _basename;
    private fonts;
    private _fileName;
    setFilename(filename: string): this;
    get filename(): string;
    constructor(configService: ConfigService);
    generatePdf(docDefinition: any): Promise<Buffer>;
}
