import { FileStorageProviderEnum } from '../../../plugins/contracts';
/**
 * Custom decorator to map uploaded files based on the specified storage provider.
 * @param data - The storage provider enum.
 * @returns Promise<UploadedFile>
 */
export declare const UploadedFileStorage: (...dataOrPipes: (import("@nestjs/common").PipeTransform<any, any> | FileStorageProviderEnum | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
