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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCategory = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_report_category_repository_1 = require("./repository/mikro-orm-report-category.repository");
let ReportCategory = exports.ReportCategory = class ReportCategory extends internal_1.BaseEntity {
    name;
    iconClass;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     *
     */
    reports;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], ReportCategory.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], ReportCategory.prototype, "iconClass", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.Report, (it) => it.category, {
        cascade: true
    }),
    __metadata("design:type", Array)
], ReportCategory.prototype, "reports", void 0);
exports.ReportCategory = ReportCategory = __decorate([
    (0, entity_1.MultiORMEntity)('report_category', { mikroOrmRepository: () => mikro_orm_report_category_repository_1.MikroOrmReportCategoryRepository })
], ReportCategory);
//# sourceMappingURL=report-category.entity.js.map