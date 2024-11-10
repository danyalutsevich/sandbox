"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../../plugins/common/dist/index");
const Permissions = (...permissions) => (0, common_1.SetMetadata)(index_1.PERMISSIONS_METADATA, permissions);
exports.Permissions = Permissions;
//# sourceMappingURL=permissions.decorator.js.map