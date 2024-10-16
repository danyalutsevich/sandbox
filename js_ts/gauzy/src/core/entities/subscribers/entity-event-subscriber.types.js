"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmEntityManager = exports.MikroOrmEntityManager = void 0;
const core_1 = require("@mikro-orm/core");
Object.defineProperty(exports, "MikroOrmEntityManager", { enumerable: true, get: function () { return core_1.EntityManager; } });
const typeorm_1 = require("typeorm");
Object.defineProperty(exports, "TypeOrmEntityManager", { enumerable: true, get: function () { return typeorm_1.EntityManager; } });
//# sourceMappingURL=entity-event-subscriber.types.js.map