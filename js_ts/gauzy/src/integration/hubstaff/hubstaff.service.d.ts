import { HttpService } from '@nestjs/axios';
import { CommandBus } from '@nestjs/cqrs';
import { IIntegrationTenant, IIntegrationMap, IIntegrationSetting, IHubstaffOrganization, IHubstaffProject, IHubstaffTimeSlotActivity, IHubstaffLogFromTimeSlots, ICreateHubstaffIntegrationInput } from '../../../plugins/contracts';
import { IntegrationSettingService } from 'integration-setting/integration-setting.service';
import { RoleService } from 'role/role.service';
import { OrganizationService } from 'organization/organization.service';
import { UserService } from 'user/user.service';
import { IntegrationMapService } from 'integration-map/integration-map.service';
import { IntegrationTenantService } from 'integration-tenant/integration-tenant.service';
import { IntegrationService } from 'integration/integration.service';
export declare class HubstaffService {
    private readonly _httpService;
    private readonly _integrationTenantService;
    private readonly _integrationSettingService;
    private readonly _integrationMapService;
    private readonly _roleService;
    private readonly _organizationService;
    private readonly _userService;
    private readonly _commandBus;
    private readonly _integrationService;
    constructor(_httpService: HttpService, _integrationTenantService: IntegrationTenantService, _integrationSettingService: IntegrationSettingService, _integrationMapService: IntegrationMapService, _roleService: RoleService, _organizationService: OrganizationService, _userService: UserService, _commandBus: CommandBus, _integrationService: IntegrationService);
    fetchIntegration<T = any>(url: string, token: string): Promise<any>;
    refreshToken(integrationId: any): Promise<any>;
    getHubstaffToken(integrationId: any): Promise<IIntegrationSetting>;
    addIntegration(body: ICreateHubstaffIntegrationInput): Promise<IIntegrationTenant>;
    /***
     * Get all organizations
     */
    getOrganizations(token: string): Promise<IHubstaffOrganization[]>;
    fetchOrganizationProjects({ organizationId, token }: {
        organizationId: any;
        token: any;
    }): Promise<IHubstaffProject[]>;
    /**
     *
     * @param param0
     * @returns
     */
    syncProjects({ integrationId, organizationId, projects, token }: {
        integrationId: any;
        organizationId: any;
        projects: any;
        token: any;
    }): Promise<IIntegrationMap[]>;
    /**
     *
     * @param param0
     * @returns
     */
    syncOrganizations({ integrationId, organizationId, organizations, token }: {
        integrationId: any;
        organizationId: any;
        organizations: any;
        token: any;
    }): Promise<IIntegrationMap[]>;
    syncClients({ integrationId, organizationId, clients }: {
        integrationId: any;
        organizationId: any;
        clients: any;
    }): Promise<IIntegrationMap[]>;
    syncScreenshots({ integrationId, screenshots, token, organizationId }: {
        integrationId: any;
        screenshots: any;
        token: any;
        organizationId: any;
    }): Promise<IIntegrationMap[]>;
    syncTasks({ integrationId, projectId, tasks, organizationId }: {
        integrationId: any;
        projectId: any;
        tasks: any;
        organizationId: any;
    }): Promise<IIntegrationMap[]>;
    private _getEmployeeByHubstaffUserId;
    /**
     * Map worked timeslot activity
     *
     * @param timeSlots
     * @returns
     */
    syncTimeSlots(integrationId: string, organizationId: string, employee: IIntegrationMap, timeSlots: IHubstaffTimeSlotActivity[]): Promise<any>;
    syncTimeLogs(timeLogs: any, token: string, integrationId: string, organizationId: string, projectId: string): Promise<IIntegrationMap[]>;
    syncEmployee({ integrationId, user, organizationId }: {
        integrationId: any;
        user: any;
        organizationId: any;
    }): Promise<any>;
    private _handleEmployee;
    private _handleProjects;
    private _handleClients;
    private _handleTasks;
    syncUrlActivities({ integrationId, projectId, activities, token, organizationId }: {
        integrationId: any;
        projectId: any;
        activities: any;
        token: any;
        organizationId: any;
    }): Promise<IIntegrationMap[]>;
    private _handleUrlActivities;
    syncAppActivities({ integrationId, projectId, activities, token, organizationId }: {
        integrationId: any;
        projectId: any;
        activities: any;
        token: any;
        organizationId: any;
    }): Promise<IIntegrationMap[]>;
    private _handleAppActivities;
    private _handleActivities;
    /**
     * Sync activities screenshots
     */
    private _handleScreenshots;
    autoSync({ integrationId, gauzyId, sourceId, token, dateRange }: {
        integrationId: any;
        gauzyId: any;
        sourceId: any;
        token: any;
        dateRange: any;
    }): Promise<any>;
    formatLogsFromSlots(slots: IHubstaffTimeSlotActivity[]): any[];
    /**
     * GET TimeLogs from Activity TimeSlots
     *
     * @param timeSlots
     * @returns
     */
    getLogsActivityFromSlots(timeSlots: IHubstaffTimeSlotActivity[]): IHubstaffLogFromTimeSlots[];
}
