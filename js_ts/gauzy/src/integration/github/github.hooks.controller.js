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
exports.GitHubHooksController = void 0;
const common_1 = require("@nestjs/common");
const probot_1 = require("probot");
const index_1 = require("../../../plugins/common/dist/index");
const index_2 = require("../../../plugins/plugins/integration-github/dist/index");
const github_hooks_service_1 = require("./github.hooks.service");
let GitHubHooksController = exports.GitHubHooksController = class GitHubHooksController {
    _githubHooksService;
    constructor(_githubHooksService) {
        this._githubHooksService = _githubHooksService;
    }
    /**
     * Handles the 'installation.deleted' event.
     *
     * @param context - The context object containing information about the event.
     */
    async installationDeleted(context) {
        if (!context.isBot) {
            await this._githubHooksService.installationDeleted(context);
        }
    }
    /**
     * Handles the 'issues.opened' event.
     *
     * @param context - The context object containing information about the event.
     */
    async issuesOpened(context) {
        if (!context.isBot) {
            await this._githubHooksService.issuesOpened(context);
        }
    }
    /**
     * Handles the 'issues.edited' event.
     *
     * @param context - The context object containing information about the event.
     */
    async issuesEdited(context) {
        if (!context.isBot) {
            await this._githubHooksService.issuesEdited(context);
        }
    }
    /**
     * Handles the 'issues.labeled' event.
     *
     * @param context - The context object containing information about the event.
     */
    async issuesLabeled(context) {
        if (!context.isBot) {
            await this._githubHooksService.issuesLabeled(context);
        }
    }
    /**
     * Handles the 'issues.labeled' event.
     *
     * @param context - The context object containing information about the event.
     */
    async issuesUnlabeled(context) {
        if (!context.isBot) {
            await this._githubHooksService.issuesUnlabeled(context);
        }
    }
};
__decorate([
    (0, index_2.Hook)(['installation.deleted']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [probot_1.Context]),
    __metadata("design:returntype", Promise)
], GitHubHooksController.prototype, "installationDeleted", null);
__decorate([
    (0, index_2.Hook)(['issues.opened']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [probot_1.Context]),
    __metadata("design:returntype", Promise)
], GitHubHooksController.prototype, "issuesOpened", null);
__decorate([
    (0, index_2.Hook)(['issues.edited']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [probot_1.Context]),
    __metadata("design:returntype", Promise)
], GitHubHooksController.prototype, "issuesEdited", null);
__decorate([
    (0, index_2.Hook)(['issues.labeled']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [probot_1.Context]),
    __metadata("design:returntype", Promise)
], GitHubHooksController.prototype, "issuesLabeled", null);
__decorate([
    (0, index_2.Hook)(['issues.unlabeled']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [probot_1.Context]),
    __metadata("design:returntype", Promise)
], GitHubHooksController.prototype, "issuesUnlabeled", null);
exports.GitHubHooksController = GitHubHooksController = __decorate([
    (0, index_1.Public)(),
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [github_hooks_service_1.GithubHooksService])
], GitHubHooksController);
//# sourceMappingURL=github.hooks.controller.js.map