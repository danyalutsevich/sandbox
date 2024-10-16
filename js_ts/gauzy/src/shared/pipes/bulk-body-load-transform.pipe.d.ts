import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class BulkBodyLoadTransformPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): {
        list: string;
    };
}
