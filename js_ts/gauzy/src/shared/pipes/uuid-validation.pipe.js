"use strict";
// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUIDValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../plugins/common/dist/index");
/**
 * UUID Validation Pipe
 *
 * Validates UUID passed in request parameters.
 */
let UUIDValidationPipe = exports.UUIDValidationPipe = class UUIDValidationPipe {
    /**
    * Instance of class-validator
    *
    * Can not be easily injected, and there's no need to do so as we
    * only use it for uuid validation method.
    */
    /**
    * When user requests an entity with invalid UUID we must return 404
    * error before reaching into the database.
    */
    transform(value, metadata) {
        if ((0, index_1.isEmpty)(value)) {
            throw new common_1.NotFoundException('Validation failed (uuid is expected)');
        }
        if (!(0, class_validator_1.isUUID)(value)) {
            throw new common_1.NotAcceptableException('Validation failed (valid uuid is expected)');
        }
        return value;
    }
};
exports.UUIDValidationPipe = UUIDValidationPipe = __decorate([
    (0, common_1.Injectable)()
], UUIDValidationPipe);
//# sourceMappingURL=uuid-validation.pipe.js.map