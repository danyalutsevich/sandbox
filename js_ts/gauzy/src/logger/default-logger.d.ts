import { LoggerService } from '@nestjs/common';
export declare class DefaultLogger implements LoggerService {
    logger: (message?: any, ...optionalParams: any[]) => void;
    private _defaultContext;
    get defaultContext(): string;
    set defaultContext(context: string);
    constructor(options?: any);
    log(message: any, context?: string): void;
    error(message: string, context?: string, trace?: string | undefined): void;
    warn(message: string, context?: string): void;
    info(message: string, context?: string): void;
    verbose(message: string, context?: string): void;
    debug(message: string, context?: string): void;
    private printLog;
    private printContext;
}
