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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubstaffAuthorizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/common/dist/index");
const contracts_1 = require("../../../plugins/contracts");
let HubstaffAuthorizationController = exports.HubstaffAuthorizationController = class HubstaffAuthorizationController {
    _config;
    constructor(_config) {
        this._config = _config;
    }
    /**
    * Handle the callback from the Hubstaff integration.
    *
    * @param {any} query - The query parameters from the callback.
    * @param {Response} response - Express Response object.
    */
    async hubstaffIntegrationCallback(query, response) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!query || !query.code || !query.state) {
                throw new common_1.HttpException('Invalid query parameters', common_1.HttpStatus.BAD_REQUEST);
            }
            /** Hubstaff Config Options */
            const hubstaff = this._config.get('hubstaff');
            /** Construct the redirect URL with query parameters */
            const urlParams = new URLSearchParams();
            urlParams.append('code', query.code);
            urlParams.append('state', query.state);
            /** Redirect to the URL */
            return response.redirect(`${hubstaff.postInstallUrl}?${urlParams.toString()}`);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            throw new common_1.HttpException(`Failed to add ${contracts_1.IntegrationEnum.HUBSTAFF} integration: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Get)('callback'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HubstaffAuthorizationController.prototype, "hubstaffIntegrationCallback", null);
exports.HubstaffAuthorizationController = HubstaffAuthorizationController = __decorate([
    (0, swagger_1.ApiTags)('Hubstaff Integrations'),
    (0, index_2.Public)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [index_1.ConfigService])
], HubstaffAuthorizationController);
//# sourceMappingURL=hubstaff-authorization.controller.js.map