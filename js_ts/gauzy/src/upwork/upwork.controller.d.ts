import { IAccessToken, IAccessTokenSecretPair, IAccessTokenDto, IGetWorkDiaryDto, IGetContractsDto, IEngagement, IUpworkApiConfig, IUpworkClientSecretPair, IPagination } from '../../plugins/contracts/dist/index';
import { UpworkTransactionService } from './upwork-transaction.service';
import { UpworkService } from './upwork.service';
export declare class UpworkController {
    private readonly _upworkTransactionService;
    private readonly _upworkService;
    constructor(_upworkTransactionService: UpworkTransactionService, _upworkService: UpworkService);
    /**
     *
     * @param file
     * @param organizationDto
     * @returns
     */
    create(file: any, organizationDto: any): Promise<any>;
    /**
     *
     * @param config
     * @param organizationId
     * @returns
     */
    getAccessTokenSecretPair(config: IUpworkClientSecretPair, organizationId: string): Promise<IAccessTokenSecretPair>;
    /**
     *
     * @param accessTokenDto
     * @param organizationId
     * @returns
     */
    getAccessToken(accessTokenDto: IAccessTokenDto, organizationId: string): Promise<IAccessToken>;
    /**
     *
     * @param data
     * @returns
     */
    getWorkDiary(data: IGetWorkDiaryDto): Promise<any>;
    /**
     *
     * @param data
     * @returns
     */
    getContracts(data: IGetContractsDto): Promise<IEngagement[]>;
    /**
     *
     * @param integrationId
     * @param data
     * @returns
     */
    getConfig(integrationId: string, data: any): Promise<IUpworkApiConfig>;
    /**
     *
     * @param syncContractsDto
     * @returns
     */
    syncContracts(syncContractsDto: any): Promise<any>;
    /**
     *
     * @param dto
     * @returns
     */
    syncContractsRelatedData(dto: any): Promise<any>;
    /**
     *
     * @param integrationId
     * @param data
     * @returns
     */
    getReports(integrationId: string, data: any): Promise<IPagination<any>>;
}
