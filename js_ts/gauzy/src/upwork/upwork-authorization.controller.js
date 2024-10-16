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
exports.UpworkAuthorizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const index_3 = require("../../plugins/contracts/dist/index");
let UpworkAuthorizationController = exports.UpworkAuthorizationController = class UpworkAuthorizationController {
    _config;
    constructor(_config) {
        this._config = _config;
    }
    /**
    * Handle the callback from the Upwork integration.
    *
    * @param {any} query - The query parameters from the callback.
    * @param {Response} response - Express Response object.
    */
    async upworkIntegrationCallback(query, response) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!query || !query.oauth_token || !query.oauth_verifier) {
                throw new common_1.HttpException('Invalid query parameters', common_1.HttpStatus.BAD_REQUEST);
            }
            /** Upwork Config Options */
            const upwork = this._config.get('upwork');
            /** Construct the redirect URL with query parameters */
            const urlParams = new URLSearchParams();
            urlParams.append('oauth_token', query.oauth_token);
            urlParams.append('oauth_verifier', query.oauth_verifier);
            /** Redirect to the URL */
            return response.redirect(`${upwork.postInstallUrl}?${urlParams.toString()}`);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            throw new common_1.HttpException(`Failed to add ${index_3.IntegrationEnum.UPWORK} integration: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
], UpworkAuthorizationController.prototype, "upworkIntegrationCallback", null);
exports.UpworkAuthorizationController = UpworkAuthorizationController = __decorate([
    (0, swagger_1.ApiTags)('Upwork Integrations'),
    (0, index_2.Public)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [index_1.ConfigService])
], UpworkAuthorizationController);
//# sourceMappingURL=upwork-authorization.controller.js.map