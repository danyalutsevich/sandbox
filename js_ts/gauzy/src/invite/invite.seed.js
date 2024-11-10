"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomEmployeeInviteSent = exports.createDefaultEmployeeInviteSent = void 0;
const faker_1 = require("@faker-js/faker");
const index_1 = require("../../plugins/contracts/dist/index");
const jsonwebtoken_1 = require("jsonwebtoken");
const index_2 = require("../../plugins/config/dist/index");
const moment_1 = __importDefault(require("moment"));
const invite_entity_1 = require("./invite.entity");
const internal_1 = require("../core/entities/internal");
const utils_1 = require("../core/seeds/utils");
const createDefaultEmployeeInviteSent = async (dataSource, tenant, organizations, SuperAdmin) => {
    const totalInvites = [];
    const invitationStatus = Object.values(index_1.InviteStatusEnum);
    const { id: tenantId } = tenant;
    const roles = await dataSource.manager.findBy(internal_1.Role, {
        tenantId
    });
    organizations.forEach((organization) => {
        for (let i = 0; i < 10; i++) {
            const invitee = new invite_entity_1.Invite();
            invitee.email = (0, utils_1.getEmailWithPostfix)(faker_1.faker.internet.exampleEmail());
            invitee.expireDate = faker_1.faker.date.between({
                from: new Date(),
                to: (0, moment_1.default)(new Date()).add(30, 'days').toDate()
            });
            invitee.invitedBy = faker_1.faker.helpers.arrayElement(SuperAdmin);
            invitee.organizationId = organization.id;
            invitee.role = faker_1.faker.helpers.arrayElement(roles);
            invitee.status = faker_1.faker.helpers.arrayElement(invitationStatus);
            invitee.token = createToken(invitee.email);
            invitee.tenant = tenant;
            totalInvites.push(invitee);
        }
    });
    await dataSource.manager.save(totalInvites);
};
exports.createDefaultEmployeeInviteSent = createDefaultEmployeeInviteSent;
const createRandomEmployeeInviteSent = async (dataSource, tenants, tenantOrganizationsMap, tenantSuperAdminMap, noOfInvitesPerOrganization) => {
    const totalInvites = [];
    const invitationStatus = Object.values(index_1.InviteStatusEnum);
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const roles = await dataSource.manager.findBy(internal_1.Role, {
            tenantId
        });
        const organizations = tenantOrganizationsMap.get(tenant);
        const admins = tenantSuperAdminMap.get(tenant);
        organizations.forEach((organization) => {
            for (let i = 0; i < noOfInvitesPerOrganization; i++) {
                const invitee = new invite_entity_1.Invite();
                invitee.email = (0, utils_1.getEmailWithPostfix)(faker_1.faker.internet.exampleEmail());
                invitee.expireDate = faker_1.faker.date.between({
                    from: new Date(),
                    to: (0, moment_1.default)(new Date()).add(30, 'days').toDate()
                });
                invitee.invitedBy = faker_1.faker.helpers.arrayElement(admins);
                invitee.organizationId = organization.id;
                invitee.role = faker_1.faker.helpers.arrayElement(roles);
                invitee.status = faker_1.faker.helpers.arrayElement(invitationStatus);
                invitee.token = createToken(invitee.email);
                invitee.tenant = tenant;
                totalInvites.push(invitee);
            }
        });
    }
    await dataSource.manager.save(totalInvites);
};
exports.createRandomEmployeeInviteSent = createRandomEmployeeInviteSent;
function createToken(email) {
    const token = (0, jsonwebtoken_1.sign)({ email }, index_2.environment.JWT_SECRET, {});
    return token;
}
//# sourceMappingURL=invite.seed.js.map