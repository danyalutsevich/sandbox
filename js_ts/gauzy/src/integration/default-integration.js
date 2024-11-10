"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_INTEGRATIONS = exports.PROJECT_MANAGE_DEFAULT_INTEGRATIONS = exports.DEFAULT_AI_INTEGRATIONS = exports.DEFAULT_SYSTEM_INTEGRATIONS = void 0;
const index_1 = require("../../plugins/common/dist/index");
const index_2 = require("../../plugins/contracts/dist/index");
/**
 *
 */
exports.DEFAULT_SYSTEM_INTEGRATIONS = [
    {
        name: index_2.IntegrationEnum.HUBSTAFF,
        imgSrc: 'hubstaff.svg',
        isComingSoon: false,
        integrationTypesMap: [
            index_2.IntegrationTypeEnum.ALL_INTEGRATIONS
        ],
        order: 1,
        redirectUrl: (0, index_1.sluggable)(index_2.IntegrationEnum.HUBSTAFF),
        provider: index_2.IntegrationEnum.HUBSTAFF
    },
    {
        name: index_2.IntegrationEnum.UPWORK,
        imgSrc: 'upwork.svg',
        isComingSoon: false,
        integrationTypesMap: [
            index_2.IntegrationTypeEnum.ALL_INTEGRATIONS
        ],
        order: 2,
        redirectUrl: (0, index_1.sluggable)(index_2.IntegrationEnum.UPWORK),
        provider: index_2.IntegrationEnum.UPWORK
    },
    {
        name: 'Import/Export',
        imgSrc: 'import-export.svg',
        isComingSoon: true,
        integrationTypesMap: [
            index_2.IntegrationTypeEnum.ALL_INTEGRATIONS,
            index_2.IntegrationTypeEnum.CRM
        ],
        order: 6,
        redirectUrl: (0, index_1.sluggable)(index_2.IntegrationEnum.IMPORT_EXPORT),
        provider: index_2.IntegrationEnum.IMPORT_EXPORT
    },
];
/**
 *
 */
exports.DEFAULT_AI_INTEGRATIONS = [
    {
        name: 'Gauzy AI',
        imgSrc: 'gauzy-ai.svg',
        isComingSoon: false,
        integrationTypesMap: [
            index_2.IntegrationTypeEnum.ALL_INTEGRATIONS
        ],
        order: 3,
        redirectUrl: (0, index_1.sluggable)(index_2.IntegrationEnum.GAUZY_AI),
        provider: index_2.IntegrationEnum.GAUZY_AI
    },
];
/**
 *
 */
exports.PROJECT_MANAGE_DEFAULT_INTEGRATIONS = [
    {
        name: index_2.IntegrationEnum.GITHUB,
        imgSrc: 'github.svg',
        isComingSoon: false,
        integrationTypesMap: [
            index_2.IntegrationTypeEnum.ALL_INTEGRATIONS,
            index_2.IntegrationTypeEnum.PROJECT_MANAGEMENT
        ],
        order: 4,
        redirectUrl: (0, index_1.sluggable)(index_2.IntegrationEnum.GITHUB),
        provider: index_2.IntegrationEnum.GITHUB
    },
    {
        name: index_2.IntegrationEnum.JIRA,
        imgSrc: 'jira.svg',
        isComingSoon: true,
        integrationTypesMap: [
            index_2.IntegrationTypeEnum.ALL_INTEGRATIONS,
            index_2.IntegrationTypeEnum.PROJECT_MANAGEMENT
        ],
        order: 5,
        redirectUrl: (0, index_1.sluggable)(index_2.IntegrationEnum.JIRA),
        provider: index_2.IntegrationEnum.JIRA
    },
];
exports.DEFAULT_INTEGRATIONS = [
    ...exports.DEFAULT_SYSTEM_INTEGRATIONS,
    ...exports.DEFAULT_AI_INTEGRATIONS,
    ...exports.PROJECT_MANAGE_DEFAULT_INTEGRATIONS
];
//# sourceMappingURL=default-integration.js.map