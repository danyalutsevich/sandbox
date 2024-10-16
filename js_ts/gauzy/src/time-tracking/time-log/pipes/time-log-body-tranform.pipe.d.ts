import { IManualTimeInput } from '../../../../plugins/contracts/dist/index';
import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class TimeLogBodyTransformPipe implements PipeTransform<IManualTimeInput> {
    transform(entity: IManualTimeInput, metadata: ArgumentMetadata): IManualTimeInput;
}
