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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/config/dist/index");
const connection_entity_manager_1 = require("../database/connection-entity-manager");
const database_helper_1 = require("./../database/database.helper");
const pipeline_entity_1 = require("./pipeline.entity");
const internal_1 = require("./../core/entities/internal");
const context_1 = require("../core/context");
const crud_1 = require("./../core/crud");
const repository_1 = require("../deal/repository");
const repository_2 = require("../user/repository");
const repository_3 = require("./repository");
let PipelineService = exports.PipelineService = class PipelineService extends crud_1.TenantAwareCrudService {
    typeOrmPipelineRepository;
    mikroOrmPipelineRepository;
    typeOrmDealRepository;
    typeOrmUserRepository;
    _connectionEntityManager;
    constructor(typeOrmPipelineRepository, mikroOrmPipelineRepository, typeOrmDealRepository, typeOrmUserRepository, _connectionEntityManager) {
        super(typeOrmPipelineRepository, mikroOrmPipelineRepository);
        this.typeOrmPipelineRepository = typeOrmPipelineRepository;
        this.mikroOrmPipelineRepository = mikroOrmPipelineRepository;
        this.typeOrmDealRepository = typeOrmDealRepository;
        this.typeOrmUserRepository = typeOrmUserRepository;
        this._connectionEntityManager = _connectionEntityManager;
    }
    async findDeals(pipelineId) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const items = await this.typeOrmDealRepository
            .createQueryBuilder('deal')
            .leftJoin('deal.stage', 'pipeline_stage')
            .where((0, database_helper_1.prepareSQLQuery)('pipeline_stage.pipelineId = :pipelineId'), { pipelineId })
            .andWhere((0, database_helper_1.prepareSQLQuery)('pipeline_stage.tenantId = :tenantId'), { tenantId })
            .groupBy((0, database_helper_1.prepareSQLQuery)('pipeline_stage.id'))
            // FIX: error: column "deal.id" must appear in the GROUP BY clause or be used in an aggregate function
            .addGroupBy((0, database_helper_1.prepareSQLQuery)('deal.id'))
            // END_FIX
            .orderBy((0, database_helper_1.prepareSQLQuery)('pipeline_stage.index'), 'ASC')
            .getMany();
        const { length: total } = items;
        for (const deal of items) {
            deal.createdBy = await this.typeOrmUserRepository.findOneBy({
                id: deal.createdByUserId
            });
        }
        return { items, total };
    }
    /**
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        const queryRunner = this._connectionEntityManager.rawConnection.createQueryRunner();
        try {
            /**
             * Query runner connect & start transaction
             */
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.manager.findOneByOrFail(pipeline_entity_1.Pipeline, {
                id: id
            });
            const pipeline = await queryRunner.manager.create(pipeline_entity_1.Pipeline, { id: id, ...entity });
            const updatedStages = pipeline.stages?.filter((stage) => stage.id) || [];
            const stages = await queryRunner.manager.findBy(internal_1.PipelineStage, {
                pipelineId: id
            });
            const requestStageIds = updatedStages.map((updatedStage) => updatedStage.id);
            const deletedStages = stages.filter((stage) => !requestStageIds.includes(stage.id));
            const createdStages = pipeline.stages?.filter((stage) => !updatedStages.includes(stage)) || [];
            pipeline.__before_persist();
            delete pipeline.stages;
            await queryRunner.manager.remove(deletedStages);
            for await (const stage of createdStages) {
                await queryRunner.manager.save(queryRunner.manager.create(internal_1.PipelineStage, stage));
            }
            for await (const stage of updatedStages) {
                await queryRunner.manager.update(internal_1.PipelineStage, stage.id, stage);
            }
            const saved = await queryRunner.manager.update(pipeline_entity_1.Pipeline, id, pipeline);
            await queryRunner.commitTransaction();
            return saved;
        }
        catch (error) {
            console.log('Rollback Pipeline Transaction', error);
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
    /**
     * Perform pagination with filtering based on the provided options.
     *
     * @param filter - The filtering options.
     * @returns The paginated result.
     */
    async pagination(filter) {
        if ('where' in filter) {
            const { where } = filter;
            const likeOperator = (0, index_1.isPostgres)() ? 'ILIKE' : 'LIKE';
            if ('name' in where) {
                const { name } = where;
                filter['where']['name'] = (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${name}%'`);
            }
            if ('description' in where) {
                const { description } = where;
                filter['where']['description'] = (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${description}%'`);
            }
            if ('stages' in where) {
                const { stages } = where;
                filter['where']['stages'] = {
                    name: (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${stages}%'`)
                };
            }
        }
        return await super.paginate(filter);
    }
};
exports.PipelineService = PipelineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_3.TypeOrmPipelineRepository,
        repository_3.MikroOrmPipelineRepository,
        repository_1.TypeOrmDealRepository,
        repository_2.TypeOrmUserRepository,
        connection_entity_manager_1.ConnectionEntityManager])
], PipelineService);
//# sourceMappingURL=pipeline.service.js.map