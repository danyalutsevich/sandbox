import { EstimateEmailService } from './estimate-email.service';
import { FindEstimateEmailQueryDTO } from './dto';
export declare class EstimateEmailController {
    private readonly estimateEmailService;
    constructor(estimateEmailService: EstimateEmailService);
    /**
     * Validate estimate email request
     *
     * @param params
     * @returns
     */
    validateEstimateEmail(params: FindEstimateEmailQueryDTO): Promise<import("../../plugins/contracts/dist").IEstimateEmail>;
}
