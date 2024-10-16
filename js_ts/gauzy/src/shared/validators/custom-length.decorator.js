"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLengthConstraint = exports.CustomLength = exports.length = void 0;
const class_validator_1 = require("class-validator");
function length(text, length) {
    return (typeof text === 'string' && typeof length === 'number') && (text.length == length);
}
exports.length = length;
/**
 * Custom length validation decorator.
 *
 * @param length - The expected length of the property.
 * @param validationOptions - Options for the validation decorator.
 * @returns {PropertyDecorator} - Decorator function.
 */
const CustomLength = (length = 6, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [length],
            validator: CustomLengthConstraint,
        });
    };
};
exports.CustomLength = CustomLength;
/**
 * Validator constraint for custom length validation.
 */
let CustomLengthConstraint = exports.CustomLengthConstraint = class CustomLengthConstraint {
    /**
     * Validates the length of the provided value.
     * @param value - The value to be validated.
     * @param args - Validation arguments containing constraints.
     * @returns {boolean} - True if the length is within the specified constraints, otherwise false.
     */
    validate(value, args) {
        if (!value)
            return true;
        return length(value, args.constraints[0]);
    }
    /**
     * Returns the default error message for the custom length validation.
     * @param validationArguments - Validation arguments containing the value.
     * @returns {string} - Default error message.
     */
    defaultMessage(validationArguments) {
        const { value } = validationArguments;
        return `(${value}) is too short or too long!`;
    }
};
exports.CustomLengthConstraint = CustomLengthConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "CustomLength", async: false })
], CustomLengthConstraint);
//# sourceMappingURL=custom-length.decorator.js.map