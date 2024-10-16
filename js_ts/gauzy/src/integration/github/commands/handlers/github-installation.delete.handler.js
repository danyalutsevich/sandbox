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
exports.GithubInstallationDeleteCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const index_1 = require("../../../../../plugins/plugins/integration-github/dist/index");
const utils_1 = require("core/utils");
const github_installation_delete_command_1 = require("../github-installation.delete.command");
let GithubInstallationDeleteCommandHandler = exports.GithubInstallationDeleteCommandHandler = class GithubInstallationDeleteCommandHandler {
    _octokitService;
    constructor(_octokitService) {
        this._octokitService = _octokitService;
    }
    /**
     * Execute the GitHub installation deletion command.
     * @param command - The GithubInstallationDeleteCommand instance.
     */
    async execute(command) {
        const { integration } = command;
        // Convert array of settings to an object using 'arrayToObject' utility function
        const settings = (0, utils_1.arrayToObject)(integration.settings, 'settingsName', 'settingsValue');
        // Check if the required installation_id is present in settings
        if (!settings || !settings.installation_id) {
            throw new common_1.HttpException('Invalid request parameter: Missing or unauthorized integration', common_1.HttpStatus.UNAUTHORIZED);
        }
        // Retrieve installation_id from settings
        const installation_id = settings['installation_id'];
        // Call the OctokitService to delete the GitHub installation
        return await this._octokitService.deleteInstallation(installation_id);
    }
};
exports.GithubInstallationDeleteCommandHandler = GithubInstallationDeleteCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(github_installation_delete_command_1.GithubInstallationDeleteCommand),
    __metadata("design:paramtypes", [index_1.OctokitService])
], GithubInstallationDeleteCommandHandler);
//# sourceMappingURL=github-installation.delete.handler.js.map