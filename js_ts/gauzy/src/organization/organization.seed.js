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
exports.createRandomOrganizations = exports.createDefaultOrganizations = exports.getDefaultOrganizations = exports.getDefaultOrganization = void 0;
const _ = __importStar(require("underscore"));
const moment_1 = __importDefault(require("moment"));
const timezone = __importStar(require("moment-timezone"));
const faker_1 = require("@faker-js/faker");
const core_1 = require("../core");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const internal_1 = require("../core/entities/internal");
const getDefaultOrganization = async (dataSource, tenant) => {
    const repo = dataSource.getRepository(internal_1.Organization);
    const existedOrganization = await repo.findOne({
        where: { tenantId: tenant.id, isDefault: true }
    });
    return existedOrganization;
};
exports.getDefaultOrganization = getDefaultOrganization;
const getDefaultOrganizations = async (dataSource, tenant) => {
    const repo = dataSource.getRepository(internal_1.Organization);
    const organizations = await repo.find({
        where: { tenantId: tenant.id }
    });
    return organizations;
};
exports.getDefaultOrganizations = getDefaultOrganizations;
let defaultOrganizationsInserted = [];
const createDefaultOrganizations = async (dataSource, tenant, organizations) => {
    const defaultOrganizations = [];
    const skills = await getSkills(dataSource);
    const contacts = await getContacts(dataSource);
    organizations.forEach((organization) => {
        const organizationSkills = _.chain(skills)
            .shuffle()
            .take(faker_1.faker.number.int({ min: 1, max: 4 }))
            .values()
            .value();
        const defaultOrganization = new internal_1.Organization();
        const { name, currency, defaultValueDateType, imageUrl, isDefault, totalEmployees } = organization;
        defaultOrganization.name = name;
        defaultOrganization.isDefault = isDefault;
        defaultOrganization.totalEmployees = totalEmployees;
        defaultOrganization.profile_link = generateLink(name);
        defaultOrganization.currency = currency;
        defaultOrganization.defaultValueDateType = defaultValueDateType;
        defaultOrganization.imageUrl = imageUrl;
        defaultOrganization.invitesAllowed = true;
        defaultOrganization.bonusType = index_1.BonusTypeEnum.REVENUE_BASED_BONUS;
        defaultOrganization.bonusPercentage = 10;
        defaultOrganization.registrationDate = faker_1.faker.date.past({ years: 5 });
        defaultOrganization.overview = faker_1.faker.person.jobDescriptor();
        defaultOrganization.short_description = faker_1.faker.person.jobDescriptor();
        defaultOrganization.client_focus = faker_1.faker.person.jobDescriptor();
        defaultOrganization.show_profits = false;
        defaultOrganization.show_bonuses_paid = false;
        defaultOrganization.show_income = false;
        defaultOrganization.show_total_hours = false;
        defaultOrganization.show_projects_count = true;
        defaultOrganization.show_minimum_project_size = true;
        defaultOrganization.show_clients_count = true;
        defaultOrganization.show_clients = true;
        defaultOrganization.show_employees_count = true;
        defaultOrganization.banner = faker_1.faker.person.jobDescriptor();
        defaultOrganization.skills = organizationSkills;
        defaultOrganization.brandColor = faker_1.faker.helpers.arrayElement([
            '#FF0000',
            '#008000',
            '#0000FF',
            '#FFA500',
            '#FFFF00'
        ]);
        defaultOrganization.contact = faker_1.faker.helpers.arrayElement(contacts);
        defaultOrganization.timeZone = faker_1.faker.helpers.arrayElement(timezone.tz.names().filter((zone) => zone.includes('/')));
        defaultOrganization.dateFormat = faker_1.faker.helpers.arrayElement(index_1.DEFAULT_DATE_FORMATS);
        defaultOrganization.defaultAlignmentType = faker_1.faker.helpers.arrayElement(Object.keys(index_1.AlignmentOptions));
        defaultOrganization.fiscalStartDate = (0, moment_1.default)(new Date()).add(faker_1.faker.number.int(10), 'days').toDate();
        defaultOrganization.fiscalEndDate = (0, moment_1.default)(defaultOrganization.fiscalStartDate)
            .add(faker_1.faker.number.int(10), 'days')
            .toDate();
        defaultOrganization.futureDateAllowed = true;
        defaultOrganization.inviteExpiryPeriod = faker_1.faker.number.int(50);
        defaultOrganization.numberFormat = faker_1.faker.helpers.arrayElement(['USD', 'BGN', 'ILS']);
        defaultOrganization.officialName = faker_1.faker.company.name();
        defaultOrganization.separateInvoiceItemTaxAndDiscount = faker_1.faker.datatype.boolean();
        defaultOrganization.startWeekOn = index_1.WeekDaysEnum.MONDAY;
        defaultOrganization.tenant = tenant;
        defaultOrganization.valueDate = (0, moment_1.default)(new Date()).add(faker_1.faker.number.int(10), 'days').toDate();
        defaultOrganizations.push(defaultOrganization);
    });
    await dataSource.manager.save(defaultOrganizations);
    defaultOrganizationsInserted = [...defaultOrganizations];
    return defaultOrganizationsInserted;
};
exports.createDefaultOrganizations = createDefaultOrganizations;
const createRandomOrganizations = async (dataSource, tenants, organizationsPerTenant) => {
    const defaultDateTypes = Object.values(index_1.DefaultValueDateTypeEnum);
    const skills = await getSkills(dataSource);
    const contacts = await getContacts(dataSource);
    const tenantOrganizations = new Map();
    for await (const tenant of tenants) {
        const randomOrganizations = [];
        if (tenant.name === 'Ever') {
            tenantOrganizations.set(tenant, defaultOrganizationsInserted);
        }
        else {
            for (let index = 0; index < organizationsPerTenant; index++) {
                const organizationSkills = _.chain(skills)
                    .shuffle()
                    .take(faker_1.faker.number.int({ min: 1, max: 4 }))
                    .values()
                    .value();
                const organization = new internal_1.Organization();
                const companyName = faker_1.faker.company.name();
                const logoAbbreviation = _extractLogoAbbreviation(companyName);
                organization.name = companyName;
                organization.isDefault = index === 0 || false;
                organization.totalEmployees = 5; //No of random employees seeded will be (employeesPerOrganization * organizationsPerTenant * tenants)
                organization.profile_link = generateLink(companyName);
                organization.currency = index_2.environment.defaultCurrency;
                organization.defaultValueDateType = defaultDateTypes[index % defaultDateTypes.length];
                organization.imageUrl = (0, core_1.getDummyImage)(330, 300, logoAbbreviation);
                organization.invitesAllowed = true;
                organization.overview = faker_1.faker.person.jobDescriptor();
                organization.short_description = faker_1.faker.person.jobDescriptor();
                organization.client_focus = faker_1.faker.person.jobDescriptor();
                organization.show_profits = false;
                organization.show_bonuses_paid = false;
                organization.show_income = false;
                organization.show_total_hours = false;
                organization.show_projects_count = true;
                organization.show_minimum_project_size = true;
                organization.show_clients_count = true;
                organization.show_employees_count = true;
                organization.banner = faker_1.faker.person.jobDescriptor();
                const { bonusType, bonusPercentage } = randomBonus();
                organization.bonusType = bonusType;
                organization.bonusPercentage = bonusPercentage;
                organization.registrationDate = faker_1.faker.date.past({
                    years: Math.floor(Math.random() * 10) + 1
                });
                organization.skills = organizationSkills;
                organization.brandColor = faker_1.faker.helpers.arrayElement([
                    '#FF0000',
                    '#008000',
                    '#0000FF',
                    '#FFA500',
                    '#FFFF00'
                ]);
                organization.contact = faker_1.faker.helpers.arrayElement(contacts);
                organization.timeZone = faker_1.faker.helpers.arrayElement(timezone.tz.names().filter((zone) => zone.includes('/')));
                organization.dateFormat = faker_1.faker.helpers.arrayElement(index_1.DEFAULT_DATE_FORMATS);
                organization.defaultAlignmentType = faker_1.faker.helpers.arrayElement(Object.keys(index_1.AlignmentOptions));
                organization.fiscalStartDate = (0, moment_1.default)(new Date()).add(faker_1.faker.number.int(10), 'days').toDate();
                organization.fiscalEndDate = (0, moment_1.default)(organization.fiscalStartDate)
                    .add(faker_1.faker.number.int(10), 'days')
                    .toDate();
                organization.futureDateAllowed = true;
                organization.inviteExpiryPeriod = faker_1.faker.number.int(50);
                organization.numberFormat = faker_1.faker.helpers.arrayElement(['USD', 'BGN', 'ILS']);
                organization.officialName = faker_1.faker.company.name();
                organization.separateInvoiceItemTaxAndDiscount = faker_1.faker.datatype.boolean();
                organization.startWeekOn = index_1.WeekDaysEnum.MONDAY;
                organization.tenant = tenant;
                organization.valueDate = (0, moment_1.default)(new Date()).add(faker_1.faker.number.int(10), 'days').toDate();
                randomOrganizations.push(organization);
            }
            tenantOrganizations.set(tenant, randomOrganizations);
        }
        await insertOrganizations(dataSource, randomOrganizations);
    }
    return tenantOrganizations;
};
exports.createRandomOrganizations = createRandomOrganizations;
const insertOrganizations = async (dataSource, organizations) => {
    await dataSource.manager.save(organizations);
};
const _extractLogoAbbreviation = (companyName) => {
    const logoFirstWordFirstLetterIndex = 0;
    const companyNameLastEmptyLetterIndex = companyName.lastIndexOf(' ');
    const logoFirstLetter = companyName[logoFirstWordFirstLetterIndex];
    let logoAbbreviation = logoFirstLetter;
    if (companyNameLastEmptyLetterIndex !== -1 && companyNameLastEmptyLetterIndex !== logoFirstWordFirstLetterIndex) {
        const logoLastWordFirstLetterIndex = companyNameLastEmptyLetterIndex + 1;
        const logoSecondLetter = companyName[logoLastWordFirstLetterIndex];
        logoAbbreviation += logoSecondLetter;
    }
    return logoAbbreviation;
};
const randomBonus = () => {
    const randomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const bonusType = Object.values(index_1.BonusTypeEnum)[randomNumberBetween(0, 1)];
    const bonusPercentage = bonusType === index_1.BonusTypeEnum.PROFIT_BASED_BONUS ? randomNumberBetween(65, 75) : randomNumberBetween(5, 10);
    return { bonusType, bonusPercentage };
};
const generateLink = (name) => {
    return name.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
};
const getSkills = async (dataSource) => {
    return await dataSource.manager.find(internal_1.Skill, {});
};
const getContacts = async (dataSource) => {
    return await dataSource.manager.find(internal_1.Contact, {});
};
//# sourceMappingURL=organization.seed.js.map