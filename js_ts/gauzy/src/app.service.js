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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../plugins/config");
const seed_data_service_1 = require("./core/seeds/seed-data.service");
const user_service_1 = require("./user/user.service");
const chalk_1 = __importDefault(require("chalk"));
let AppService = exports.AppService = class AppService {
    seedDataService;
    userService;
    configService;
    count = 0;
    /**
     * Seed DB if no users exists (for simplicity and safety we only re-seed DB if no users found)
     * TODO: this should actually include more checks, e.g. if schema migrated and many other things
     */
    async seedDBIfEmpty() {
        this.count = await this.userService.countFast();
        console.log(chalk_1.default.magenta(`Found ${this.count} users in DB`));
        if (this.count === 0) {
            await this.seedDataService.runDefaultSeed(true);
        }
    }
    constructor(seedDataService, userService, configService) {
        this.seedDataService = seedDataService;
        this.userService = userService;
        this.configService = configService;
    }
    /*
     * Seed DB for Demo server
     */
    async executeDemoSeed() {
        if (this.count === 0 && this.configService.get('demo') === true) {
            this.seedDataService.executeDemoSeed();
        }
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => seed_data_service_1.SeedDataService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => config_1.ConfigService))),
    __metadata("design:paramtypes", [seed_data_service_1.SeedDataService,
        user_service_1.UserService,
        config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map