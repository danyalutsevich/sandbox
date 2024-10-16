"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmManyToMany = exports.TypeOrmOneToOne = exports.TypeOrmOneToMany = exports.TypeOrmManyToOne = void 0;
const typeorm_1 = require("typeorm");
Object.defineProperty(exports, "TypeOrmManyToOne", { enumerable: true, get: function () { return typeorm_1.ManyToOne; } });
Object.defineProperty(exports, "TypeOrmOneToMany", { enumerable: true, get: function () { return typeorm_1.OneToMany; } });
Object.defineProperty(exports, "TypeOrmOneToOne", { enumerable: true, get: function () { return typeorm_1.OneToOne; } });
Object.defineProperty(exports, "TypeOrmManyToMany", { enumerable: true, get: function () { return typeorm_1.ManyToMany; } });
//# sourceMappingURL=type-orm.js.map