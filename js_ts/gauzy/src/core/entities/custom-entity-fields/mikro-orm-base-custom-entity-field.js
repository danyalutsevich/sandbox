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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikroOrmBaseCustomEntityFields = exports.__FIX_RELATIONAL_CUSTOM_FIELDS__ = void 0;
const core_1 = require("@mikro-orm/core");
exports.__FIX_RELATIONAL_CUSTOM_FIELDS__ = 'fix_relational_custom_fields';
// Define a new entity that extends the abstract base class
class MikroOrmBaseCustomEntityFields {
    /**
     * If there are only relations are defined for an Entity for customFields, then TypeORM not saving realtions for entity ("Cannot set properties of undefined (<fieldName>)").
     * So we have to add a "fake" column to the customFields embedded type to prevent this error from occurring.
     */
    [_a = exports.__FIX_RELATIONAL_CUSTOM_FIELDS__];
}
exports.MikroOrmBaseCustomEntityFields = MikroOrmBaseCustomEntityFields;
__decorate([
    (0, core_1.Property)({ type: 'boolean', nullable: true, hidden: true }),
    __metadata("design:type", Boolean)
], MikroOrmBaseCustomEntityFields.prototype, _a, void 0);
//# sourceMappingURL=mikro-orm-base-custom-entity-field.js.map