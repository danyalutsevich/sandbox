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
exports.GitHubAuthorizationController = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/common/dist/index");
let GitHubAuthorizationController = exports.GitHubAuthorizationController = class GitHubAuthorizationController {
    _config;
    constructor(_config) {
        this._config = _config;
    }
    /**
     *
     * @param query
     * @param response
     */
    async githubIntegrationPostInstallCallback(query, response) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!query || !query.installation_id || !query.setup_action || !query.state) {
                throw new common_1.HttpException('Invalid github callback query data', common_1.HttpStatus.BAD_REQUEST);
            }
            /** Github Config Options */
            const { postInstallUrl } = this._config.get('github');
            /** Construct the redirect URL with query parameters */
            const urlParams = new URLSearchParams();
            urlParams.append('installation_id', query.installation_id);
            urlParams.append('setup_action', query.setup_action);
            /** Redirect to the URL */
            if (query.state.startsWith('http')) {
                return response.redirect(`${query.state}?${urlParams.toString()}`);
            }
            else {
                return response.redirect(`${postInstallUrl}?${urlParams.toString()}`);
            }
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            throw new common_1.HttpException(`Failed to add GitHub installation: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, index_2.Public)(),
    (0, common_1.Get)('/callback'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GitHubAuthorizationController.prototype, "githubIntegrationPostInstallCallback", null);
exports.GitHubAuthorizationController = GitHubAuthorizationController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [index_1.ConfigService])
], GitHubAuthorizationController);
//# sourceMappingURL=github-authorization.controller.js.map