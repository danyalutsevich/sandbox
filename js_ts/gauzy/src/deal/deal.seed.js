"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomDeal = void 0;
const deal_entity_1 = require("./deal.entity");
const faker_1 = require("@faker-js/faker");
const internal_1 = require("./../core/entities/internal");
const createRandomDeal = async (dataSource, tenants, tenantOrganizationsMap, organizationEmployeesMap) => {
    if (!organizationEmployeesMap) {
        console.warn('Warning: organizationEmployeesMap not found, deal  will not be created');
        return;
    }
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, deal  will not be created');
        return;
    }
    const deals = [];
    for await (const tenant of tenants) {
        const tenantOrgs = tenantOrganizationsMap.get(tenant);
        for await (const tenantOrg of tenantOrgs) {
            const { id: tenantId } = tenant;
            const { id: organizationId } = tenantOrg;
            const pipelines = await dataSource.manager.findBy(internal_1.Pipeline, {
                organizationId,
                tenantId
            });
            const tenantEmployees = organizationEmployeesMap.get(tenantOrg);
            for await (const tenantEmployee of tenantEmployees) {
                for (const pipeline of pipelines) {
                    const { id: pipelineId } = pipeline;
                    const pipelineStages = await dataSource.manager.findBy(internal_1.PipelineStage, {
                        pipelineId
                    });
                    for (const pipelineStage of pipelineStages) {
                        const deal = new deal_entity_1.Deal();
                        deal.createdBy = tenantEmployee.user;
                        deal.stage = pipelineStage;
                        deal.title = faker_1.faker.person.jobTitle();
                        deal.createdByUserId = tenantEmployee.user.id;
                        deal.stageId = pipelineStage.id;
                        deal.organization = tenantOrg;
                        deal.probability = faker_1.faker.number.int(5);
                        deal.tenant = tenant;
                        deals.push(deal);
                    }
                }
            }
        }
    }
    await dataSource.manager.save(deals);
};
exports.createRandomDeal = createRandomDeal;
//# sourceMappingURL=deal.seed.js.map