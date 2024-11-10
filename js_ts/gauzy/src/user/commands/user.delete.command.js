"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleteCommand = void 0;
class UserDeleteCommand {
    userId;
    static type = '[User] Delete Account';
    constructor(userId) {
        this.userId = userId;
    }
}
exports.UserDeleteCommand = UserDeleteCommand;
//# sourceMappingURL=user.delete.command.js.map