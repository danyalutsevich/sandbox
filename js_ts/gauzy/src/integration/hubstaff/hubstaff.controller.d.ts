import { IIntegrationTenant, IHubstaffOrganization, IHubstaffProject, IIntegrationMap, IIntegrationSetting, ICreateHubstaffIntegrationInput, IOrganization } from '../../../plugins/contracts';
import { HubstaffService } from './hubstaff.service';
export declare class HubstaffController {
    private readonly _hubstaffService;
    constructor(_hubstaffService: HubstaffService);
    /**
     *
     *
     * @param integrationId
     * @returns
     */
    getHubstaffTokenByIntegration(integrationId: IIntegrationTenant['id']): Promise<IIntegrationSetting>;
    /**
     *
     * @param integrationId
     * @returns
     */
    refreshHubstaffTokenByIntegration(integrationId: IIntegrationTenant['id']): Promise<string>;
    /**
     *
     * @param body
     * @returns
     */
    create(body: ICreateHubstaffIntegrationInput): Promise<IIntegrationTenant>;
    /**
     *
     * @param integrationId
     * @param body
     * @returns
     */
    getOrganizations(token: string): Promise<IHubstaffOrganization[]>;
    /**
     *
     * @param organizationId
     * @param body
     * @returns
     */
    getProjects(organizationId: IOrganization['id'], token: string): Promise<IHubstaffProject[]>;
    /**
     *
     * @param integrationId
     * @param body
     * @returns
     */
    syncProjects(input: any): Promise<IIntegrationMap[]>;
    /**
     *
     * @param integrationId
     * @param body
     * @returns
     */
    syncOrganizations(input: any): Promise<IIntegrationMap[]>;
    /**
     *
     * @param integrationId
     * @param body
     * @returns
     */
    autoSync(integrationId: string, body: any): Promise<any>;
}
