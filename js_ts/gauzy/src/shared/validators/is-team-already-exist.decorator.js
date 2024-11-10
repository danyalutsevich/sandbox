"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTeamAlreadyExist = void 0;
const class_validator_1 = require("class-validator");
const constraints_1 = require("./constraints");
/**
 * Custom validation decorator factory for checking if a team already exists.
 *
 * @param validationOptions - Validation options.
 * @returns {PropertyDecorator} - Decorator function.
 */
const IsTeamAlreadyExist = (validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: constraints_1.TeamAlreadyExistConstraint,
        });
    };
};
exports.IsTeamAlreadyExist = IsTeamAlreadyExist;
//# sourceMappingURL=is-team-already-exist.decorator.js.map