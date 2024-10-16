"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmManyToMany = exports.MikroOrmOneToOne = exports.MikroOrmOneToMany = exports.MikroOrmManyToOne = void 0;
const core_1 = require("@mikro-orm/core");
Object.defineProperty(exports, "MikroOrmManyToOne", { enumerable: true, get: function () { return core_1.ManyToOne; } });
Object.defineProperty(exports, "MikroOrmOneToMany", { enumerable: true, get: function () { return core_1.OneToMany; } });
Object.defineProperty(exports, "MikroOrmOneToOne", { enumerable: true, get: function () { return core_1.OneToOne; } });
Object.defineProperty(exports, "MikroOrmManyToMany", { enumerable: true, get: function () { return core_1.ManyToMany; } });
//# sourceMappingURL=mikro-orm.js.map