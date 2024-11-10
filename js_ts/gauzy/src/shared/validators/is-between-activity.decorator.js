"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetweenActivtyConstraint = exports.IsBetweenActivty = void 0;
const class_validator_1 = require("class-validator");
/**
 * IsBetweenActivity custom decorator.
 *
 * @param validationOptions - Validation options.
 * @returns {PropertyDecorator} - Decorator function.
 */
const IsBetweenActivty = (type, property, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: BetweenActivtyConstraint,
        });
    };
};
exports.IsBetweenActivty = IsBetweenActivty;
/**
 * Is between activity check validation constraint
 *
 * @param validationOptions
 * @returns
 */
let BetweenActivtyConstraint = exports.BetweenActivtyConstraint = class BetweenActivtyConstraint {
    /**
     * Validate if the start and end values in the activityLevel object are between 0 and 100 (inclusive).
     *
     * @param activityLevel - The object containing start and end properties to be validated.
     * @param args - Validation arguments.
     * @returns {boolean} - Returns `true` if both start and end values are between 0 and 100 (inclusive); otherwise, `false`.
     */
    validate(activityLevel, args) {
        const { start, end } = activityLevel;
        // Check if start and end values are within the range [0, 100]
        return (start >= 0) && (end <= 100);
    }
    /**
     * Get the default error message for the IsBetweenActivty constraint.
     *
     * @param args - Validation arguments.
     * @returns {string} - The default error message.
     */
    defaultMessage(args) {
        return "Start & End must be between 0 and 100";
    }
};
exports.BetweenActivtyConstraint = BetweenActivtyConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsBetweenActivty", async: false })
], BetweenActivtyConstraint);
//# sourceMappingURL=is-between-activity.decorator.js.map