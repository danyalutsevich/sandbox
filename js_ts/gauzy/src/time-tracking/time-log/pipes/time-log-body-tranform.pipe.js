"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeLogBodyTransformPipe = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const context_1 = require("./../../../core/context");
let TimeLogBodyTransformPipe = exports.TimeLogBodyTransformPipe = class TimeLogBodyTransformPipe {
    transform(entity, metadata) {
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            const user = context_1.RequestContext.currentUser();
            entity.employeeId = user.employeeId;
        }
        return entity;
    }
};
exports.TimeLogBodyTransformPipe = TimeLogBodyTransformPipe = __decorate([
    (0, common_1.Injectable)()
], TimeLogBodyTransformPipe);
//# sourceMappingURL=time-log-body-tranform.pipe.js.map