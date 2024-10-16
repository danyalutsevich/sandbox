"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmUserRepository = void 0;
const mikro_orm_base_entity_repository_1 = require("../../core/repository/mikro-orm-base-entity.repository");
class MikroOrmUserRepository extends mikro_orm_base_entity_repository_1.MikroOrmBaseEntityRepository {
    /**
     * Checks if an entity with the given email already exists in the database.
     * This method counts the number of entities with the specified email and
     * returns a boolean indicating whether or not an entity with that email exists.
     *
     * @param email The email address to check for existence in the database.
     * @returns A promise that resolves to `true` if an entity with the given email exists, otherwise `false`.
     */
    async exists(email) {
        const count = await this.count({ email });
        return count > 0;
    }
}
exports.MikroOrmUserRepository = MikroOrmUserRepository;
//# sourceMappingURL=mikro-orm-user.repository.js.map