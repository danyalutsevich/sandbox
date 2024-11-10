"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmEmployeeRepository = void 0;
const mikro_orm_base_entity_repository_1 = require("../../core/repository/mikro-orm-base-entity.repository");
class MikroOrmEmployeeRepository extends mikro_orm_base_entity_repository_1.MikroOrmBaseEntityRepository {
    /**
     * Fetches an employee based on the provided query.
     *
     * @param query - The query parameters to find the employee.
     * @returns A Promise resolving to the employee entity or null.
     */
    async findOneByOptions(query) {
        return await this.findOne(query);
    }
}
exports.MikroOrmEmployeeRepository = MikroOrmEmployeeRepository;
//# sourceMappingURL=mikro-orm-employee.repository.js.map