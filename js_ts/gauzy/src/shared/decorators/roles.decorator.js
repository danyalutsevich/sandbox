"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../../plugins/common/dist/index");
const Roles = (...roles) => (0, common_1.SetMetadata)(index_1.ROLES_METADATA, roles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map