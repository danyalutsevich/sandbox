import { NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export declare function LazyFileInterceptor(fieldName: string, localOptions?: MulterOptions): Type<NestInterceptor>;
