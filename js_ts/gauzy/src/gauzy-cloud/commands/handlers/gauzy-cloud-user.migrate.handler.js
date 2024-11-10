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
exports.GauzyCloudUserMigrateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const operators_1 = require("rxjs/operators");
const gauzy_cloud_service_1 = require("../../gauzy-cloud.service");
const gauzy_cloud_user_migrate_command_1 = require("./../gauzy-cloud-user.migrate.command");
let GauzyCloudUserMigrateHandler = exports.GauzyCloudUserMigrateHandler = class GauzyCloudUserMigrateHandler {
    gauzyCloudService;
    constructor(gauzyCloudService) {
        this.gauzyCloudService = gauzyCloudService;
    }
    async execute(command) {
        const { input } = command;
        return this.gauzyCloudService.migrateUser(input).pipe((0, operators_1.switchMap)((response) => {
            if (response && response.data) {
                const { data } = response;
                const { password } = input;
                return this.gauzyCloudService.extractToken({
                    email: data.email,
                    password
                });
            }
        }), (0, operators_1.catchError)((error) => {
            console.log('Bad Promise:', error);
            throw new common_1.BadRequestException(error);
        }));
    }
};
exports.GauzyCloudUserMigrateHandler = GauzyCloudUserMigrateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(gauzy_cloud_user_migrate_command_1.GauzyCloudUserMigrateCommand),
    __metadata("design:paramtypes", [gauzy_cloud_service_1.GauzyCloudService])
], GauzyCloudUserMigrateHandler);
//# sourceMappingURL=gauzy-cloud-user.migrate.handler.js.map