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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomTenantOrganizationsReport = exports.createDefaultReport = void 0;
const index_1 = require("../../plugins/config/dist/index");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const path = __importStar(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
const underscore_1 = require("underscore");
const internal_1 = require("./../core/entities/internal");
const organization_seed_1 = require("./../organization/organization.seed");
const report_category_entity_1 = require("./report-category.entity");
const report_organization_entity_1 = require("./report-organization.entity");
const report_entity_1 = require("./report.entity");
const createDefaultReport = async (dataSource, config, tenant) => {
    await cleanReport(dataSource, config);
    const defaultCategories = [
        new report_category_entity_1.ReportCategory({
            name: 'Time Tracking',
            iconClass: 'fa-clock'
        }),
        new report_category_entity_1.ReportCategory({
            name: 'Payments',
            iconClass: 'fa-credit-card'
        }),
        new report_category_entity_1.ReportCategory({
            name: 'Time Off',
            iconClass: 'fa-stopwatch'
        }),
        new report_category_entity_1.ReportCategory({
            name: 'Invoicing',
            iconClass: 'fa-file-invoice-dollar'
        })
    ];
    await dataSource.manager.save(defaultCategories);
    const categoryByName = (0, underscore_1.indexBy)(defaultCategories, 'name');
    const reports = [
        new report_entity_1.Report({
            name: 'Time & Activity',
            slug: 'time-activity',
            image: copyImage('time-activity.png', config),
            category: categoryByName['Time Tracking'],
            showInMenu: true,
            iconClass: 'far fa-clock',
            description: "See team members' time worked, activity levels, and amounts earned per project or task"
        }),
        new report_entity_1.Report({
            name: 'Weekly',
            slug: 'weekly',
            image: copyImage('weekly.png', config),
            category: categoryByName['Time Tracking'],
            iconClass: 'fas fa-calendar-alt',
            showInMenu: true,
            description: "See team members' time worked, activity levels, and amount earned per week"
        }),
        new report_entity_1.Report({
            name: 'Apps & URLs',
            slug: 'apps-urls',
            image: copyImage('apps-urls.png', config),
            category: categoryByName['Time Tracking'],
            iconClass: 'far fa-window-maximize',
            description: "See team members' apps used and URLs visited while working"
        }),
        new report_entity_1.Report({
            name: 'Manual time edits',
            slug: 'manual-time-edits',
            image: copyImage('manual-time-edits.png', config),
            category: categoryByName['Time Tracking'],
            iconClass: 'far fa-window-maximize',
            description: "See team members' time worked, project, task, and reason for each manual time entry"
        }),
        new report_entity_1.Report({
            name: 'Expense',
            slug: 'expense',
            image: copyImage('expense.png', config),
            category: categoryByName['Time Tracking'],
            iconClass: 'far fa-credit-card',
            description: 'See how much has been spent on expenses by member and project.'
        }),
        new report_entity_1.Report({
            name: 'Amounts owed',
            slug: 'amounts-owed',
            image: copyImage('amounts-owed.png', config),
            category: categoryByName['Payments'],
            iconClass: 'far fa-credit-card',
            description: 'See how much team members are currently owed'
        }),
        new report_entity_1.Report({
            name: 'Payments',
            slug: 'payments',
            image: copyImage('payments.png', config),
            category: categoryByName['Payments'],
            iconClass: 'far fa-credit-card',
            description: 'See how much team members were paid over a given period'
        }),
        new report_entity_1.Report({
            name: 'Weekly limits',
            slug: 'weekly-limits',
            image: copyImage('blank.png', config),
            category: categoryByName['Time Off'],
            iconClass: 'far fa-clock',
            description: "See team members' weekly limits usage"
        }),
        new report_entity_1.Report({
            name: 'Daily limits',
            slug: 'daily-limits',
            image: copyImage('blank.png', config),
            category: categoryByName['Time Off'],
            iconClass: 'far fa-clock',
            description: "See team members' daily limits usage"
        }),
        new report_entity_1.Report({
            name: 'Project budgets',
            slug: 'project-budgets',
            image: copyImage('blank.png', config),
            category: categoryByName['Invoicing'],
            iconClass: 'far fa-credit-card',
            description: "See how much of your projects' budgets have been spent"
        }),
        new report_entity_1.Report({
            name: 'Client budgets',
            slug: 'client-budgets',
            image: copyImage('blank.png', config),
            category: categoryByName['Invoicing'],
            iconClass: 'far fa-credit-card',
            description: "See how much of your clients' budgets have been spent"
        })
    ];
    await dataSource.manager.save(reports);
    await createDefaultOrganizationsReport(dataSource, reports, tenant);
    return reports;
};
exports.createDefaultReport = createDefaultReport;
async function cleanReport(dataSource, config) {
    const report = dataSource.getRepository(report_entity_1.Report).metadata.tableName;
    const reportCategory = dataSource.getRepository(report_category_entity_1.ReportCategory).metadata.tableName;
    const dbType = config.dbConnectionOptions.type;
    switch (dbType) {
        case index_1.DatabaseTypeEnum.sqlite:
        case index_1.DatabaseTypeEnum.betterSqlite3:
            await dataSource.query(`DELETE FROM ${reportCategory}`);
            await dataSource.query(`DELETE FROM ${report}`);
            break;
        case index_1.DatabaseTypeEnum.postgres:
            await dataSource.query(`TRUNCATE TABLE ${report}, ${reportCategory} RESTART IDENTITY CASCADE`);
            break;
        case index_1.DatabaseTypeEnum.mysql:
            await dataSource.query('SET foreign_key_checks = 0;');
            await dataSource.query(`DELETE FROM ${reportCategory}`);
            await dataSource.query(`DELETE FROM ${report}`);
            await dataSource.query('SET foreign_key_checks = 1;');
            break;
        default:
            throw new Error(`Cannot clean report, report_category tables due to unsupported database type: ${dbType}`);
    }
    console.log(chalk_1.default.green(`CLEANING UP REPORT IMAGES...`));
    try {
        const destDir = 'reports';
        const dir = index_1.environment.isElectron
            ? path.resolve(index_1.environment.gauzyUserPath, ...['public', destDir])
            : path.join(config.assetOptions.assetPublicPath, destDir);
        // delete old generated report images
        await new Promise((resolve, reject) => {
            (0, rimraf_1.default)(`${dir}/!(rimraf|.gitkeep)`, (err) => {
                if (err) {
                    console.error(chalk_1.default.red(`Error cleaning up report images: ${err.message}`));
                    reject(err);
                }
                else {
                    console.log(chalk_1.default.green(`CLEANED UP REPORT IMAGES`));
                    resolve();
                }
            });
        });
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error during cleanReport: ${error.message}`));
    }
}
function copyImage(fileName, config) {
    try {
        const destDir = 'reports';
        const dir = index_1.environment.isElectron
            ? path.resolve(index_1.environment.gauzySeedPath, destDir)
            : path.join(config.assetOptions.assetPath, ...['seed', destDir]) ||
                path.resolve(__dirname, '../../../', ...['apps', 'api', 'src', 'assets', 'seed', destDir]);
        const baseDir = index_1.environment.isElectron
            ? path.resolve(index_1.environment.gauzyUserPath, ...['public'])
            : config.assetOptions.assetPublicPath || path.resolve(__dirname, '../../../', ...['apps', 'api', 'public']);
        (0, fs_1.mkdirSync)(path.join(baseDir, destDir), { recursive: true });
        const destFilePath = path.join(destDir, fileName);
        (0, fs_1.copyFileSync)(path.join(dir, fileName), path.join(baseDir, destFilePath));
        return destFilePath;
    }
    catch (err) {
        console.log(err);
    }
}
async function createDefaultOrganizationsReport(dataSource, reports, tenant) {
    const organizations = await (0, organization_seed_1.getDefaultOrganizations)(dataSource, tenant);
    const reportOrganizations = [];
    for (const organization of organizations) {
        for (const report of reports) {
            reportOrganizations.push(new report_organization_entity_1.ReportOrganization({
                report,
                organization,
                tenant
            }));
        }
    }
    return await dataSource.manager.save(reportOrganizations);
}
async function createRandomTenantOrganizationsReport(dataSource, tenants) {
    try {
        const reports = await dataSource.manager.find(report_entity_1.Report);
        for await (const tenant of tenants) {
            const { id: tenantId } = tenant;
            const organizations = await dataSource.getRepository(internal_1.Organization).find({
                where: {
                    tenantId
                }
            });
            const reportOrganizations = [];
            for await (const organization of organizations) {
                for await (const report of reports) {
                    reportOrganizations.push(new report_organization_entity_1.ReportOrganization({
                        report,
                        organization,
                        tenant
                    }));
                }
            }
            await dataSource.manager.save(reportOrganizations);
        }
    }
    catch (error) {
        console.log(chalk_1.default.red(`SEEDING Random Reports`, error));
    }
}
exports.createRandomTenantOrganizationsReport = createRandomTenantOrganizationsReport;
//# sourceMappingURL=report.seed.js.map