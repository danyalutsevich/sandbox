import { CommandBus } from '@nestjs/cqrs';
import { IAccessTokenSecretPair, IAccessToken, IAccessTokenDto, IGetContractsDto, IGetWorkDiaryDto, IEngagement, IUpworkApiConfig, IIntegrationMap, IUpworkDateRange, IUpworkClientSecretPair, IPagination, ITimeLog } from '../../plugins/contracts/dist/index';
import { IntegrationMapService } from '../integration-map/integration-map.service';
import { UserService } from '../user/user.service';
import { OrganizationService } from '../organization/organization.service';
import { RoleService } from '../role/role.service';
import { TimeSlotService } from '../time-tracking/time-slot/time-slot.service';
import { ExpenseService } from '../expense/expense.service';
import { IncomeService } from '../income/income.service';
import { UpworkReportService } from '../../plugins/plugins/integration-upwork/dist/index';
export declare class UpworkService {
    private readonly _expenseService;
    private readonly _incomeService;
    private readonly _integrationMapService;
    private readonly _userService;
    private readonly _roleService;
    private readonly _organizationService;
    private readonly _timeSlotService;
    private readonly _upworkReportService;
    private readonly commandBus;
    private _upworkApi;
    constructor(_expenseService: ExpenseService, _incomeService: IncomeService, _integrationMapService: IntegrationMapService, _userService: UserService, _roleService: RoleService, _organizationService: OrganizationService, _timeSlotService: TimeSlotService, _upworkReportService: UpworkReportService, commandBus: CommandBus);
    private _consumerHasAccessToken;
    getAccessTokenSecretPair(config: IUpworkClientSecretPair, organizationId: string): Promise<IAccessTokenSecretPair>;
    getAccessToken({ requestToken, verifier }: IAccessTokenDto, organizationId: string): Promise<IAccessToken>;
    getConfig(integrationId: string, filter: any): Promise<IUpworkApiConfig>;
    getContractsForFreelancer(getEngagementsDto: IGetContractsDto): Promise<IEngagement[]>;
    private _getContractByContractId;
    syncContracts({ integrationId, organizationId, contracts }: {
        integrationId: any;
        organizationId: any;
        contracts: any;
    }): Promise<IIntegrationMap[]>;
    getWorkDiary(getWorkDiaryDto: IGetWorkDiaryDto): Promise<any>;
    syncTimeLog(timeLog: any): Promise<ITimeLog>;
    syncTimeSlots({ timeSlots, employeeId, integrationId, sourceId, organizationId }: {
        timeSlots: any;
        employeeId: any;
        integrationId: any;
        sourceId: any;
        organizationId: any;
    }): Promise<any[]>;
    syncWorkDiaries(organizationId: string, integrationId: string, syncedContracts: any, config: IUpworkApiConfig, employeeId: string, forDate: any): Promise<any[]>;
    formatLogsFromSlots(slots: any): any[];
    syncContractsRelatedData({ integrationId, organizationId, contracts, employeeId, config, entitiesToSync, providerReferenceId, providerId }: {
        integrationId: any;
        organizationId: any;
        contracts: any;
        employeeId: any;
        config: any;
        entitiesToSync: any;
        providerReferenceId: any;
        providerId: any;
    }): Promise<any[]>;
    syncTimeSlotsActivity({ employeeId, organizationId, timeSlot, timeSlotActivity }: {
        employeeId: any;
        organizationId: any;
        timeSlot: any;
        timeSlotActivity: any;
    }): Promise<any[]>;
    getTimeSlotActivitiesByContractId({ contractId, employeeId, organizationId, config, timeSlots }: {
        contractId: any;
        employeeId: any;
        organizationId: any;
        config: any;
        timeSlots: any;
    }): Promise<any[]>;
    /**
     * Get snapshots for given contractId and Unix time
     */
    getSnapshotByContractId(config: IUpworkApiConfig, contractId: any, timeSlot: any): Promise<any>;
    syncSnapshots(timeSlotsData: any): Promise<any[]>;
    private _getUpworkAuthenticatedUser;
    private _getUpworkUserInfo;
    private _handleEmployee;
    private _getUpworkGauzyEmployee;
    syncEmployee({ integrationId, user, organizationId }: {
        integrationId: any;
        user: any;
        organizationId: any;
    }): Promise<any>;
    /**
     * Sync contract client
     */
    syncClient(integrationId: string, organizationId: string, client: any): Promise<IIntegrationMap>;
    syncReports(organizationId: string, integrationId: string, config: IUpworkApiConfig, employeeId: string, providerReferenceId: string, providerId: string, dateRange: IUpworkDateRange): Promise<{
        syncedIncome: any[];
        syncedExpense: any;
    }>;
    private _syncExpense;
    private _syncIncome;
    /**
     * Get all reports for upwork integration
     */
    getReportListByIntegration(integrationId: string, filter: any, relations: any): Promise<IPagination<any>>;
}
