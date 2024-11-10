"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubstaffService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const cqrs_1 = require("@nestjs/cqrs");
const operators_1 = require("rxjs/operators");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const index_3 = require("../../../plugins/plugins/integration-hubstaff/dist/index");
const rxjs_1 = require("rxjs");
const context_1 = require("core/context");
const utils_1 = require("core/utils");
const integration_setting_service_1 = require("integration-setting/integration-setting.service");
const commands_1 = require("organization-contact/commands");
const commands_2 = require("employee/commands");
const role_service_1 = require("role/role.service");
const organization_service_1 = require("organization/organization.service");
const user_service_1 = require("user/user.service");
const integration_map_service_1 = require("integration-map/integration-map.service");
const commands_3 = require("integration-map/commands");
const integration_tenant_service_1 = require("integration-tenant/integration-tenant.service");
const commands_4 = require("integration-tenant/commands");
const integration_service_1 = require("integration/integration.service");
let HubstaffService = exports.HubstaffService = class HubstaffService {
    _httpService;
    _integrationTenantService;
    _integrationSettingService;
    _integrationMapService;
    _roleService;
    _organizationService;
    _userService;
    _commandBus;
    _integrationService;
    constructor(_httpService, _integrationTenantService, _integrationSettingService, _integrationMapService, _roleService, _organizationService, _userService, _commandBus, _integrationService) {
        this._httpService = _httpService;
        this._integrationTenantService = _integrationTenantService;
        this._integrationSettingService = _integrationSettingService;
        this._integrationMapService = _integrationMapService;
        this._roleService = _roleService;
        this._organizationService = _organizationService;
        this._userService = _userService;
        this._commandBus = _commandBus;
        this._integrationService = _integrationService;
    }
    async fetchIntegration(url, token) {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return (0, rxjs_1.firstValueFrom)(this._httpService.get(url, { headers }).pipe((0, operators_1.catchError)((error) => {
            const response = error.response;
            console.log('Error while hubstaff API: %s', response);
            /** Handle hubstaff http exception */
            throw new common_1.HttpException({ message: error.message, error }, response.status);
        }), (0, operators_1.map)((response) => response.data)));
    }
    async refreshToken(integrationId) {
        const { items: settings } = await this._integrationSettingService.findAll({
            where: {
                integration: { id: integrationId }
            }
        });
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        const urlParams = new URLSearchParams();
        const { client_id, client_secret, refresh_token } = settings.reduce((prev, current) => {
            return {
                ...prev,
                client_id: current.settingsName === 'client_id'
                    ? current.settingsValue
                    : prev.client_id,
                client_secret: current.settingsName === 'client_secret'
                    ? current.settingsValue
                    : prev.client_secret,
                refresh_token: current.settingsName === 'refresh_token'
                    ? current.settingsValue
                    : prev.refresh_token
            };
        }, {
            client_id: '',
            client_secret: '',
            refresh_token: ''
        });
        urlParams.append('grant_type', 'refresh_token');
        urlParams.append('refresh_token', refresh_token);
        urlParams.append('client_id', client_id);
        urlParams.append('client_secret', client_secret);
        try {
            const tokens$ = this._httpService.post(`${index_3.HUBSTAFF_AUTHORIZATION_URL}/access_tokens`, urlParams, {
                headers
            }).pipe((0, operators_1.map)((response) => response.data));
            const tokens = await (0, rxjs_1.lastValueFrom)(tokens$);
            const settingsDto = settings.map((setting) => {
                if (setting.settingsName === 'access_token') {
                    setting.settingsValue = tokens.access_token;
                }
                if (setting.settingsName === 'refresh_token') {
                    setting.settingsValue = tokens.refresh_token;
                }
                return setting;
            });
            await this._integrationSettingService.create(settingsDto);
            return tokens;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getHubstaffToken(integrationId) {
        const { record: integrationSetting } = await this._integrationSettingService.findOneOrFailByOptions({
            where: {
                integration: { id: integrationId },
                settingsName: 'access_token'
            }
        });
        return integrationSetting;
    }
    async addIntegration(body) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { client_id, client_secret, code, redirect_uri, organizationId } = body;
        const urlParams = new URLSearchParams();
        urlParams.append('client_id', client_id);
        urlParams.append('code', code);
        urlParams.append('grant_type', 'authorization_code');
        urlParams.append('redirect_uri', redirect_uri);
        urlParams.append('client_secret', client_secret);
        /** */
        const integration = await this._integrationService.findOneByOptions({
            where: {
                provider: contracts_1.IntegrationEnum.HUBSTAFF
            }
        });
        const tiedEntities = index_3.PROJECT_TIED_ENTITIES.map(entity => ({
            ...entity,
            organizationId,
            tenantId
        }));
        const entitySettings = index_3.DEFAULT_ENTITY_SETTINGS.map((settingEntity) => {
            if (settingEntity.entity === contracts_1.IntegrationEntity.PROJECT) {
                return {
                    ...settingEntity,
                    tiedEntities
                };
            }
            return {
                ...settingEntity,
                organizationId,
                tenantId
            };
        });
        const tokens$ = this._httpService.post(`${index_3.HUBSTAFF_AUTHORIZATION_URL}/access_tokens`, urlParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).pipe((0, operators_1.switchMap)(({ data }) => this._commandBus.execute(new commands_4.IntegrationTenantUpdateOrCreateCommand({
            name: contracts_1.IntegrationEnum.HUBSTAFF,
            integration: {
                provider: contracts_1.IntegrationEnum.HUBSTAFF
            },
            tenantId,
            organizationId,
        }, {
            name: contracts_1.IntegrationEnum.HUBSTAFF,
            integration,
            organizationId,
            tenantId,
            entitySettings: entitySettings,
            settings: [
                {
                    settingsName: 'client_id',
                    settingsValue: client_id
                },
                {
                    settingsName: 'client_secret',
                    settingsValue: client_secret
                },
                {
                    settingsName: 'access_token',
                    settingsValue: data.access_token
                },
                {
                    settingsName: 'refresh_token',
                    settingsValue: data.refresh_token
                }
            ].map((setting) => ({
                ...setting,
                tenantId,
                organizationId,
            }))
        }))), (0, operators_1.catchError)((err) => {
            throw new common_1.BadRequestException(err);
        }));
        return await (0, rxjs_1.lastValueFrom)(tokens$);
    }
    /***
     * Get all organizations
     */
    async getOrganizations(token) {
        const { organizations } = await this.fetchIntegration('organizations', token);
        return organizations;
    }
    /*
     * Fetch all organization projects
     */
    async fetchOrganizationProjects({ organizationId, token }) {
        const { projects } = await this.fetchIntegration(`organizations/${organizationId}/projects?status=all&include=clients`, token);
        return projects;
    }
    /**
     *
     * @param param0
     * @returns
     */
    async syncProjects({ integrationId, organizationId, projects, token }) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            return await Promise.all(await projects.map(async ({ sourceId }) => {
                const { project } = await this.fetchIntegration(`projects/${sourceId}`, token);
                /** Third Party Organization Project Map */
                return await this._commandBus.execute(new commands_3.IntegrationMapSyncProjectCommand({
                    entity: {
                        name: project.name,
                        description: project.description,
                        billable: project.billable,
                        public: true,
                        billing: contracts_1.ProjectBillingEnum.RATE,
                        currency: index_1.environment.defaultCurrency,
                        organizationId,
                        tenantId,
                        /** Set Project Budget Here */
                        ...(project.budget
                            ? {
                                budgetType: project.budget.type || contracts_1.OrganizationProjectBudgetTypeEnum.COST,
                                startDate: project.budget.start_date || null,
                                budget: project.budget[project.budget.type || contracts_1.OrganizationProjectBudgetTypeEnum.COST]
                            }
                            : {}),
                    },
                    sourceId,
                    integrationId,
                    organizationId,
                    tenantId
                }));
            }));
        }
        catch (error) {
            console.log(`Error while syncing ${contracts_1.IntegrationEntity.PROJECT} entity for organization (${organizationId}): %s`, error?.message);
            throw new common_1.HttpException({ message: error?.message, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    /**
     *
     * @param param0
     * @returns
     */
    async syncOrganizations({ integrationId, organizationId, organizations, token }) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            return await Promise.all(await organizations.map(async ({ sourceId }) => {
                const { organization } = await this.fetchIntegration(`organizations/${sourceId}`, token);
                /** Third Party Organization Map */
                return await this._commandBus.execute(new commands_3.IntegrationMapSyncOrganizationCommand({
                    entity: {
                        name: organization.name,
                        isActive: organization.status == 'active',
                        currency: index_1.environment.defaultCurrency
                    },
                    sourceId,
                    integrationId,
                    organizationId,
                    tenantId
                }));
            }));
        }
        catch (error) {
            console.log(`Error while syncing ${contracts_1.IntegrationEntity.ORGANIZATION} entity (${organizationId}): %s`, error?.message);
            throw new common_1.HttpException({ message: error?.message, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async syncClients({ integrationId, organizationId, clients }) {
        try {
            return await Promise.all(await clients.map(async ({ id, name, emails, phone, budget = {} }) => {
                const { record } = await this._integrationMapService.findOneOrFailByOptions({
                    where: {
                        sourceId: id,
                        entity: contracts_1.IntegrationEntity.CLIENT,
                        organizationId
                    }
                });
                if (record) {
                    return record;
                }
                /**
                 * Set Client Budget Here
                 */
                let clientBudget = {};
                if ((0, index_2.isNotEmpty)(budget)) {
                    clientBudget['budgetType'] = budget.type || contracts_1.OrganizationContactBudgetTypeEnum.COST;
                    clientBudget['budget'] = budget[clientBudget['budgetType']];
                }
                const gauzyClient = await this._commandBus.execute(new commands_1.OrganizationContactCreateCommand({
                    name,
                    organizationId,
                    primaryEmail: emails[0],
                    primaryPhone: phone,
                    contactType: contracts_1.ContactType.CLIENT,
                    ...clientBudget
                }));
                return await this._commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
                    gauzyId: gauzyClient.id,
                    integrationId,
                    sourceId: id,
                    entity: contracts_1.IntegrationEntity.CLIENT,
                    organizationId
                }));
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync ${contracts_1.IntegrationEntity.CLIENT}`);
        }
    }
    /*
     * Sync screenshot using timeslot
     */
    async syncScreenshots({ integrationId, screenshots, token, organizationId }) {
        try {
            let integratedScreenshots = [];
            for await (const screenshot of screenshots) {
                const { id, user_id } = screenshot;
                const employee = await this._getEmployeeByHubstaffUserId(user_id, token, integrationId, organizationId);
                integratedScreenshots.push(await this._commandBus.execute(new commands_3.IntegrationMapSyncScreenshotCommand({
                    entity: {
                        employeeId: employee ? employee.gauzyId : null,
                        ...screenshot
                    },
                    sourceId: id,
                    integrationId,
                    organizationId
                })));
            }
            return integratedScreenshots;
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync ${contracts_1.IntegrationEntity.SCREENSHOT}`);
        }
    }
    async syncTasks({ integrationId, projectId, tasks, organizationId }) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const creatorId = context_1.RequestContext.currentUserId();
            return await Promise.all(await tasks.map(async ({ summary: title, details = null, id, status, due_at }) => {
                if (!due_at) {
                    due_at = new Date((0, moment_1.default)().add(2, 'week').format('YYYY-MM-DD HH:mm:ss'));
                }
                // Step 1: Execute a command to initiate the synchronization process
                const triggeredEvent = false;
                return await this._commandBus.execute(new commands_3.IntegrationMapSyncTaskCommand({
                    entity: {
                        title,
                        projectId,
                        description: details,
                        status: status.charAt(0).toUpperCase() + status.slice(1),
                        creatorId,
                        dueDate: due_at,
                        organizationId,
                        tenantId
                    },
                    sourceId: id,
                    integrationId,
                    organizationId,
                    tenantId
                }, triggeredEvent));
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync ${contracts_1.IntegrationEntity.TASK}`);
        }
    }
    async _getEmployeeByHubstaffUserId(user_id, token, integrationId, organizationId) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            return await this._integrationMapService.findOneByOptions({
                where: {
                    sourceId: user_id,
                    entity: contracts_1.IntegrationEntity.EMPLOYEE,
                    organizationId,
                    tenantId
                }
            });
        }
        catch (error) {
            return await this._handleEmployee({
                user_id,
                token,
                integrationId,
                organizationId
            });
        }
    }
    /**
     * Map worked timeslot activity
     *
     * @param timeSlots
     * @returns
     */
    async syncTimeSlots(integrationId, organizationId, employee, timeSlots) {
        try {
            return timeSlots
                .filter(async (timeslot) => {
                return !!await this._commandBus.execute(new commands_3.IntegrationMapSyncTimeSlotCommand({
                    entity: {
                        ...timeslot,
                        employeeId: employee.gauzyId
                    },
                    sourceId: (timeslot.id).toString(),
                    integrationId,
                    organizationId
                }));
            })
                .map(({ keyboard, mouse, overall, tracked, time_slot }) => ({
                keyboard,
                mouse,
                overall,
                duration: tracked,
                startedAt: time_slot
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync ${contracts_1.IntegrationEntity.TIME_SLOT}`);
        }
    }
    async syncTimeLogs(timeLogs, token, integrationId, organizationId, projectId) {
        try {
            let integratedTimeLogs = [];
            const tenantId = context_1.RequestContext.currentTenantId();
            for await (const timeLog of timeLogs) {
                const { id, user_id, task_id, logType, startedAt, stoppedAt, timeSlots } = timeLog;
                const employee = await this._getEmployeeByHubstaffUserId(user_id, token, integrationId, organizationId);
                const { record } = await this._integrationMapService.findOneOrFailByOptions({
                    where: {
                        sourceId: task_id,
                        entity: contracts_1.IntegrationEntity.TASK,
                        organizationId,
                        tenantId
                    }
                });
                const syncTimeSlots = await this.syncTimeSlots(integrationId, organizationId, employee, timeSlots);
                integratedTimeLogs.push(await this._commandBus.execute(new commands_3.IntegrationMapSyncTimeLogCommand({
                    entity: {
                        projectId,
                        employeeId: employee.gauzyId,
                        taskId: record ? record.gauzyId : null,
                        logType,
                        startedAt,
                        stoppedAt,
                        source: contracts_1.TimeLogSourceEnum.HUBSTAFF,
                        organizationId,
                        tenantId,
                        timeSlots: syncTimeSlots
                    },
                    sourceId: id,
                    integrationId,
                    organizationId
                })));
            }
            return integratedTimeLogs;
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync ${contracts_1.IntegrationEntity.TIME_LOG}`);
        }
    }
    async syncEmployee({ integrationId, user, organizationId }) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { record } = await this._userService.findOneOrFailByOptions({
                where: {
                    email: user.email,
                    tenantId
                }
            });
            let employee;
            if (record) {
                employee = await this._commandBus.execute(new commands_2.EmployeeGetCommand({ where: { userId: record.id } }));
            }
            else {
                const [role, organization] = await Promise.all([
                    await this._roleService.findOneByOptions({
                        where: {
                            name: contracts_1.RolesEnum.EMPLOYEE,
                            tenantId
                        }
                    }),
                    await this._organizationService.findOneByOptions({
                        where: {
                            id: organizationId,
                            tenantId
                        }
                    })
                ]);
                const [firstName, lastName] = user.name.split(' ');
                const isActive = user.status === 'active' ? true : false;
                employee = await this._commandBus.execute(new commands_2.EmployeeCreateCommand({
                    user: {
                        email: user.email,
                        firstName,
                        lastName,
                        role,
                        tags: null,
                        tenantId,
                        preferredComponentLayout: contracts_1.ComponentLayoutStyleEnum.TABLE,
                        thirdPartyId: user.id
                    },
                    password: index_1.environment.defaultIntegratedUserPass,
                    organization,
                    startedWorkOn: new Date((0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                    isActive,
                    tenantId
                }));
            }
            return await this._commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
                gauzyId: employee.id,
                integrationId,
                sourceId: user.id,
                entity: contracts_1.IntegrationEntity.EMPLOYEE,
                organizationId
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync ${contracts_1.IntegrationEntity.EMPLOYEE}`);
        }
    }
    async _handleEmployee({ user_id, integrationId, token, organizationId }) {
        try {
            const { user } = await this.fetchIntegration(`users/${user_id}`, token);
            return await this.syncEmployee({
                integrationId,
                user,
                organizationId
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t handle ${contracts_1.IntegrationEntity.EMPLOYEE}`);
        }
    }
    async _handleProjects(sourceId, integrationId, gauzyId, token) {
        try {
            const { projects } = await this.fetchIntegration(`organizations/${sourceId}/projects?status=all`, token);
            const projectMap = projects.map(({ name, id, billable, description }) => ({
                name,
                sourceId: id,
                billable,
                description
            }));
            return await this.syncProjects({
                integrationId,
                organizationId: gauzyId,
                projects: projectMap,
                token
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(`Can\'t handle ${contracts_1.IntegrationEntity.PROJECT}`);
        }
    }
    async _handleClients(sourceId, integrationId, gauzyId, token) {
        try {
            const { clients } = await this.fetchIntegration(`organizations/${sourceId}/clients?status=active`, token);
            return await this.syncClients({
                integrationId,
                organizationId: gauzyId,
                clients
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t handle ${contracts_1.IntegrationEntity.CLIENT}`);
        }
    }
    async _handleTasks(projectsMap, integrationId, token, gauzyId) {
        try {
            const tasksMap = await Promise.all(projectsMap.map(async (project) => {
                const { tasks } = await this.fetchIntegration(`projects/${project.sourceId}/tasks`, token);
                return await this.syncTasks({
                    integrationId,
                    tasks,
                    projectId: project.gauzyId,
                    organizationId: gauzyId
                });
            }));
            return tasksMap;
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t handle ${contracts_1.IntegrationEntity.TASK}`);
        }
    }
    /*
     * Sync with database urls activities
     */
    async syncUrlActivities({ integrationId, projectId, activities, token, organizationId }) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            return await Promise.all(await activities.map(async ({ id, site, tracked, user_id, time_slot, task_id }) => {
                const time = (0, moment_1.default)(time_slot).format('HH:mm:ss');
                const date = (0, moment_1.default)(time_slot).format('YYYY-MM-DD');
                const employee = await this._getEmployeeByHubstaffUserId(user_id, token, integrationId, organizationId);
                const { record: task } = await this._integrationMapService.findOneOrFailByOptions({
                    where: {
                        sourceId: task_id,
                        entity: contracts_1.IntegrationEntity.TASK,
                        organizationId,
                        tenantId
                    }
                });
                const entity = {
                    title: site,
                    duration: tracked,
                    type: contracts_1.ActivityType.URL,
                    time,
                    date,
                    projectId,
                    employeeId: employee ? employee.gauzyId : null,
                    taskId: task ? task.gauzyId : null,
                    organizationId,
                    activityTimestamp: time_slot
                };
                return await this._commandBus.execute(new commands_3.IntegrationMapSyncActivityCommand({
                    entity,
                    sourceId: id,
                    integrationId,
                    organizationId
                }));
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync URL ${contracts_1.IntegrationEntity.ACTIVITY}`);
        }
    }
    /*
     * auto sync for urls activities for separate project
     */
    async _handleUrlActivities(projectsMap, integrationId, token, organizationId, dateRange) {
        try {
            const start = (0, moment_1.default)(dateRange.start).format('YYYY-MM-DD');
            const end = (0, moment_1.default)(dateRange.end).format('YYYY-MM-DD');
            const pageLimit = 500;
            const urlActivitiesMapped = await Promise.all(projectsMap.map(async (project) => {
                const { gauzyId, sourceId } = project;
                const syncedActivities = {
                    urlActivities: []
                };
                let stillRecordsAvailable = true;
                let nextPageStartId = null;
                while (stillRecordsAvailable) {
                    let url = `projects/${sourceId}/url_activities?page_limit=${pageLimit}&time_slot[start]=${start}&time_slot[stop]=${end}`;
                    if (nextPageStartId) {
                        url += `&page_start_id=${nextPageStartId}`;
                    }
                    const { urls, pagination = {} } = await this.fetchIntegration(url, token);
                    if (pagination &&
                        pagination.hasOwnProperty('next_page_start_id')) {
                        const { next_page_start_id } = pagination;
                        nextPageStartId = next_page_start_id;
                        stillRecordsAvailable = true;
                    }
                    else {
                        nextPageStartId = null;
                        stillRecordsAvailable = false;
                    }
                    syncedActivities.urlActivities.push(urls);
                }
                const activities = [].concat.apply([], syncedActivities.urlActivities);
                return await this.syncUrlActivities({
                    integrationId,
                    projectId: gauzyId,
                    activities,
                    token,
                    organizationId
                });
            }));
            return urlActivitiesMapped;
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t handle URL ${contracts_1.IntegrationEntity.ACTIVITY}`);
        }
    }
    /*
     * Sync with database application activities
     */
    async syncAppActivities({ integrationId, projectId, activities, token, organizationId }) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            return await Promise.all(await activities.map(async ({ id, name, tracked, user_id, time_slot, task_id }) => {
                const time = (0, moment_1.default)(time_slot).format('HH:mm:ss');
                const date = (0, moment_1.default)(time_slot).format('YYYY-MM-DD');
                const employee = await this._getEmployeeByHubstaffUserId(user_id, token, integrationId, organizationId);
                const { record: task } = await this._integrationMapService.findOneOrFailByOptions({
                    where: {
                        sourceId: task_id,
                        entity: contracts_1.IntegrationEntity.TASK,
                        organizationId,
                        tenantId
                    }
                });
                const entity = {
                    title: name,
                    duration: tracked,
                    type: contracts_1.ActivityType.APP,
                    time,
                    date,
                    projectId,
                    employeeId: employee ? employee.gauzyId : null,
                    taskId: task ? task.gauzyId : null,
                    organizationId,
                    activityTimestamp: time_slot
                };
                return await this._commandBus.execute(new commands_3.IntegrationMapSyncActivityCommand({
                    entity,
                    sourceId: id,
                    integrationId,
                    organizationId
                }));
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync APP ${contracts_1.IntegrationEntity.ACTIVITY}`);
        }
    }
    /*
     * auto sync for application activities for separate project
     */
    async _handleAppActivities(projectsMap, integrationId, token, organizationId, dateRange) {
        try {
            const start = (0, moment_1.default)(dateRange.start).format('YYYY-MM-DD');
            const end = (0, moment_1.default)(dateRange.end).format('YYYY-MM-DD');
            const pageLimit = 500;
            const appActivitiesMapped = await Promise.all(projectsMap.map(async (project) => {
                const { gauzyId, sourceId } = project;
                const syncedActivities = {
                    applicationActivities: []
                };
                let stillRecordsAvailable = true;
                let nextPageStartId = null;
                while (stillRecordsAvailable) {
                    let url = `projects/${sourceId}/application_activities?page_limit=${pageLimit}&time_slot[start]=${start}&time_slot[stop]=${end}`;
                    if (nextPageStartId) {
                        url += `&page_start_id=${nextPageStartId}`;
                    }
                    const { applications, pagination = {} } = await this.fetchIntegration(url, token);
                    if (pagination &&
                        pagination.hasOwnProperty('next_page_start_id')) {
                        const { next_page_start_id } = pagination;
                        nextPageStartId = next_page_start_id;
                        stillRecordsAvailable = true;
                    }
                    else {
                        nextPageStartId = null;
                        stillRecordsAvailable = false;
                    }
                    syncedActivities.applicationActivities.push(applications);
                }
                const activities = [].concat.apply([], syncedActivities.applicationActivities);
                return await this.syncAppActivities({
                    integrationId,
                    projectId: gauzyId,
                    activities,
                    token,
                    organizationId
                });
            }));
            return appActivitiesMapped;
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t handle APP ${contracts_1.IntegrationEntity.ACTIVITY}`);
        }
    }
    async _handleActivities(projectsMap, integrationId, token, organizationId, dateRange) {
        try {
            const start = (0, moment_1.default)(dateRange.start).format('YYYY-MM-DD');
            const end = (0, moment_1.default)(dateRange.end).format('YYYY-MM-DD');
            const integratedTimeLogs = [];
            for await (const project of projectsMap) {
                const { activities } = await this.fetchIntegration(`projects/${project.sourceId}/activities?time_slot[start]=${start}&time_slot[stop]=${end}`, token);
                if ((0, index_2.isEmpty)(activities)) {
                    continue;
                }
                const timeLogs = this.formatLogsFromSlots(activities);
                const integratedTimeLogs = await this.syncTimeLogs(timeLogs, token, integrationId, organizationId, project.gauzyId);
                integratedTimeLogs.push(...integratedTimeLogs);
            }
            return integratedTimeLogs;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw new common_1.HttpException(error.getResponse(), error.getStatus());
            }
            throw new common_1.BadRequestException(error, `Can\'t handle ${contracts_1.IntegrationEntity.ACTIVITY}`);
        }
    }
    /**
     * Sync activities screenshots
     */
    async _handleScreenshots(projectsMap, integrationId, token, organizationId, dateRange) {
        try {
            const start = (0, moment_1.default)(dateRange.start).format('YYYY-MM-DD');
            const end = (0, moment_1.default)(dateRange.end).format('YYYY-MM-DD');
            const pageLimit = 500;
            return await Promise.all(projectsMap.map(async (project) => {
                const { sourceId } = project;
                const syncedActivities = {
                    screenshots: []
                };
                let stillRecordsAvailable = true;
                let nextPageStartId = null;
                while (stillRecordsAvailable) {
                    let url = `projects/${sourceId}/screenshots?page_limit=${pageLimit}&time_slot[start]=${start}&time_slot[stop]=${end}`;
                    if (nextPageStartId) {
                        url += `&page_start_id=${nextPageStartId}`;
                    }
                    const { screenshots: fetchScreenshots, pagination = {} } = await this.fetchIntegration(url, token);
                    if (pagination &&
                        pagination.hasOwnProperty('next_page_start_id')) {
                        const { next_page_start_id } = pagination;
                        nextPageStartId = next_page_start_id;
                        stillRecordsAvailable = true;
                    }
                    else {
                        nextPageStartId = null;
                        stillRecordsAvailable = false;
                    }
                    syncedActivities.screenshots.push(fetchScreenshots);
                }
                const screenshots = [].concat.apply([], syncedActivities.screenshots);
                return await this.syncScreenshots({
                    integrationId,
                    screenshots,
                    token,
                    organizationId
                });
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t handle activities ${contracts_1.IntegrationEntity.SCREENSHOT}`);
        }
    }
    async autoSync({ integrationId, gauzyId, sourceId, token, dateRange }) {
        console.log(`${contracts_1.IntegrationEnum.HUBSTAFF} integration start for ${integrationId}`);
        /**
         * GET organization tenant integration entities settings
         */
        const { entitySettings } = await this._integrationTenantService.findOneByIdString(integrationId, {
            relations: {
                entitySettings: {
                    tiedEntities: true
                }
            }
        });
        //entities have depended entity. eg to fetch Task we need Project id or Org id, because our Task entity is related to Project, the relation here is same, we need project id to fetch Tasks
        const integratedMaps = await Promise.all(entitySettings.map(async (setting) => {
            switch (setting.entity) {
                case contracts_1.IntegrationEntity.PROJECT:
                    let tasks, activities, screenshots;
                    const projectsMap = await this._handleProjects(sourceId, integrationId, gauzyId, token);
                    /**
                     * Tasks Sync
                     */
                    const taskSetting = setting.tiedEntities.find((res) => res.entity === contracts_1.IntegrationEntity.TASK);
                    if ((0, index_2.isObject)(taskSetting) && taskSetting.sync) {
                        tasks = await this._handleTasks(projectsMap, integrationId, token, gauzyId);
                    }
                    /**
                     * Activity Sync
                     */
                    const activitySetting = setting.tiedEntities.find((res) => res.entity === contracts_1.IntegrationEntity.ACTIVITY);
                    if ((0, index_2.isObject)(activitySetting) && activitySetting.sync) {
                        activities = await this._handleActivities(projectsMap, integrationId, token, gauzyId, dateRange);
                        activities.application = await this._handleAppActivities(projectsMap, integrationId, token, gauzyId, dateRange);
                        activities.urls = await this._handleUrlActivities(projectsMap, integrationId, token, gauzyId, dateRange);
                    }
                    /**
                     * Activity Screenshot Sync
                     */
                    const screenshotSetting = setting.tiedEntities.find((res) => res.entity === contracts_1.IntegrationEntity.SCREENSHOT);
                    if ((0, index_2.isObject)(screenshotSetting) && screenshotSetting.sync) {
                        screenshots = await this._handleScreenshots(projectsMap, integrationId, token, gauzyId, dateRange);
                    }
                    return { tasks, projectsMap, activities, screenshots };
                case contracts_1.IntegrationEntity.CLIENT:
                    const clients = await this._handleClients(sourceId, integrationId, gauzyId, token);
                    return { clients };
            }
        }));
        console.log(`${contracts_1.IntegrationEnum.HUBSTAFF} integration end for ${integrationId}`);
        return integratedMaps;
    }
    formatLogsFromSlots(slots) {
        if ((0, index_2.isEmpty)(slots)) {
            return;
        }
        const range = [];
        let i = 0;
        while (slots[i]) {
            const start = (0, moment_1.default)(slots[i].starts_at);
            const end = (0, moment_1.default)(slots[i].starts_at).add(slots[i].tracked, 'seconds');
            range.push({
                start: start.toDate(),
                end: end.toDate()
            });
            i++;
        }
        const timeLogs = [];
        const dates = (0, utils_1.mergeOverlappingDateRanges)(range);
        if ((0, index_2.isNotEmpty)(dates)) {
            dates.forEach(({ start, end }) => {
                let i = 0;
                const timeSlots = new Array();
                while (slots[i]) {
                    const slotTime = (0, moment_1.default)(slots[i].starts_at);
                    if (slotTime.isBetween((0, moment_1.default)(start), (0, moment_1.default)(end), null, '[]')) {
                        timeSlots.push(slots[i]);
                    }
                    i++;
                }
                const [activity] = this.getLogsActivityFromSlots(timeSlots);
                timeLogs.push({
                    startedAt: start,
                    stoppedAt: end,
                    timeSlots,
                    ...activity
                });
            });
        }
        return timeLogs;
    }
    /**
     * GET TimeLogs from Activity TimeSlots
     *
     * @param timeSlots
     * @returns
     */
    getLogsActivityFromSlots(timeSlots) {
        const timeLogs = timeSlots.reduce((prev, current) => {
            const prevLog = prev[current.date];
            return {
                ...prev,
                [current.date]: prevLog
                    ? {
                        id: current.id,
                        date: current.date,
                        user_id: prevLog.user_id,
                        project_id: prevLog.project_id || null,
                        task_id: prevLog.task_id || null,
                        // this will take the last chunk(slot), maybe we should allow percentage for this, as one time log can have both manual and tracked
                        logType: current.client === 'windows'
                            ? contracts_1.TimeLogType.TRACKED
                            : contracts_1.TimeLogType.MANUAL
                    }
                    : {
                        id: current.id,
                        date: current.date,
                        user_id: current.user_id,
                        project_id: current.project_id || null,
                        task_id: current.task_id || null,
                        logType: current.client === 'windows'
                            ? contracts_1.TimeLogType.TRACKED
                            : contracts_1.TimeLogType.MANUAL
                    }
            };
        }, {});
        return Object.values(timeLogs);
    }
};
exports.HubstaffService = HubstaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, typeof (_a = typeof integration_tenant_service_1.IntegrationTenantService !== "undefined" && integration_tenant_service_1.IntegrationTenantService) === "function" ? _a : Object, typeof (_b = typeof integration_setting_service_1.IntegrationSettingService !== "undefined" && integration_setting_service_1.IntegrationSettingService) === "function" ? _b : Object, typeof (_c = typeof integration_map_service_1.IntegrationMapService !== "undefined" && integration_map_service_1.IntegrationMapService) === "function" ? _c : Object, typeof (_d = typeof role_service_1.RoleService !== "undefined" && role_service_1.RoleService) === "function" ? _d : Object, typeof (_e = typeof organization_service_1.OrganizationService !== "undefined" && organization_service_1.OrganizationService) === "function" ? _e : Object, typeof (_f = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _f : Object, cqrs_1.CommandBus, typeof (_g = typeof integration_service_1.IntegrationService !== "undefined" && integration_service_1.IntegrationService) === "function" ? _g : Object])
], HubstaffService);
//# sourceMappingURL=hubstaff.service.js.map