"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PublicShareModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicShareModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const public_employee_module_1 = require("./employee/public-employee.module");
const public_invoice_module_1 = require("./invoice/public-invoice.module");
const public_organization_module_1 = require("./organization/public-organization.module");
const public_team_module_1 = require("./team/public-team.module");
let PublicShareModule = exports.PublicShareModule = PublicShareModule_1 = class PublicShareModule {
};
exports.PublicShareModule = PublicShareModule = PublicShareModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/public',
                    module: PublicShareModule_1,
                    children: [
                        { path: '/employee', module: public_employee_module_1.PublicEmployeeModule },
                        { path: '/invoice', module: public_invoice_module_1.PublicInvoiceModule },
                        { path: '/organization', module: public_organization_module_1.PublicOrganizationModule },
                        { path: '/team', module: public_team_module_1.PublicTeamModule }
                    ]
                }
            ]),
            public_employee_module_1.PublicEmployeeModule,
            public_invoice_module_1.PublicInvoiceModule,
            public_organization_module_1.PublicOrganizationModule,
            public_team_module_1.PublicTeamModule
        ],
        controllers: [],
        providers: [],
        exports: []
    })
], PublicShareModule);
//# sourceMappingURL=public-share.module.js.map