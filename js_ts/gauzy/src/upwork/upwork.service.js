"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpworkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const UpworkApi = __importStar(require("upwork-api"));
const underscore_1 = require("underscore");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const index_3 = require("../../plugins/contracts/dist/index");
const commands_1 = require("../integration-tenant/commands");
const commands_2 = require("../integration-setting/commands");
const utils_1 = require("../core/utils");
const engagements_js_1 = require("upwork-api/lib/routers/hr/engagements.js");
const workdiary_js_1 = require("upwork-api/lib/routers/workdiary.js");
const snapshot_js_1 = require("upwork-api/lib/routers/snapshot.js");
const auth_js_1 = require("upwork-api/lib/routers/auth.js");
const users_js_1 = require("upwork-api/lib/routers/organization/users.js");
const commands_3 = require("../integration-map/commands");
const moment_1 = __importDefault(require("moment"));
const commands_4 = require("../organization-project/commands");
const employee_get_command_1 = require("../employee/commands/employee.get.command");
const commands_5 = require("../employee/commands");
const integration_map_service_1 = require("../integration-map/integration-map.service");
const user_service_1 = require("../user/user.service");
const organization_service_1 = require("../organization/organization.service");
const role_service_1 = require("../role/role.service");
const time_slot_service_1 = require("../time-tracking/time-slot/time-slot.service");
const expense_service_1 = require("../expense/expense.service");
const income_service_1 = require("../income/income.service");
const commands_6 = require("../income/commands");
const commands_7 = require("../expense/commands");
const commands_8 = require("../organization-contact/commands");
const index_4 = require("../../plugins/plugins/integration-upwork/dist/index");
const commands_9 = require("../time-tracking/time-log/commands");
// import { ProposalCreateCommand } from '../proposal/commands/proposal-create.command';
const commands_10 = require("./../time-tracking/time-slot/commands");
const context_1 = require("../core/context");
const commands_11 = require("./../time-tracking/screenshot/commands");
const commands_12 = require("./../organization-vendor/commands");
const commands_13 = require("./../expense-categories/commands");
let UpworkService = exports.UpworkService = class UpworkService {
    _expenseService;
    _incomeService;
    _integrationMapService;
    _userService;
    _roleService;
    _organizationService;
    _timeSlotService;
    _upworkReportService;
    commandBus;
    _upworkApi;
    constructor(_expenseService, _incomeService, _integrationMapService, _userService, _roleService, _organizationService, _timeSlotService, _upworkReportService, 
    // private readonly _upworkJobService: UpworkJobService,
    // private readonly _upworkOfferService: UpworkOffersService,
    commandBus) {
        this._expenseService = _expenseService;
        this._incomeService = _incomeService;
        this._integrationMapService = _integrationMapService;
        this._userService = _userService;
        this._roleService = _roleService;
        this._organizationService = _organizationService;
        this._timeSlotService = _timeSlotService;
        this._upworkReportService = _upworkReportService;
        this.commandBus = commandBus;
    }
    async _consumerHasAccessToken(config, organizationId) {
        const integrationSetting = await this.commandBus.execute(new commands_2.IntegrationSettingGetCommand({
            where: {
                settingsValue: config.consumerKey,
                organizationId: organizationId
            },
            relations: ['integration']
        }));
        if (!integrationSetting) {
            return false;
        }
        const integrationSettings = await this.commandBus.execute(new commands_2.IntegrationSettingGetManyCommand({
            where: {
                integration: integrationSetting.integration,
                organizationId
            }
        }));
        if (!integrationSettings.length) {
            return false;
        }
        const integrationSettingMap = (0, utils_1.arrayToObject)(integrationSettings, 'settingsName', 'settingsValue');
        if (integrationSettingMap.accessToken &&
            integrationSettingMap.accessTokenSecret) {
            return {
                integrationId: integrationSetting.integration.id,
                ...integrationSettingMap
            };
        }
        return false;
    }
    async getAccessTokenSecretPair(config, organizationId) {
        const consumerAccessToken = await this._consumerHasAccessToken(config, organizationId);
        // access token live forever, if user already registered app, return the access token;
        if (consumerAccessToken) {
            console.log('consumerAccessToken already exits and will be reused');
            return consumerAccessToken;
        }
        const tenantId = context_1.RequestContext.currentTenantId();
        this._upworkApi = new UpworkApi(config);
        const authUrl = index_1.environment.upwork.callbackUrl;
        console.log(`Upwork callback URL: ${authUrl}`);
        return new Promise((resolve, reject) => {
            this._upworkApi.getAuthorizationUrl(authUrl, async (error, url, requestToken, requestTokenSecret) => {
                if (error) {
                    reject(`can't get authorization url, error: ${error}`);
                    return;
                }
                await this.commandBus.execute(new commands_1.IntegrationTenantUpdateOrCreateCommand({
                    name: index_3.IntegrationEnum.UPWORK,
                    integration: {
                        provider: index_3.IntegrationEnum.UPWORK
                    },
                    tenantId,
                    organizationId,
                }, {
                    tenantId,
                    organizationId,
                    name: index_3.IntegrationEnum.UPWORK,
                    entitySettings: [],
                    settings: [
                        {
                            settingsName: 'consumerKey',
                            settingsValue: config.consumerKey
                        },
                        {
                            settingsName: 'consumerSecret',
                            settingsValue: config.consumerSecret
                        },
                        {
                            settingsName: 'requestToken',
                            settingsValue: requestToken
                        },
                        {
                            settingsName: 'requestTokenSecret',
                            settingsValue: requestTokenSecret
                        }
                    ].map((setting) => ({
                        ...setting,
                        tenantId,
                        organizationId,
                    }))
                }));
                return resolve({
                    url,
                    requestToken,
                    requestTokenSecret,
                    organizationId
                });
            });
        });
    }
    getAccessToken({ requestToken, verifier }, organizationId) {
        return new Promise(async (resolve, reject) => {
            const { integration } = await this.commandBus.execute(new commands_2.IntegrationSettingGetCommand({
                where: {
                    settingsValue: requestToken,
                    organizationId
                },
                relations: ['integration']
            }));
            const integrationSettings = await this.commandBus.execute(new commands_2.IntegrationSettingGetManyCommand({
                where: {
                    integration,
                    organizationId
                }
            }));
            const integrationSetting = (0, utils_1.arrayToObject)(integrationSettings, 'settingsName', 'settingsValue');
            this._upworkApi.getAccessToken(requestToken, integrationSetting.requestTokenSecret, verifier, async (error, accessToken, accessTokenSecret) => {
                if (error) {
                    reject(new Error(error));
                    return;
                }
                await this.commandBus.execute(new commands_2.IntegrationSettingCreateCommand({
                    integration,
                    settingsName: 'accessToken',
                    settingsValue: accessToken,
                    organizationId
                }));
                await this.commandBus.execute(new commands_2.IntegrationSettingCreateCommand({
                    integration,
                    settingsName: 'accessTokenSecret',
                    settingsValue: accessTokenSecret,
                    organizationId
                }));
                resolve({
                    integrationId: integration.id,
                    accessToken,
                    accessTokenSecret
                });
            });
        });
    }
    async getConfig(integrationId, filter) {
        const { organizationId, tenantId } = filter;
        const integration = await this.commandBus.execute(new commands_1.IntegrationTenantGetCommand({
            where: {
                id: integrationId,
                tenant: {
                    id: tenantId
                },
                organizationId
            }
        }));
        const integrationSettings = await this.commandBus.execute(new commands_2.IntegrationSettingGetManyCommand({
            where: {
                integration,
                organizationId
            }
        }));
        const { accessToken, consumerKey, consumerSecret, accessTokenSecret: accessSecret } = (0, utils_1.arrayToObject)(integrationSettings, 'settingsName', 'settingsValue');
        return { accessToken, consumerKey, consumerSecret, accessSecret };
    }
    // engagement has access to contract ID, this is a project in gauzy
    async getContractsForFreelancer(getEngagementsDto) {
        // console.log(`Call Upwork API using accessToken: ${getEngagementsDto.config.accessToken}, accessSecret: ${getEngagementsDto.config.accessSecret}`);
        const api = new UpworkApi(getEngagementsDto.config);
        const engagements = new engagements_js_1.Engagements(api);
        const params = {};
        return new Promise((resolve, reject) => {
            api.setAccessToken(getEngagementsDto.config.accessToken, getEngagementsDto.config.accessSecret, () => {
                engagements.getList(params, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const { engagements: { engagement } } = data;
                        resolve(engagement);
                    }
                });
            });
        });
    }
    /*
     * Get specific contract using contractId
     */
    async _getContractByContractId(config, contractId) {
        const api = new UpworkApi(config);
        const engagements = new engagements_js_1.Engagements(api);
        return new Promise((resolve, reject) => {
            api.setAccessToken(config.accessToken, config.accessSecret, () => {
                engagements.getSpecific(contractId, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const { engagement } = data;
                        resolve(engagement);
                    }
                });
            });
        });
    }
    async syncContracts({ integrationId, organizationId, contracts }) {
        return await Promise.all(await contracts.map(async ({ job__title: name, reference: sourceId, engagement_start_date, engagement_end_date, active_milestone }) => {
            const payload = {
                name,
                organizationId,
                public: true,
                currency: index_1.environment.defaultCurrency
            };
            if ((0, index_2.isObject)(active_milestone)) {
                payload['billing'] = index_3.ProjectBillingEnum.MILESTONES;
            }
            else {
                payload['billing'] = index_3.ProjectBillingEnum.RATE;
            }
            // contract start date
            if (typeof engagement_start_date === 'string' &&
                engagement_start_date.length > 0) {
                payload['startDate'] = new Date((0, utils_1.unixTimestampToDate)(engagement_start_date));
            }
            // contract end date
            if (typeof engagement_end_date === 'string' &&
                engagement_end_date.length > 0) {
                payload['endDate'] = new Date((0, utils_1.unixTimestampToDate)(engagement_end_date));
            }
            const tenantId = context_1.RequestContext.currentTenantId();
            const { record: integrationMap } = await this._integrationMapService.findOneOrFailByOptions({
                where: {
                    sourceId,
                    entity: index_3.IntegrationEntity.PROJECT,
                    organizationId,
                    tenantId
                }
            });
            //if project already integrated then only update model/entity
            if (integrationMap) {
                await this.commandBus.execute(new commands_4.OrganizationProjectUpdateCommand(Object.assign(payload, {
                    id: integrationMap.gauzyId
                })));
                return integrationMap;
            }
            const project = await this.commandBus.execute(new commands_4.OrganizationProjectCreateCommand(Object.assign({}, payload)));
            return await this.commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
                gauzyId: project.id,
                integrationId,
                sourceId,
                entity: index_3.IntegrationEntity.PROJECT,
                organizationId
            }));
        }));
    }
    // work diary holds information for time slots and time logs
    async getWorkDiary(getWorkDiaryDto) {
        const api = new UpworkApi(getWorkDiaryDto.config);
        const workdiary = new workdiary_js_1.Workdiary(api);
        const params = {
            offset: 0
        };
        return new Promise((resolve, reject) => {
            api.setAccessToken(getWorkDiaryDto.config.accessToken, getWorkDiaryDto.config.accessSecret, () => {
                workdiary.getByContract(getWorkDiaryDto.contractId, (0, moment_1.default)(getWorkDiaryDto.forDate).format('YYYYMMDD'), params, (err, data) => (err ? reject(err) : resolve(data)));
            });
        });
    }
    async syncTimeLog(timeLog) {
        const organizationId = timeLog.organizationId;
        const tenantId = context_1.RequestContext.currentTenantId();
        const gauzyTimeLog = await this.commandBus.execute(new commands_9.TimeLogCreateCommand({
            projectId: timeLog.projectId,
            employeeId: timeLog.employeeId,
            logType: timeLog.logType,
            startedAt: timeLog.startedAt,
            stoppedAt: timeLog.stoppedAt,
            source: index_3.TimeLogSourceEnum.UPWORK,
            organizationId,
            tenantId
        }));
        await this.commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
            gauzyId: gauzyTimeLog.id,
            integrationId: timeLog.integrationId,
            sourceId: timeLog.sourceId,
            entity: index_3.IntegrationEntity.TIME_LOG,
            organizationId
        }));
        return gauzyTimeLog;
    }
    async syncTimeSlots({ timeSlots, employeeId, integrationId, sourceId, organizationId }) {
        let integratedTimeSlots = [];
        const tenantId = context_1.RequestContext.currentTenantId();
        for await (const timeSlot of timeSlots) {
            const multiply = 10;
            const duration = 600;
            const { keyboard_events_count, mouse_events_count, cell_time, activity } = timeSlot;
            const gauzyTimeSlot = await this.commandBus.execute(new commands_10.TimeSlotCreateCommand({
                employeeId,
                startedAt: new Date(moment_1.default.unix(cell_time).format('YYYY-MM-DD HH:mm:ss')),
                keyboard: keyboard_events_count,
                mouse: mouse_events_count,
                time_slot: new Date(moment_1.default.unix(cell_time).format('YYYY-MM-DD HH:mm:ss')),
                overall: activity * multiply,
                duration: duration,
                organizationId,
                tenantId
            }));
            const integratedSlot = await this.commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
                gauzyId: gauzyTimeSlot.id,
                integrationId,
                sourceId,
                entity: index_3.IntegrationEntity.TIME_SLOT,
                organizationId
            }));
            integratedTimeSlots = integratedTimeSlots.concat(integratedSlot);
        }
        return integratedTimeSlots;
    }
    async syncWorkDiaries(organizationId, integrationId, syncedContracts, config, employeeId, forDate) {
        const workDiaries = await Promise.all(syncedContracts.map(async (contract) => {
            const wd = await this.getWorkDiary({
                contractId: contract.sourceId,
                config,
                forDate
            })
                .then((response) => response)
                .catch((error) => error);
            if (wd.hasOwnProperty('statusCode') && wd.statusCode === 404) {
                return wd;
            }
            const cells = wd.data.cells;
            const sourceId = wd.data.contract.record_id;
            if ((0, index_2.isEmpty)(cells)) {
                return [];
            }
            const integratedTimeLogs = [];
            const integratedTimeSlots = [];
            const integratedScreenshots = [];
            const timeSlotsActivities = [];
            const timeLogs = this.formatLogsFromSlots(cells);
            for await (const timeLog of timeLogs) {
                const { timeSlots = [] } = timeLog;
                const timeLogDto = {
                    ...timeLog,
                    employeeId,
                    integrationId,
                    organizationId,
                    projectId: contract.gauzyId,
                    duration: (timeSlots.length) * 10 * 60,
                    sourceId
                };
                const timeSlotsDto = {
                    timeSlots,
                    employeeId,
                    integrationId,
                    sourceId,
                    organizationId
                };
                integratedTimeLogs.push(await this.syncTimeLog(timeLogDto));
                integratedTimeSlots.push(await this.syncTimeSlots(timeSlotsDto));
                integratedScreenshots.push(await this.syncSnapshots(timeSlotsDto));
                timeSlotsActivities.push(await this.getTimeSlotActivitiesByContractId({
                    contractId: sourceId,
                    employeeId,
                    organizationId,
                    config,
                    timeSlots
                }));
            }
            return {
                integratedTimeLogs,
                integratedTimeSlots,
                integratedScreenshots,
                timeSlotsActivities
            };
        }));
        return workDiaries;
    }
    formatLogsFromSlots(slots) {
        if ((0, index_2.isEmpty)(slots)) {
            return;
        }
        const range = [];
        let i = 0;
        while (slots[i]) {
            const start = moment_1.default.unix(slots[i].cell_time).toDate();
            const end = moment_1.default.unix(slots[i].cell_time).add(10, 'minute').toDate();
            range.push({ start, end });
            i++;
        }
        const timeLogs = [];
        const dates = (0, utils_1.mergeOverlappingDateRanges)(range);
        if ((0, index_2.isNotEmpty)(dates)) {
            dates.forEach(({ start, end }) => {
                let i = 0;
                const timeSlots = new Array();
                while (slots[i]) {
                    const slotTime = moment_1.default.unix(slots[i].cell_time);
                    if (slotTime.isBetween((0, moment_1.default)(start), (0, moment_1.default)(end), null, '[]')) {
                        timeSlots.push(slots[i]);
                    }
                    i++;
                }
                const activity = timeSlots.reduce((prev, current) => {
                    return {
                        ...prev,
                        keyboard: (prev.keyboard += +current.keyboard_events_count),
                        mouse: (prev.mouse += +current.mouse_events_count),
                        logType: slots.manual
                            ? index_3.TimeLogType.MANUAL
                            : index_3.TimeLogType.TRACKED
                    };
                }, {
                    keyboard: 0,
                    mouse: 0
                });
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
    async syncContractsRelatedData({ integrationId, organizationId, contracts, employeeId, config, entitiesToSync, providerReferenceId, providerId }) {
        const syncedContracts = await this.syncContracts({
            contracts,
            integrationId,
            organizationId
        });
        if (!employeeId) {
            const employee = await this._getUpworkGauzyEmployee(providerReferenceId, integrationId, organizationId, config);
            employeeId = employee.gauzyId;
        }
        return await Promise.all(entitiesToSync.map(async (entity) => {
            switch (entity.key) {
                case 'workDiary':
                    return await this.syncWorkDiaries(organizationId, integrationId, syncedContracts, config, employeeId, entity.datePicker.selectedDate);
                case 'report':
                    return await this.syncReports(organizationId, integrationId, config, employeeId, providerReferenceId, providerId, entity.datePicker.selectedDate);
                // case 'proposal':
                // 	return await this.syncProposalsOffers(
                // 		organizationId,
                // 		integrationId,
                // 		config,
                // 		employeeId
                // 	);
                default:
                    return;
            }
        }));
    }
    /*
     * Get timeslot minute activities
     */
    async syncTimeSlotsActivity({ employeeId, organizationId, timeSlot, timeSlotActivity }) {
        try {
            const { minutes } = timeSlotActivity;
            const { cell_time } = timeSlot;
            const tenantId = context_1.RequestContext.currentTenantId();
            const integratedTimeSlotsMinutes = await Promise.all(minutes.map(async (minute) => {
                const { record: findTimeSlot } = await this._timeSlotService.findOneOrFailByOptions({
                    where: {
                        tenantId,
                        employeeId,
                        startedAt: (0, moment_1.default)(moment_1.default.unix(cell_time).format('YYYY-MM-DD HH:mm:ss')).toDate()
                    }
                });
                if (!findTimeSlot) {
                    return;
                }
                const { time, mouse, keyboard } = minute;
                const gauzyTimeSlotMinute = await this.commandBus.execute(new commands_10.CreateTimeSlotMinutesCommand({
                    mouse,
                    keyboard,
                    datetime: new Date(moment_1.default.unix(time).format('YYYY-MM-DD HH:mm:ss')),
                    timeSlot: findTimeSlot,
                    organizationId,
                    tenantId
                }));
                return gauzyTimeSlotMinute;
            }));
            return integratedTimeSlotsMinutes;
        }
        catch (error) {
            throw new common_1.BadRequestException('Cannot sync timeslot every minute activity');
        }
    }
    /*
     * Get snapshots/timeslot minutes activities
     */
    async getTimeSlotActivitiesByContractId({ contractId, employeeId, organizationId, config, timeSlots }) {
        const timeSlotActivities = await Promise.all(timeSlots.map(async (timeslot) => {
            const { snapshot: timeSlotActivity } = await this.getSnapshotByContractId(config, contractId, timeslot);
            const integratedTimeSlotActivities = await this.syncTimeSlotsActivity({
                employeeId,
                organizationId,
                timeSlot: timeslot,
                timeSlotActivity
            });
            return {
                integratedTimeSlotActivities
            };
        }));
        return timeSlotActivities;
    }
    /**
     * Get snapshots for given contractId and Unix time
     */
    async getSnapshotByContractId(config, contractId, timeSlot) {
        const api = new UpworkApi(config);
        const snapshots = new snapshot_js_1.Snapshot(api);
        const { snapshot_time: snapshotTime } = timeSlot;
        return new Promise((resolve, reject) => {
            api.setAccessToken(config.accessToken, config.accessSecret, () => {
                snapshots.getByContract(contractId, snapshotTime, (err, data) => err ? reject(err) : resolve(data));
            });
        });
    }
    /*
     * Sync Snapshots By Contract
     */
    async syncSnapshots(timeSlotsData) {
        const { timeSlots = [], employeeId, integrationId, sourceId, organizationId } = timeSlotsData;
        const integrationMaps = await timeSlots.map(async ({ cell_time, screenshot_img, screenshot_img_thmb, snapshot_time }) => {
            const recordedAt = moment_1.default
                .unix(snapshot_time)
                .format('YYYY-MM-DD HH:mm:ss');
            const activityTimestamp = moment_1.default
                .unix(cell_time)
                .format('YYYY-MM-DD HH:mm:ss');
            const gauzyScreenshot = await this.commandBus.execute(new commands_11.ScreenshotCreateCommand({
                file: screenshot_img,
                thumb: screenshot_img_thmb,
                recordedAt,
                activityTimestamp,
                employeeId,
                organizationId
            }));
            return await this.commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
                gauzyId: gauzyScreenshot.id,
                integrationId,
                sourceId,
                entity: index_3.IntegrationEntity.SCREENSHOT,
                organizationId
            }));
        });
        return await Promise.all(integrationMaps);
    }
    async _getUpworkAuthenticatedUser(config) {
        const api = new UpworkApi(config);
        const users = new users_js_1.Users(api);
        return new Promise((resolve, reject) => {
            api.setAccessToken(config.accessToken, config.accessSecret, () => {
                users.getMyInfo((err, data) => err ? reject(err) : resolve(data));
            });
        });
    }
    async _getUpworkUserInfo(config) {
        const api = new UpworkApi(config);
        const auth = new auth_js_1.Auth(api);
        return new Promise((resolve, reject) => {
            api.setAccessToken(config.accessToken, config.accessSecret, () => {
                auth.getUserInfo((err, data) => err ? reject(err) : resolve(data));
            });
        });
    }
    async _handleEmployee({ integrationId, organizationId, config }) {
        const promises = [];
        promises.push(this._getUpworkAuthenticatedUser(config));
        promises.push(this._getUpworkUserInfo(config));
        return Promise.all(promises).then(async (results) => {
            const { user } = results[0];
            const { info } = results[1];
            user['info'] = info;
            return await this.syncEmployee({
                integrationId,
                user,
                organizationId
            });
        });
    }
    async _getUpworkGauzyEmployee(providerReferenceId, integrationId, organizationId, config) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { record } = await this._integrationMapService.findOneOrFailByOptions({
            where: {
                sourceId: providerReferenceId,
                entity: index_3.IntegrationEntity.EMPLOYEE,
                organizationId,
                tenantId
            }
        });
        return record
            ? record
            : await this._handleEmployee({
                integrationId,
                organizationId,
                config
            });
    }
    async syncEmployee({ integrationId, user, organizationId }) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { reference: userId, email, info } = user;
        const { record } = await this._userService.findOneOrFailByOptions({
            where: {
                email,
                tenantId
            }
        });
        //upwork profile picture
        const { portrait_100_img: imageUrl } = info;
        let employee;
        if (record) {
            employee = await this.commandBus.execute(new employee_get_command_1.EmployeeGetCommand({ where: { userId: record.id } }));
        }
        else {
            const [role, organization] = await Promise.all([
                await this._roleService.findOneByOptions({
                    where: {
                        name: index_3.RolesEnum.EMPLOYEE,
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
            const { first_name: firstName, last_name: lastName, status } = user;
            const isActive = status === 'active' || false;
            employee = await this.commandBus.execute(new commands_5.EmployeeCreateCommand({
                user: {
                    email,
                    firstName,
                    lastName,
                    role,
                    tags: null,
                    tenant: null,
                    imageUrl,
                    tenantId,
                    preferredComponentLayout: index_3.ComponentLayoutStyleEnum.TABLE
                },
                password: index_1.environment.defaultIntegratedUserPass,
                organization,
                tenantId,
                startedWorkOn: new Date((0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss')),
                isActive
            }));
        }
        return await this.commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
            gauzyId: employee.id,
            integrationId,
            sourceId: userId,
            entity: index_3.IntegrationEntity.EMPLOYEE,
            organizationId
        }));
    }
    /**
     * Sync contract client
     */
    async syncClient(integrationId, organizationId, client) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { company_id: sourceId, company_name: name } = client;
        const { record } = await this._integrationMapService.findOneOrFailByOptions({
            where: {
                sourceId,
                entity: index_3.IntegrationEntity.CLIENT,
                organizationId,
                tenantId
            }
        });
        if (record) {
            return record;
        }
        const gauzyClient = await this.commandBus.execute(new commands_8.OrganizationContactCreateCommand({
            name,
            organizationId,
            contactType: index_3.ContactType.CLIENT,
            tenantId
        }));
        return await this.commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
            gauzyId: gauzyClient.id,
            integrationId,
            sourceId,
            entity: index_3.IntegrationEntity.CLIENT,
            organizationId
        }));
    }
    /*
     * Sync upwork transactions/earnings reports
     */
    async syncReports(organizationId, integrationId, config, employeeId, providerReferenceId, providerId, dateRange) {
        try {
            const syncedIncome = await this._syncIncome(organizationId, integrationId, config, employeeId, providerId, dateRange);
            const syncedExpense = await this._syncExpense(organizationId, integrationId, config, employeeId, providerReferenceId, dateRange);
            return {
                syncedIncome,
                syncedExpense
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync reports for ${index_3.IntegrationEntity.INCOME} and ${index_3.IntegrationEntity.EXPENSE}`);
        }
    }
    /*
     * Sync upwork freelancer expense
     */
    async _syncExpense(organizationId, integrationId, config, employeeId, providerReferenceId, dateRange) {
        const reports = await this._upworkReportService.getEarningReportByFreelancer(config, providerReferenceId, dateRange);
        const { table: { cols = [] } } = reports;
        let { table: { rows = [] } } = reports;
        const columns = (0, underscore_1.pluck)(cols, 'label');
        //mapped inner row and associate to object key
        rows = (0, underscore_1.map)(rows, function (row) {
            const innerRow = (0, underscore_1.pluck)(row['c'], 'v');
            const ele = {};
            for (let index = 0; index < columns.length; index++) {
                ele[columns[index]] = innerRow[index];
            }
            return ele;
        });
        return await Promise.all(rows
            .filter(({ subtype }) => subtype === index_3.ExpenseCategoriesEnum.SERVICE_FEE)
            .map(async (row) => {
            const { amount, date, description, subtype, reference } = row;
            const category = await this.commandBus.execute(new commands_13.ExpenseCategoryFirstOrCreateCommand({
                name: index_3.ExpenseCategoriesEnum.SERVICE_FEE,
                organizationId
            }));
            const vendor = await this.commandBus.execute(new commands_12.OrganizationVendorFirstOrCreateCommand({
                name: index_3.OrganizationVendorEnum.UPWORK,
                organizationId
            }));
            const { record: integrationMap } = await this._integrationMapService.findOneOrFailByOptions({
                where: {
                    integrationId,
                    sourceId: reference,
                    entity: index_3.IntegrationEntity.EXPENSE,
                    organizationId
                }
            });
            if (integrationMap) {
                return integrationMap;
            }
            const gauzyExpense = await this.commandBus.execute(new commands_7.ExpenseCreateCommand({
                employeeId,
                organizationId,
                amount,
                category,
                valueDate: new Date((0, moment_1.default)(date).format('YYYY-MM-DD HH:mm:ss')),
                vendor,
                reference,
                notes: description,
                typeOfExpense: subtype,
                currency: index_1.environment.defaultCurrency
            }));
            return await this.commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
                gauzyId: gauzyExpense.id,
                integrationId,
                sourceId: reference,
                entity: index_3.IntegrationEntity.EXPENSE,
                organizationId
            }));
        }));
    }
    /*
     * Sync upwork freelancer income
     */
    async _syncIncome(organizationId, integrationId, config, employeeId, providerId, dateRange) {
        try {
            const reports = await this._upworkReportService.getFullReportByFreelancer(config, providerId, dateRange);
            const { table: { cols = [] } } = reports;
            let { table: { rows = [] } } = reports;
            const columns = (0, underscore_1.pluck)(cols, 'label');
            //mapped inner row and associate to object key
            rows = (0, underscore_1.map)(rows, function (row) {
                const innerRow = (0, underscore_1.pluck)(row['c'], 'v');
                const ele = {};
                for (let index = 0; index < columns.length; index++) {
                    ele[columns[index]] = innerRow[index];
                }
                return ele;
            });
            let integratedIncomes = [];
            for await (const row of rows) {
                const { memo: notes, worked_on, assignment_rate, hours, assignment_ref: contractId } = row;
                //sync upwork contract client
                const client = await this.syncClient(integrationId, organizationId, row);
                const { record: income } = await this._incomeService.findOneOrFailByOptions({
                    where: {
                        employeeId,
                        clientId: client.gauzyId,
                        reference: contractId,
                        valueDate: new Date((0, moment_1.default)(worked_on).format('YYYY-MM-DD HH:mm:ss')),
                        organizationId
                    }
                });
                if (income) {
                    const { record } = await this._integrationMapService.findOneOrFailByOptions({
                        where: {
                            gauzyId: income.id,
                            integrationId,
                            entity: index_3.IntegrationEntity.INCOME,
                            organizationId
                        }
                    });
                    integratedIncomes.push(record);
                }
                else {
                    const amount = parseFloat((parseFloat(hours) * parseFloat(assignment_rate)).toFixed(2));
                    const tenantId = context_1.RequestContext.currentTenantId();
                    const gauzyIncome = await this.commandBus.execute(new commands_6.IncomeCreateCommand({
                        employeeId,
                        organizationId,
                        tenantId,
                        amount,
                        valueDate: new Date((0, moment_1.default)(worked_on).format('YYYY-MM-DD HH:mm:ss')),
                        notes,
                        tags: [],
                        clientId: client.gauzyId,
                        reference: contractId,
                        currency: index_1.environment.defaultCurrency
                    }));
                    integratedIncomes.push(await this.commandBus.execute(new commands_3.IntegrationMapSyncEntityCommand({
                        gauzyId: gauzyIncome.id,
                        integrationId,
                        sourceId: contractId,
                        entity: index_3.IntegrationEntity.INCOME,
                        organizationId
                    })));
                }
            }
            return integratedIncomes;
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Can\'t sync ${index_3.IntegrationEntity.INCOME}`);
        }
    }
    /**
     * Get all reports for upwork integration
     */
    async getReportListByIntegration(integrationId, filter, relations) {
        const { organizationId, tenantId } = filter;
        const { items, total } = await this._integrationMapService.findAll({
            where: {
                integration: {
                    id: integrationId
                },
                entity: (0, typeorm_1.In)([
                    index_3.IntegrationEntity.INCOME,
                    index_3.IntegrationEntity.EXPENSE
                ]),
                organizationId,
                tenantId
            }
        });
        const reports = {
            items: [],
            total
        };
        if (items.length === 0) {
            return reports;
        }
        const gauzyIds = (0, underscore_1.pluck)(items, 'gauzyId');
        const { dateRange: { start, end } } = filter;
        const income = await this._incomeService.findAll({
            where: {
                id: (0, typeorm_1.In)(gauzyIds),
                valueDate: (0, typeorm_1.Between)((0, moment_1.default)((0, moment_1.default)(start).format('YYYY-MM-DD hh:mm:ss')).toDate(), (0, moment_1.default)((0, moment_1.default)(end).format('YYYY-MM-DD hh:mm:ss')).toDate()),
                organizationId,
                tenantId
            },
            relations: relations.income
        });
        const expense = await this._expenseService.findAll({
            where: {
                id: (0, typeorm_1.In)(gauzyIds),
                valueDate: (0, typeorm_1.Between)((0, moment_1.default)((0, moment_1.default)(start).format('YYYY-MM-DD hh:mm:ss')).toDate(), (0, moment_1.default)((0, moment_1.default)(end).format('YYYY-MM-DD hh:mm:ss')).toDate()),
                organizationId,
                tenantId
            },
            relations: relations.expense
        });
        reports.total = income.total + expense.total;
        reports.items = reports.items.concat(income.items);
        reports.items = reports.items.concat(expense.items);
        reports.items = (0, underscore_1.sortBy)(reports.items, function (item) {
            return item.valueDate;
        }).reverse();
        return reports;
    }
};
exports.UpworkService = UpworkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService,
        income_service_1.IncomeService,
        integration_map_service_1.IntegrationMapService,
        user_service_1.UserService,
        role_service_1.RoleService,
        organization_service_1.OrganizationService,
        time_slot_service_1.TimeSlotService, typeof (_a = typeof index_4.UpworkReportService !== "undefined" && index_4.UpworkReportService) === "function" ? _a : Object, cqrs_1.CommandBus])
], UpworkService);
//# sourceMappingURL=upwork.service.js.map