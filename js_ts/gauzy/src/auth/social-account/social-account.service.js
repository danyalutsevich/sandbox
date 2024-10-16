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
exports.SocialAccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("../../core/crud");
const social_account_entity_1 = require("./social-account.entity");
const repository_1 = require("./repository");
const user_1 = require("../../user");
let SocialAccountService = exports.SocialAccountService = class SocialAccountService extends crud_1.TenantAwareCrudService {
    typeOrmSocialAccountRepository;
    mikroOrmSocialAccountRepository;
    userService;
    constructor(typeOrmSocialAccountRepository, mikroOrmSocialAccountRepository, userService) {
        super(typeOrmSocialAccountRepository, mikroOrmSocialAccountRepository);
        this.typeOrmSocialAccountRepository = typeOrmSocialAccountRepository;
        this.mikroOrmSocialAccountRepository = mikroOrmSocialAccountRepository;
        this.userService = userService;
    }
    async registerSocialAccount(partialEntity) {
        try {
            return await this.typeOrmRepository.save(partialEntity);
        }
        catch (error) {
            throw new common_1.BadRequestException('Could not create this account');
        }
    }
    async findAccountByProvider(input) {
        const { provider, providerAccountId } = input;
        return await this.typeOrmRepository.findOne({
            where: { provider, providerAccountId, isActive: true, isArchived: false },
            relations: {
                user: true
            }
        });
    }
    async findUserBySocialId(input) {
        try {
            const account = await this.findAccountByProvider(input);
            const user = account?.user;
            if (!user) {
                throw new common_1.BadRequestException('The user with this accoubt details does not exists');
            }
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('The user with this accoubt details does not exists');
        }
    }
    async signupFindUserByEmail(email) {
        const user = await this.userService.getUserByEmail(email);
        if (!user)
            return false;
        return true;
    }
};
exports.SocialAccountService = SocialAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(social_account_entity_1.SocialAccount)),
    __metadata("design:paramtypes", [repository_1.TypeOrmSocialAccountRepository,
        repository_1.MicroOrmSocialAccountRepository,
        user_1.UserService])
], SocialAccountService);
//# sourceMappingURL=social-account.service.js.map