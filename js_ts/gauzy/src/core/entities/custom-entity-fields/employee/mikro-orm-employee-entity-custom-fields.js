"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmEmployeeEntityCustomFields = void 0;
const core_1 = require("@mikro-orm/core");
const mikro_orm_base_custom_entity_field_1 = require("../mikro-orm-base-custom-entity-field");
let MikroOrmEmployeeEntityCustomFields = exports.MikroOrmEmployeeEntityCustomFields = class MikroOrmEmployeeEntityCustomFields extends mikro_orm_base_custom_entity_field_1.MikroOrmBaseCustomEntityFields {
};
exports.MikroOrmEmployeeEntityCustomFields = MikroOrmEmployeeEntityCustomFields = __decorate([
    (0, core_1.Embeddable)()
], MikroOrmEmployeeEntityCustomFields);
//# sourceMappingURL=mikro-orm-employee-entity-custom-fields.js.map