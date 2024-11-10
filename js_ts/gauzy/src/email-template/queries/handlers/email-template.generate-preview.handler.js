"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateGeneratePreviewHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const Handlebars = __importStar(require("handlebars"));
const mjml_1 = __importDefault(require("mjml"));
const index_1 = require("../../../../plugins/config/dist/index");
const constants_1 = require("./../../../constants");
const email_template_generate_preview_query_1 = require("../email-template.generate-preview.query");
const moment_extend_1 = require("../../../core/moment-extend");
const utils_1 = require("./../../../core/utils");
let EmailTemplateGeneratePreviewHandler = exports.EmailTemplateGeneratePreviewHandler = class EmailTemplateGeneratePreviewHandler {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async execute(command) {
        const { input } = command;
        let textToHtml = input;
        try {
            const mjmlToHtml = (0, mjml_1.default)(input);
            textToHtml = mjmlToHtml.errors.length ? input : mjmlToHtml.html;
        }
        catch (error) {
            // ignore mjml conversion errors for non-mjml text such as subject
        }
        const clientBaseUrl = this.configService.get('clientBaseUrl');
        const host = this.configService.get('host');
        const { appName, appLogo, appSignature, appLink, companyLink, companyName } = index_1.environment.appIntegrationConfig;
        const handlebarsTemplate = Handlebars.compile(textToHtml);
        const html = handlebarsTemplate({
            organizationName: 'Organization',
            email: 'user@domain.com',
            name: 'John Doe',
            role: 'USER_ROLE',
            host: clientBaseUrl || host,
            hostEmail: '(alish@ever.com)',
            agenda: 'This booking is for gauzy call',
            description: 'This is a test appointment booking',
            participantEmails: 'kdashora@gmail.com,testmail@hotmail.com',
            location: 'zoom.us',
            duration: 'Fri, Jul 24, 2020 6:00 AM - Fri, Jul 24, 2020 6:15 AM',
            candidateName: 'Alex',
            date: 'Thursday, August 27, 2020',
            interviewerName: 'John Doe',
            total_hours: '16',
            average_activates: '25',
            log_type: 'tracked',
            projects: ['Gauzy Web Site', 'Gauzy Platform(open-source)'],
            project: 'Gauzy Web Site',
            timesheet_action: 'APPROVE/REJECT',
            equipment_status: 'APPROVE/REJECT',
            reason: 'reason for this',
            equipment_name: 'Fiat Freemont',
            equipment_type: 'Car',
            equipment_serial_number: 'CB0950AT',
            manufactured_year: '2015',
            initial_cost: '40000',
            currency: 'BGN',
            max_share_period: '5',
            autoApproveShare: false,
            time_off_policy_requires_approval: 'APPROVE/REJECT',
            time_off_policy_paid_status: true,
            task_update_status: 'Update/Assign',
            task_update_title: 'Bug: Consistency in "Time Off" feature',
            task_update_description: '"Time off" should be called "Time Off" everywhere. \n' +
                'Fix "Request Days Off" and change it to just "Request". \n' +
                'Also, check all popups, etc. that it is called "Time Off" (not "Day off" or anything else) everywhere.\n' +
                '\n' +
                '![Artboard](https://user-images.githubusercontent.com/6750734/88939490-33939180-d2a4-11ea-8d13-3efed87a7846.png)\n',
            task_update_estimate: 'estimate',
            task_update_due_date: (0, moment_extend_1.moment)(new Date()).add(10, 'days').toDate(),
            task_status: 'In Progress',
            task_update_project: 'Gauzy Project',
            task_update_assign_by: 'Ruslan Konviser',
            task_update_url: 'https://github.com/ever-co/ever-gauzy/issues/1688',
            inviteCode: (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH),
            teams: 'Gauzy Team',
            verificationCode: (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH),
            appName: appName,
            appLogo: appLogo,
            appSignature: appSignature,
            appLink: appLink,
            items: [
                {
                    tenantName: "Default",
                    userName: "Default",
                    resetLink: "https://github.com/ever-co/ever-gauzy"
                }
            ],
            companyLink,
            companyName
        });
        return { html };
    }
};
exports.EmailTemplateGeneratePreviewHandler = EmailTemplateGeneratePreviewHandler = __decorate([
    (0, cqrs_1.QueryHandler)(email_template_generate_preview_query_1.EmailTemplateGeneratePreviewQuery),
    __metadata("design:paramtypes", [index_1.ConfigService])
], EmailTemplateGeneratePreviewHandler);
//# sourceMappingURL=email-template.generate-preview.handler.js.map