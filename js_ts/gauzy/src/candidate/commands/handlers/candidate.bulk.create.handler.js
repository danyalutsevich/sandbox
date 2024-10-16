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
exports.CandidateBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const candidate_bulk_create_command_1 = require("../candidate.bulk.create.command");
const candidate_create_command_1 = require("../candidate.create.command");
let CandidateBulkCreateHandler = exports.CandidateBulkCreateHandler = class CandidateBulkCreateHandler {
    _commandBus;
    constructor(_commandBus) {
        this._commandBus = _commandBus;
    }
    async execute(command) {
        try {
            const { input, languageCode, originUrl } = command;
            return await Promise.all(input.map(async (entity) => {
                return await this._commandBus.execute(new candidate_create_command_1.CandidateCreateCommand(entity, languageCode, originUrl));
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.CandidateBulkCreateHandler = CandidateBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(candidate_bulk_create_command_1.CandidateBulkCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], CandidateBulkCreateHandler);
//# sourceMappingURL=candidate.bulk.create.handler.js.map