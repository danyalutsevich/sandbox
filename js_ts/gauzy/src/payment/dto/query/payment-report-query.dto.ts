import { IGetPaymentInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { RelationsQueryDTO, SelectorsQueryDTO } from './../../../shared/dto';
import { TimeLogQueryDTO } from 'time-tracking/time-log/dto/query';

/**
 * Get payment report request DTO validation
 */
export class PaymentReportQueryDTO
	extends IntersectionType(
		IntersectionType(SelectorsQueryDTO, RelationsQueryDTO),
		PickType(TimeLogQueryDTO, ['timeZone', 'groupBy'])
	)
	implements IGetPaymentInput {}
