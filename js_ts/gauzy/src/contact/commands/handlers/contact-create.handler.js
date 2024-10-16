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
exports.ContactCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const contact_create_commant_1 = require("../contact-create.commant");
const contact_service_1 = require("../../contact.service");
let ContactCreateHandler = exports.ContactCreateHandler = class ContactCreateHandler {
    contactService;
    constructor(contactService) {
        this.contactService = contactService;
    }
    async execute(command) {
        const { input } = command;
        return await this.contactService.create(input);
    }
};
exports.ContactCreateHandler = ContactCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(contact_create_commant_1.ContactCreateCommand),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactCreateHandler);
//# sourceMappingURL=contact-create.handler.js.map