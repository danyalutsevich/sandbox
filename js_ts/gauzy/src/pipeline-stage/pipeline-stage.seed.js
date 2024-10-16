"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomPipelineStage = void 0;
const faker_1 = require("@faker-js/faker");
const pipeline_stage_entity_1 = require("./pipeline-stage.entity");
const internal_1 = require("./../core/entities/internal");
const createRandomPipelineStage = async (dataSource, tenants, tenantOrganizationsMap) => {
    if (!tenantOrganizationsMap) {
        console.warn('Warning: tenantOrganizationsMap not found, pipeline stages not be created');
        return;
    }
    const pipelineStages = [];
    for (const tenant of tenants) {
        const { id: tenantId } = tenant;
        const tenantOrganization = tenantOrganizationsMap.get(tenant);
        for (const tenantOrg of tenantOrganization) {
            const { id: organizationId } = tenantOrg;
            const organizationPipeline = await dataSource.manager.findBy(internal_1.Pipeline, {
                organizationId,
                tenantId
            });
            for (const pipeline of organizationPipeline) {
                for (let i = 0; i <= faker_1.faker.number.int(10); i++) {
                    //todo Need to update with real values
                    const pipelineStage = new pipeline_stage_entity_1.PipelineStage();
                    pipelineStage.pipeline = pipeline;
                    pipelineStage.pipelineId = pipeline.id;
                    pipelineStage.name = faker_1.faker.company.name();
                    pipelineStage.description = faker_1.faker.person.jobDescriptor();
                    pipelineStage.index = Math.floor(Math.random() * 99999) + 1;
                    pipelineStage.tenant = tenant;
                    pipelineStage.organization = tenantOrg;
                    pipelineStages.push(pipelineStage);
                }
            }
        }
    }
    return await insertRandomPipelineStage(dataSource, pipelineStages);
};
exports.createRandomPipelineStage = createRandomPipelineStage;
const insertRandomPipelineStage = async (dataSource, pipelineStages) => await dataSource.manager.save(pipelineStages);
//# sourceMappingURL=pipeline-stage.seed.js.map