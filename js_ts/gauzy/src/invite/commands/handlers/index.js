"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const invite_accept_candidate_handler_1 = require("./invite.accept-candidate.handler");
const invite_accept_employee_handler_1 = require("./invite.accept-employee.handler");
const invite_accept_handler_1 = require("./invite-accept.handler");
const invite_accept_organization_contact_handler_1 = require("./invite.accept-organization-contact.handler");
const invite_accept_user_handler_1 = require("./invite.accept-user.handler");
const invite_bulk_create_handler_1 = require("./invite.bulk.create.handler");
const invite_organization_contact_handler_1 = require("./invite.organization-contact.handler");
const invite_resend_handler_1 = require("./invite.resend.handler");
exports.CommandHandlers = [
    invite_accept_candidate_handler_1.InviteAcceptCandidateHandler,
    invite_accept_employee_handler_1.InviteAcceptEmployeeHandler,
    invite_accept_handler_1.InviteAcceptHandler,
    invite_accept_organization_contact_handler_1.InviteAcceptOrganizationContactHandler,
    invite_accept_user_handler_1.InviteAcceptUserHandler,
    invite_bulk_create_handler_1.InviteBulkCreateHandler,
    invite_organization_contact_handler_1.InviteOrganizationContactHandler,
    invite_resend_handler_1.InviteResendHandler,
];
//# sourceMappingURL=index.js.map