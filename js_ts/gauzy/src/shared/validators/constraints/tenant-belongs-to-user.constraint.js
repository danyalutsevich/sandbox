"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantBelongsToUserConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const underscore_1 = require("underscore");
const context_1 = require("../../../core/context");
/**
 * Validates whether the specified tenant belongs to the current user.
 *
 */
let TenantBelongsToUserConstraint = exports.TenantBelongsToUserConstraint = class TenantBelongsToUserConstraint {
    /**
     * Validates whether the specified tenant belongs to the current user.
     *
     * @param value - The tenant ID or tenant object to be validated.
     * @returns A boolean indicating whether the specified tenant belongs to the current user.
     */
    async validate(value) {
        if ((0, underscore_1.isEmpty)(value))
            return true;
        const currentTenantId = context_1.RequestContext.currentTenantId();
        // Combining both conditions into one line for brevity
        return typeof value === 'string' ? value === currentTenantId : value.id === currentTenantId;
    }
    /**
     * Gets the default message when validation for the "IsTenantBelongsToUser" constraint fails.
     *
     * @param validationArguments - Validation arguments.
     * @returns The default error message.
     */
    defaultMessage(validationArguments) {
        const { value } = validationArguments;
        return `The user is not associated with the requested tenant. Received tenant details: ${JSON.stringify(value)}`;
    }
};
exports.TenantBelongsToUserConstraint = TenantBelongsToUserConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsTenantBelongsToUser", async: true }),
    (0, common_1.Injectable)()
], TenantBelongsToUserConstraint);
//# sourceMappingURL=tenant-belongs-to-user.constraint.js.map