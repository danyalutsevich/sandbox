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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const index_1 = require("../../../plugins/config/dist/index");
const contracts_1 = require("../../../plugins/contracts");
const context_1 = require("core/context");
const commands_1 = require("integration-tenant/commands");
const integration_service_1 = require("integration/integration.service");
const github_config_1 = require("./github.config");
const github_entity_settings_1 = require("./github-entity-settings");
const { github } = index_1.environment;
let GithubService = exports.GithubService = class GithubService {
    _http;
    _commandBus;
    _integrationService;
    logger = new common_1.Logger('GithubService');
    constructor(_http, _commandBus, _integrationService) {
        this._http = _http;
        this._commandBus = _commandBus;
        this._integrationService = _integrationService;
    }
    /**
     * Adds a GitHub App installation by validating input data, fetching an access token, and creating integration tenant settings.
     *
     * @param input - The input data for adding a GitHub App installation.
     * @returns A promise that resolves to the access token data.
     * @throws Error if any step of the process fails.
     */
    async addGithubAppInstallation(input) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!input || !input.installation_id || !input.setup_action) {
                throw new common_1.HttpException('Invalid github input data', common_1.HttpStatus.BAD_REQUEST);
            }
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            const { installation_id, setup_action, organizationId } = input;
            /** Find the GitHub integration */
            const integration = await this._integrationService.findOneByOptions({
                where: {
                    provider: contracts_1.IntegrationEnum.GITHUB
                }
            });
            const tiedEntities = github_entity_settings_1.ISSUE_TIED_ENTITIES.map((entity) => ({
                ...entity,
                organizationId,
                tenantId
            }));
            const entitySettings = github_entity_settings_1.DEFAULT_ENTITY_SETTINGS.map((settingEntity) => {
                if (settingEntity.entity === contracts_1.IntegrationEntity.ISSUE) {
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
            return await this._commandBus.execute(new commands_1.IntegrationTenantUpdateOrCreateCommand({
                name: contracts_1.IntegrationEnum.GITHUB,
                integration: {
                    provider: contracts_1.IntegrationEnum.GITHUB,
                },
                tenantId,
                organizationId
            }, {
                name: contracts_1.IntegrationEnum.GITHUB,
                integration,
                tenantId,
                organizationId,
                entitySettings: entitySettings,
                isActive: true,
                isArchived: false,
                settings: [
                    {
                        settingsName: contracts_1.GithubPropertyMapEnum.INSTALLATION_ID,
                        settingsValue: installation_id,
                    },
                    {
                        settingsName: contracts_1.GithubPropertyMapEnum.SETUP_ACTION,
                        settingsValue: setup_action,
                    },
                    {
                        settingsName: contracts_1.GithubPropertyMapEnum.SYNC_TAG,
                        settingsValue: contracts_1.SYNC_TAG_GITHUB,
                    }
                ].map((setting) => ({
                    ...setting,
                    tenantId,
                    organizationId
                })),
            }));
        }
        catch (error) {
            this.logger.error(`Error while creating ${contracts_1.IntegrationEnum.GITHUB} integration settings`, error?.message);
            throw new Error(`Failed to add ${contracts_1.IntegrationEnum.GITHUB} App Installation`);
        }
    }
    /**
     * Authorizes a GitHub App installation by validating input data, fetching an access token, and creating integration tenant settings.
     *
     * @param input - The input data required for OAuth authorization.
     * @returns A promise that resolves with the integration tenant data.
     * @throws {HttpException} If input data is invalid or if any step of the process fails.
     */
    async oAuthEndpointAuthorization(input) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!input || !input.code) {
                throw new common_1.HttpException('Invalid input data', common_1.HttpStatus.BAD_REQUEST);
            }
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            const { code, organizationId } = input;
            /** Find the GitHub integration */
            const integration = await this._integrationService.findOneByOptions({
                where: {
                    provider: contracts_1.IntegrationEnum.GITHUB
                }
            });
            const urlParams = new URLSearchParams();
            urlParams.append('client_id', github.clientId);
            urlParams.append('client_secret', github.clientSecret);
            urlParams.append('code', code);
            const tokens$ = this._http.post(github_config_1.GITHUB_ACCESS_TOKEN_URL, urlParams, {
                headers: {
                    accept: 'application/json',
                }
            }).pipe((0, rxjs_1.switchMap)(async ({ data }) => {
                if (!data.error) {
                    // Token retrieval was successful, return the token data
                    return await this._commandBus.execute(new commands_1.IntegrationTenantUpdateOrCreateCommand({
                        name: contracts_1.IntegrationEnum.GITHUB,
                        integration: {
                            provider: contracts_1.IntegrationEnum.GITHUB,
                        },
                        tenantId,
                        organizationId
                    }, {
                        name: contracts_1.IntegrationEnum.GITHUB,
                        integration,
                        tenantId,
                        organizationId,
                        entitySettings: [],
                        isActive: true,
                        isArchived: false,
                        settings: [
                            {
                                settingsName: contracts_1.GithubPropertyMapEnum.ACCESS_TOKEN,
                                settingsValue: data.access_token
                            },
                            {
                                settingsName: contracts_1.GithubPropertyMapEnum.EXPIRES_IN,
                                settingsValue: data.expires_in.toString()
                            },
                            {
                                settingsName: contracts_1.GithubPropertyMapEnum.REFRESH_TOKEN,
                                settingsValue: data.refresh_token
                            },
                            {
                                settingsName: contracts_1.GithubPropertyMapEnum.REFRESH_TOKEN_EXPIRES_IN,
                                settingsValue: data.refresh_token_expires_in.toString()
                            },
                            {
                                settingsName: contracts_1.GithubPropertyMapEnum.TOKEN_TYPE,
                                settingsValue: data.token_type
                            }
                        ].map((setting) => ({
                            ...setting,
                            tenantId,
                            organizationId
                        })),
                    }));
                }
                else {
                    // Token retrieval failed, Throw an error to handle the failure
                    throw new common_1.BadRequestException('Token retrieval failed', data);
                }
            }));
            return await (0, rxjs_1.firstValueFrom)(tokens$);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            this.logger.error('Error while creating GitHub integration settings', error.message);
            throw new common_1.HttpException(`Failed to add GitHub App Installation: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.GithubService = GithubService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        cqrs_1.CommandBus, typeof (_a = typeof integration_service_1.IntegrationService !== "undefined" && integration_service_1.IntegrationService) === "function" ? _a : Object])
], GithubService);
//# sourceMappingURL=github.service.js.map