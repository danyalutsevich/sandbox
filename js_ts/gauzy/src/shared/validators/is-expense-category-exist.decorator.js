"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsExpenseCategoryAlreadyExist = void 0;
const class_validator_1 = require("class-validator");
const constraints_1 = require("./constraints");
/**
 * Expense category existence validation decorator.
 *
 * @param validationOptions - Options for the validation decorator.
 * @returns {PropertyDecorator} - Decorator function.
 */
const IsExpenseCategoryAlreadyExist = (validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: constraints_1.ExpenseCategoryAlreadyExistConstraint,
        });
    };
};
exports.IsExpenseCategoryAlreadyExist = IsExpenseCategoryAlreadyExist;
//# sourceMappingURL=is-expense-category-exist.decorator.js.map