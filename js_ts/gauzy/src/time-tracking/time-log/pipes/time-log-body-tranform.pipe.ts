import { IManualTimeInput, PermissionsEnum } from '../../../../plugins/contracts/dist/index';
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { RequestContext } from "./../../../core/context";

@Injectable()
export class TimeLogBodyTransformPipe implements PipeTransform<IManualTimeInput>  {
    transform(entity: IManualTimeInput, metadata: ArgumentMetadata) {
		if (
			!RequestContext.hasPermission(
				PermissionsEnum.CHANGE_SELECTED_EMPLOYEE
			)
		) {
			const user = RequestContext.currentUser();
            entity.employeeId = user.employeeId;
		}
        return entity;
    }
}