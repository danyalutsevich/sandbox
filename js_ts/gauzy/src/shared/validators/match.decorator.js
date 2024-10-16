"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchConstraint = exports.Match = void 0;
const class_validator_1 = require("class-validator");
/**
 * Match two fields value decorator
 *
 * @param type
 * @param property
 * @param validationOptions
 * @returns {PropertyDecorator} - Decorator function.
 */
const Match = (type, property, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
};
exports.Match = Match;
/**
 * Match two fields value constraint.
 */
let MatchConstraint = exports.MatchConstraint = class MatchConstraint {
    /**
     * Validate if the value matches another field's value.
     *
     * @param value - The value to validate.
     * @param args - Validation arguments.
     * @returns {boolean} - Indicates whether the validation passed.
     */
    validate(value, args) {
        const [fn] = args.constraints;
        return fn(args.object) === value;
    }
    /**
     * Gets the default validation error message.
     *
     * @param args - Validation arguments.
     * @returns {string} - The default error message.
     */
    defaultMessage(args) {
        return 'The values do not match.';
    }
};
exports.MatchConstraint = MatchConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'Match' })
], MatchConstraint);
//# sourceMappingURL=match.decorator.js.map