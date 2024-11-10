"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomPipeline = exports.createDefaultPipeline = void 0;
const faker_1 = require("@faker-js/faker");
const pipeline_entity_1 = require("./pipeline.entity");
const createDefaultPipeline = async (dataSource, tenant, tenantOrganizations) => {
    if (!tenantOrganizations) {
        console.warn('Warning: tenantOrganizations not found, Default pipeline not be created');
        return;
    }
    let pipelines = [];
    pipelines = await dataOperation(dataSource, tenant, pipelines, tenantOrganizations);
    return pipelines;
};
exports.createDefaultPipeline = createDefaultPipeline;
const createRandomPipeline = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, pipeline not be created');
        return;
    }
    let pipelines = [];
    for (const tenant of tenants) {
        const tenantOrganization = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrganization) {
            pipelines = await dataOperation(dataSource, tenant, pipelines, tenantOrg);
        }
    }
    return pipelines;
};
exports.createRandomPipeline = createRandomPipeline;
const dataOperation = async (dataSource, tenant, pipelines, organization) => {
    for (let i = 0; i <= faker_1.faker.number.int(10); i++) {
        const pipeline = new pipeline_entity_1.Pipeline();
        pipeline.organization = organization;
        pipeline.tenant = tenant;
        pipeline.organizationId = organization.id;
        pipeline.name = faker_1.faker.company.name();
        pipeline.description = faker_1.faker.person.jobDescriptor();
        pipeline.isActive = faker_1.faker.datatype.boolean();
        pipelines.push(pipeline);
    }
    await dataSource.manager.save(pipelines);
    return pipelines;
};
//# sourceMappingURL=pipeline.seed.js.map